const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productControllers')

const server = http.createServer((req, res) => {

    //if the request is a GET request and url is for the products page otherwise not found
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    }

    //for proper routing to find a specific product
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    }

    //create a product
    else if(req.url === '/api/products' && req.method === 'POST')
    {
        createProduct(req, res)
    }

    //to update a product
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    }

    //to delete a product
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE')
    {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    }
    else {
        res.writeHead(400, { 'Content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }

})
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))