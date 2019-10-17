DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name_ VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name_, price, stock_quantity)
VALUES 
    ("knit_jacket", "outerwear", 19.97, 59), 
    ("imagination_trench", "outerwear", 32.97, 10), 
    ("knit_blazer", "outerwear", 22.97, 5),
    ("sweatshirt", "tops", 14.97, 10),
    ("tank_top", "tops", 9.97, 19),
    ("t-shirt", "tops", 7.97, 22),
    ("jumpsuit", "bottoms", 19.97, 9),
    ("skirt", "bottoms", 20.97, 1),
    ("midi_skirt", "bottoms", 10.97, 40),
    ("heels", "shoes", 9.97, 50);