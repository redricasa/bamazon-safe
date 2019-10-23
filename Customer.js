var mysql = require('mysql');
var inquirer = require('inquirer');
var keys = require('./keys.js')
var connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database:"bamazon_db",
    user:"root",
    password: keys.pass.dbpass
})
//connect to mysql
connect.connect(function(err){
    if (err) throw err;
    console.log("Connected to mySql!!")
    promptMenu();
});
//a function that displays the database of products to the user
var displayTable = function(){
    connect.query("SELECT * FROM products", function(error, response){
        if (error) throw error;
        console.table(response);
        promptCustomer().then(answers => {
            amount(answers).then(item => {
                query(answers, item)
            });
        });
    })
}
// functinon to allow user to select a product
var promptCustomer = function(){
    return inquirer.prompt([
        {
            type: "rawlist",
            message: "What do you want to buy?",
            choices: ["knit_jacket", "imagination_trench", "knit_blazer", "sweatshirt","tank_top", "t-shirt", "jumpsuit", "skirt", "midi_skirt", "heels"],
            name: "wearables",
        }
    ])
};
//prompt for the amount of chosen product user wants to purchase
function amount (answers) {
    // console.log('You chose to buy :', answers.wearables);
    return inquirer.prompt([
        {
            type: "input",
            name: "amount",
            message: "How many of the " + answers.wearables + " do you want to buy?",
            // checks if user entry is a number or not, and more than 0
            validate: function(value){
                if(isNaN(value)){
                    console.log('\n You need to provide a number')
                    return false
                }else if(value == 0 ){
                    console.log('\n Please provide a number more than 0')
                    return false
                }
                return true
            },
        },
    ])
}
//gets the whole row of the chosen product
function query (answers, item){
    // console.log("number to buy : ",item);
    // console.log("product name : ",answers)
    var select = "SELECT * FROM bamazon_db.products WHERE product_name = ?"; 
    connect.query(select, answers.wearables, function(error, response){
        if (error) throw error;
        var price = response[0].price;
        //gets the stock_quantity of the product and parses it from a string into a number
        var userAmount = parseInt(item.amount);
        var total = price * userAmount;
        console.log("Your TOTAL is : ", total);
        var inventory = response[0].stock_quantity;
        //get the difference b/n stock-quantity and user number
        var difference = inventory - userAmount;
        console.log("user chose to buy these #'s of product: ",userAmount)
        if ( difference < 0 ){
            console.log("Insufficient quantity!")
            amount(answers);
        }else{
            //run query to update table
            var update = "UPDATE products SET stock_quantity = ? WHERE product_name = ?"
            connect.query( update , difference, answers.wearables, function(error, res){
                if (error) throw error;
            });
        }
        return; 
    })
};
// prompts if user wants to enter the store or exit
function promptMenu() {
    console.log('Welcome to the Bamazon store!')
    inquirer.prompt([
        {
            type: 'list',
            name: 'store',
            message: 'Would you like to shop or exit?',
            choices: ['SHOP', 'EXIT'],
        }
    ]).then(function(choice) {
        switch(choice.store) {
            case 'SHOP':
                console.log('Here is the available inventory:');
                displayTable();
                break;
            case 'EXIT':
                console.log('Thanks for shopping! See you later!');
                //terminate connection to mysql workbench
                connect.end(function(err){
                    if (err) throw err;
                    console.log('connection to mysql ENDED!');
                });
                break;
        }  
    });
}
