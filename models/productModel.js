let products = require('../data/products')
const { writeData }= require('../utils')
const { v4: uuidv4 } = require('uuid')
function find()
{
    return new Promise((resolve, reject) => 
    {
        resolve(products)
    })
}

function findbyId(id)
{
    return new Promise((resolve, reject) => 
    {
        const product = products.find((p) => p.id === id)// for each specific product by passing a variable p to get an id from products 
        resolve(product)
    })
}


function create(product)
{
    return new Promise((resolve, reject) => 
    {
        const newproduct = { id: uuidv4(), ...product} // assigns a unique id to each product
        products.push(newproduct)
        writeData('./data/products.json', products)
        resolve(newproduct)
    })
}


function update(id, product)
{
    return new Promise((resolve, reject) => 
    {
        //find the correct index of the product we want to update
        const index = products.findIndex((p) => p.id === id) 
        products[index] = {id, ...product}
        writeData('./data/products.json', products)
        resolve(products[index])
    })
}


function remove(id)
{
    return new Promise((resolve, reject) => 
    {
        products = products.filter((p) => p.id !== id) //filter out the product id to id that is passed in
        writeData('./data/products.json', products)
        resolve()
    })
}

module.exports = { find, findbyId, create, update, remove }