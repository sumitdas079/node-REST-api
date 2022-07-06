const Product = require('../models/productModel')
const { getpostdata } = require('../utils')

// gets all products/ all api products ->  /api/product
async function getProducts(req, res) {
    try {
        const products = await Product.find()

        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error);
    }
}

// gets single product/  api product ->  /api/product:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findbyId(id)

        if (!product) {
            res.writeHead(404, { 'Content-type': 'application/json' })
            res.end(JSON.stringify({ message: 'Not found' }))
        } else {
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error);
    }
}


// creates a product
async function createProduct(req, res) {
    try {
        const body = await getpostdata(req)

        const { name, description, price } = JSON.parse(body)
        const product = {
            name,
            description,
            price
        }
        const newproduct = await Product.create(product)
        res.writeHead(201, { 'Content-type': 'application/json' })
        res.end(JSON.stringify(newproduct))
    } catch (error) {
        console.log(error);
    }
}


// update a product
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findbyId(id)

        if (!product) {
            res.writeHead(404, { 'Content-type': 'application/json' })
            res.end(JSON.stringify({ message: 'Not found' }))
        } else {
            const body = await getpostdata(req)

            const { name, description, price } = JSON.parse(body)
            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }
            const updtproduct = await Product.update(id, productData)
            res.writeHead(200, { 'Content-type': 'application/json' })
            return res.end(JSON.stringify(updtproduct))
        }
    } catch (error) {
        console.log(error);
    }
}

// deleted a product
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findbyId(id)

        if (!product) {
            res.writeHead(404, { 'Content-type': 'application/json' })
            res.end(JSON.stringify({ message: 'Not found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} deleted` }))
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }