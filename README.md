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
## Next Steps
> Code out the part in psudocode so that the number of a particular product that the user wants to buy gets multiplied by the price of the product to get the `Total cost`, and the number gets subtracted from the `stock_quantity` to update the table to reflect the inventory. 
> Make the functions recursive.
 
