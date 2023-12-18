const fs = require("fs");
const path = require("path");


const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  // path to the products.json file
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]); // callback function
    } else {
      cb(JSON.parse(fileContent));
    }
    // returns an array of products
  });
};
const Products = [];
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this); // this refers to the current object
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb); // cb is a callback function which is called in getProductsFromFile()
  }
};
