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
//connect to mysql workbench
connect.connect(function(err){
    if (err) throw err;
    console.log("connected to mySql Workbench!!")
    // promptMenu()
});
//a function that displays the database of products to the user
// var displayTable = function(){
    connect.query("SELECT * FROM products", function(error, response){
        if (error) throw error;
        // console.log(response);
        console.table(response);
        promptCustomer();   

    })
    // displayTable()
// }

// functinon to allow user to select a product and get a total
var promptCustomer = function(){
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What do you want to buy?",
            choices: ["knit_jacket", "imagination_trench", "knit_blazer", "sweatshirt","tank_top", "t-shirt", "jumpsuit", "skirt", "midi_skirt", "heels"],
            name: "wearables",
        },
    ])
    .then(function (answers) {
        console.log('You chose to buy :', answers.wearables);
        inquirer.prompt([
            {
                type: "input",
                name: "amount",
                message: "How much of the "+ answers.wearables +" do you want to buy?",
                // checks if user entry is a number or not, and more than 0
                validate: function(value){
                    if(isNaN(value)){
                        console.log('\n You need to provide a number')
                    }else if(value == 0 ){
                        console.log('\n Please provide a number more than 0')
                    }
                }
            }
            //take the number and update the sql database by subtracting from stock quantity
        ])
        .then(function(answer2){
                // we have the name of the selected  product
                // we have quantity desired
                // what do we want to do now?
                // update inventory based on user's purchase
                    //var select = "SELECT * FROM product WHERE product_name = " + answers.wearables
                        // connect.query(query)
                        // .then(function(data) {
                        //     console.log(data) // see what structure of data looks like
                        // })
                // this will return the select product's id, name, department, price, and stock_quantity
                // Now you can proceed with math then updates
                    //"UPDATE products SET stock_quantity = " + stock_quantity - answer

                    // if(( )){
                    //     connect.query("UPDATE products SET stock_quantity = " + stock_quantity - answer )
                    // }else{

                    // }
                //locate the item to update using product name = string in mysql
                //subtract user number from stock_quantity
                //if stock_quantity is less than user #, prompt user for a lesser #

                //multiply user # by price and console log out total cost
                //callback - prompt user again or exit
        })
    });
}
// function promptMenu() {
//     // prompts if user wants to enter the store or exit
//     console.log('Welcome to the Bamazon store!')
//     inquirer.prompt([
//         {
//             type: 'checkbox',
//             name: 'store',
//             message: 'Would you like to shop or exit?',
//             choices: ['SHOP', 'EXIT'],
//         }
//     ]).then(function(store) {
//         switch(store) {
//             case 'SHOP':
//                 displayTable();
//                 promptCustomer();
//                 break;
//             case 'EXIT':
//                 console.log('Thanks for shopping! See you later!');
//                 //terminate connection to mysql workbench
//                 connect.end(function(err){
//                     if (err) throw err;
//                     console.log('connection to mysql ENDED!')
//                 });
//                 break;
//         }  
//     });
// }