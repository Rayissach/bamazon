DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL (10,4) NOT NULL,
stock_quantity INTEGER(40) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES 	("dog hats", "pets", 18.99, 874), 
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				("dog hats", "pets", 18.99, 874),
				