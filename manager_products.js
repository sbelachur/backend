const fs = require ('fs')

class productManager {

    constructor (filename) {
        this.filename = filename
        this.format = 'utf-8'
    }


    getNextID =  async () => {

        const data = await this.getProduct ()

        const count = data.length

        if (count > 0) {
            const lastProduct = data [count-1]
            const newID = lastProduct.id + 1

            return newID
        } else {
            return 1
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const id = await this.getNextID ()

        return this.getProduct ()
            .then (products => {
                products.push ({id, title, description, price, thumbnail, code, stock})
                return products
            })
            .then (productsNew => fs.promises.writeFile (this.filename, JSON.stringify(productsNew)) )

    }

    getProductByID = async (id) => {
        const data = await this.getProduct()
        const productFound = data.find (product => product.id === id)
        return productFound || console.log ('No se encuentra el producto')
    }

    getProduct = async () => {
        const product = fs.promises.readFile(this.filename, this.format)
        return product
            .then (content => JSON.parse (content))
            .catch ( e => { if (e) return []})
    }

    updateProduct = async (id, field, newData) => {
        const data = await this.getProduct ()
        const updateNext = data.find ( product => product.id === id)

        updateNext [field] = newData;

        await fs.promises.writeFile(this.filename, JSON.stringify(data))

    }

    deleteProduct = async (id) => {
        const data = await this.getProduct ()
        const deleteNext = data.find (product => product.id === id )

        if (deleteNext) {
            const index = data.indexOf (deleteNext)
            data.splice (index, 1)
            await fs.promises.writeFile(this.filename, JSON.stringify(data))
            console.log ('El producto ha sido eliminado')
        } else {
            console.log('El producto no se encuentra en la lista')
        }
    }
 
}

async function run () {

    const manager = new productManager ('./products.json')
    await manager.addProduct ("Producto Prueba 1", "Es un producto prueba 1", 200, "Sin imagen", "code123", 25)
    await manager.addProduct ("Producto Prueba 2", "Es un producto prueba 2", 60, "Sin imagen", "code124", 100)
    await manager.addProduct ("Producto Prueba 3", "Es un producto prueba 3", 160, "Sin imagen", "code125", 1000)
    await manager.deleteProduct(2)
    await manager.updateProduct(3, "title", "Cambio Título")

    console.log (await manager.getProduct())
    console.log (await manager.getProductByID(1));
    console.log (await manager.getProductByID(4))

}

run ()