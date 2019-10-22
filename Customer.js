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
    promptMenu().then(() => {
        return display();
    });
});
//a function that displays the database of products to the user
var displayTable = function(){
    connect.query("SELECT * FROM products", function(error, response){
        if (error) throw error;
        console.table(response);
        promptCustomer().then((answers) => {
            return amount(answers);
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
}
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
        }.then((answer2)=> {
            return query(answer2)
        }),
    ])
}
//gets the whole row of the chosen product
function query (answer2){
    console.log(answer2);
    console.log("You chose to buy " + answer2 + "of the "+ answers.wearables);
    var stringProduct = JSON.stringify(answers.wearables)
    var select = ("SELECT * FROM bamazon_db.products WHERE product_name = ?",[stringProduct]) 
    // connect.query(select)
    connect.query(select, function(error, response){
        if (error) throw error;
        console.table(response);
    })
}
query();
function update (subtract){
    //"UPDATE products SET stock_quantity = " + stock_quantity - answer

        // if(( )){
        //     connect.query("UPDATE products SET stock_quantity = " + stock_quantity - answer )
        // }else{

        // }
    //locate the item to update using product name = string in mysql
    //subtract user number from stock_quantity
    //if stock_quantity is less than user #, prompt user for a lesser #
}

function total (total){
    //multiply user # by price and console log out total cost
    //callback - prompt user again or exit
}
// prompts if user wants to enter the store or exit
function promptMenu() {
    console.log('Welcome to the Bamazon store!')
    inquirer.prompt([
        {
            type: 'list',
            name: 'store',
            message: 'Would you like to shop or exit?',
            choices: ['SHOP', 'EXIT',],
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
