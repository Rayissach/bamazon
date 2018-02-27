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

function buyProduct(res) {

        inquirer.prompt({

            name: "item",
            type: "prompt",
            message: "What is the Id of the item you would like to purchase?",
            validate: function(value, res) {
            	for (var i = 0; i < res.length; i++) {
                if (isNaN(value) == false && parseInt(value) <= value.length && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }

        }, {
            name: "quantity",
            type: "prompt",
            message: "How many would you like?",
            validate: function(value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
     }

        }).then(function(answer) {
            var uniqueId = (answer.id) - 1;
            var quantityNum = parseInt(answer.stock_quantity);
            var Total = parseFloat(((res[uniqueId].price) * quantityNum).toFixed(2));
            if (res[uniqueId].stock_quantity >= quantityNum) {
                connection.query("UPDATE Products SET ? WHERE ?", [
                        { stock_quantity: (res[uniqueId].stock_quantity - quantityNum) },
                        { ItemId: answer.id }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log("Yayyy!")
                    });

                connection.query("SELECT * FROM Departments", function(err, res) {
                    if (err) throw err;
                    var index;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].department_name === res[uniqueId].department_name) {
                            index = i
                        }
                    }

                    connection.query("UPDATE Departments SET ? WHERE ?", [
                        { department_name: res[uniqueId].department_name }
                    ], function(err, res) {
                        if (err) throw err;
                    });
                });
            } else {
                console.log("Sorry");
            }
            readProducts();
        })

}


// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// for (var i = 0; i < res.length; i++) {
// 	if (res[i].id) {
// 		console.log("Yep we have everything you need! Your Item was succesfully added.")
// 	}

///////////////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////
            //                             validate: function(res) {
            //                                 for (var i = 0; i < res.length; i++) {
            //                                     if (res[i].id) {
            //                                         console.log("Yep we have everything you need! Your Item was succesfully added.");
            //                                         return;
            //                                     } else {
            //                                         console.log("Sorry, we don't have that much inventory... Try again")
            //                                     }
            //                                 }

            //                                 /////////////////////////////////////////////////////////

            //                                 .then() var uniqueId;
            //                                 for (var i = 0; i < res.length; i++) {
            //                                     if (res[i].id === answer.item) {
            //                                         uniqueId = res[i];
            //                                     }
            //                                 }