let products = [];

class Product {
        constructor(id, name, price, stock) {
        this.id = id
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

}

class Cart {
    constructor(totalProducts, tax, total) {
        this.totalProducts = totalProducts;
        this.tax = tax;
        this.total = total;
        this.products = []
    }

    addProduct = (product) => {
        this.products.push(product);
    }    
}

const cart = new Cart(0, 2000, 0);

const initProducts = (numProducts) => {    
    let tmpProducts = [];
    for(let i = 0; i < numProducts; i++ )
        tmpProducts.push( new Product(
                            i+1,
                            `Producto ${i+1}`, 
                            Math.floor(Math.random() * 10000), 
                            Math.floor(Math.random() * 10) + 1) 
                        );

    return tmpProducts;
}

const addCart = (id) => {
    product = products.filter( prod => prod.id === id );
    cart.addProduct(product);
    products.map( prod => {
        if (prod.id === id)  {
            prod.stock -= 1;
        }
        
    });
    console.log(cart, products);
}

const createDiv = (divProducts, name, id) => {
    let div = document.createElement('div');
    let btn = document.createElement('button');
    let pName = document.createElement('p');
    pName.innerText = name;
    btn.innerHTML = 'Añadir al carro';
    btn.onclick = function() { addCart(id) };
    div.appendChild(pName);
    div.appendChild(btn);
    divProducts.appendChild(div);
}

const drawProducts = (products = []) => {
    const divProducts = document.getElementById('products');
    products.map( prod => {
        let {name, id} = prod;
        createDiv(divProducts, name, id); 
    });
}

const init = () => {
    products = initProducts(10);
    drawProducts(products);
}


init();



