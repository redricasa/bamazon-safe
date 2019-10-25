# bamazon-safe

customer view of bamazon mySQL and Node.js CLI app
## Overview
a customer will be able to use the app through inputting answers to 
`ID of the product they would like to buy` and `how many units of the product they would like to buy` and purchase from the inventory. If they selected an amount that is greater than the inventory available, they'd be told `Insufficient quantity!`. 
Once the order is made, the inventory will be updated with the amount left and the customer will get their total cost of purchase.
## Technologies Used
- node.js
- mySQL Workbench
- SQL
- Javascript
- npm modules:
    - inquirer
    - mysql
## How the application works
- The following image shows the first propmt that insures weather the user wants to start shopping or exit. 
![what-do-you-want-to-buy](/images/bamazon3.png)
- If the user chooses to exit, the connection to mySql workbench ends.
![what-do-you-want-to-buy](/images/bamazon6.png)
- This image shows how the inventory of available products is displayed and the customer is prompted to choose from 10 products using the down arrow button. 
![what-do-you-want-to-buy](/images/bamazon4.png)
- This image shows some of the senarios where the user doesn't select a number more than 0 nor a non-numeral. 
![what-do-you-want-to-buy](/images/bamazon5.png)
- Once the user selects a number less than the inventory amount, the table is updated. And the total is calculated and displayed 
![what-do-you-want-to-buy](/images/bamazon1.png)

## Next Steps
> - if the inventory has a product with 0 (nothing to buy), console log out "We're out of ${product_name}". Then end the prompt asking for how many to buy and display the table again.
> - Currently, if the user chooses a larger number than what's available, the program gets stuck. One solution could be to include a condition in the propmpt with an if/else statement to check if the amount chosen is equal to the inventory and update the table accordingly or place a return statement.
> - if the customer chooses to keep shopping and buys more products, calculate and display an updated total amount.


 
