const express = require ('express')
const fs = require ('fs')
const filename = "../../clase6/archivos/products.json"
const format = "utf-8"
const products = fs.readFileSync (filename, format)
const productsList = JSON.parse (products)

const app = express ()

app.get('/products', (request, response) => {

    const limit = request.query.limit

    if (limit) {
        response.send (productsList.slice(0,limit))
    } else {
        response.send(productsList)
    }
})

app.get ('/products/:idproduct', (request, response) => {
    const productID = request.params.idproduct

    const product = productsList.find(product => product.id == productID)

    if (!product) response.send ({error: "Producto no encontrado"})
    else response.send (product)
})

app.listen(8080, () => console.log ('El servidor está corriendo..."'))