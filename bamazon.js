var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        buyProduct();

    });


}

function buyProduct() {
    connection.connect(function(err, res) {
        if (err) throw err;

        inquirer.prompt({

            name: "item",
            type: "prompt",
            message: "What is the Id of the item you would like to purchase?"
            // validate: function(value) {
            //     if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }

        }, {
            name: "quantity",
            type: "prompt",
            message: "How many would you like?"
            // validate: function(value) {
            //     if (isNaN(value)) {
            //         return false;
            //     } else {
            //         return true;
            //     }
            // }

        }).then(function(answer) {

            var uniqueId;
            for (var i = 0; i < res.length; i++) {
                if (res[i].id === answer.item) {
                    uniqueId = res[i];
                }
            }
        })

    })
}


// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// for (var i = 0; i < res.length; i++) {
// 	if (res[i].id) {
// 		console.log("Yep we have everything you need! Your Item was succesfully added.")
// 	}

