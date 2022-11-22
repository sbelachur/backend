class productManager {

    constructor () {
        this.products = []

    }

    getProducts = () => {return this.products}

    getNextID = () => {

        const count = this.products.length

        if (count > 0) {
            const lastProduct = this.products[count-1]
            const newID = lastProduct.id + 1

            return newID
        } else {
            return 1
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        const id = this.getNextID()

        const product = {

            id,
            title,
            description, 
            price, 
            thumbnail,
            code,
            stock
        }

        const duplicatedCode = this.products.some (product => product.code === code)

        if(!duplicatedCode) { this.products.push(product)
        }
    }

    getProductByID = (id) => {
        const findProduct = this.products.find(product => product.id === id)
        return findProduct || console.error ('No se encuentra el producto')
    }

    camposObligatorios = (title, description, price, thumbnail, code, stock) => {
        if(title == (undefined || "") || description == (undefined || "") || price == (undefined || "") || thumbnail== (undefined || "") || code == (undefined || "") || stock == (undefined || "")) {
            return false
        } else {
            return true
        }
    }

}

const manager = new productManager ()

console.log(manager.getProducts());

manager.addProduct("Producto Prueba", "Es un producto prueba", 200, "Sin imagen", "code123", 25)
manager.addProduct("Producto Prueba 2", "Es un producto prueba 2", 60, "Sin imagen", "code124", 100)
manager.addProduct("Producto Prueba", "Es un producto prueba", 200, "Sin imagen", "code123", 25)
manager.addProduct("", "", 200, "Sin imagen", "code123", 25)
console.log(manager.getProducts());

console.log(manager.getProductByID(2))
console.log(manager.getProductByID(3))