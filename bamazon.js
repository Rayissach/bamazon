var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var counter = 0;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "90Babyswag",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    readProducts();
});



function readProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock"]

        });
        for (var i = 0; i < res.length; i++) {
            counter++;
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        buyProduct();

    });
}

function buyProduct() {

    inquirer.prompt([{

            name: "item",
            type: "prompt",
            message: "What is the Id of the item you would like to purchase? [Hit Q to Quit]",
            validate: function(value) {
                if (isNaN(value) === false && parseInt(value) <= counter && parseInt(value) > 0) {
                    return true;
                } else if (value == "Q" || value === "q") {
                    console.log("\nThank you for shopping with us!");
                    process.exit();
                } else {
                    return "Please enter a valid item ID!";
                }
            }
        },
        {
            name: "quantity",
            type: "prompt",
            message: "How many would you like?[Hit Q to Quit]",
            validate: function(value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer) {
        console.log(answer)
        // var uniqueId = (answer.item) - 1;
        var quantityNum = parseInt(answer.quantity > 0);

        // if (res[uniqueId].quantity >= quantityNum) {
        // use answer.item in select to grab item from db
        connection.query("SELECT * FROM Products WHERE ?", { id: answer.item }, function(err, res) {
            if (err) throw err;
            // console.log("cool",res);
            if (answer.quantity >= res[0].stock_quantity) {

                console.log("Sorry Insufficient availability for the amount you want to purchase...");
                // buyProduct();
            } else {
                connection.query("UPDATE Products SET ? WHERE ?", [
                        { stock_quantity: (res[0].stock_quantity - answer.quantity) },
                        { id: answer.item }
                    ],
                    function(err) {
                        if (err) throw err;

                        console.log("\nCongratulations! You now have " + answer.quantity + " of " + res[0].product_name + " in your cart.");
                    }
                );
            }

        });
        readProducts();
    });

}