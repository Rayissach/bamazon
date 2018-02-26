DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INT(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL (10,4) NOT NULL,
stock_quantity INTEGER(40) NULL,
primary key(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("dog hats", "pet supplies", 18.99, 874), 
				("Jumbo dog crate", "pet supplies", 45.99, 60),
				("JBL headphones", "electronics", 89.99, 919),
				("Candy Land", "games", 12.99, 345),
				("Spalding Basketball", "sports & outdoors", 35.99, 1200),
				("Air fryer", "Home & Kitchen", 149.99, 60),
				("Flamingo FLoaty", "sports & outdoors", 67.99, 756),
				("Pop socket", "cellphone & accessories", 8.99, 1500),
				("Blutooth skull speaker", "electronics", 99.99, 120),
				("Selfie ring light", "cellphone & accessories", 14.99, 999)

				SELECT *FROM products;
				