class Product {
    
    constructor(id, name, price, stock) {
        this.id = id
        this.name = name;
        this.price = price;
        this.stock = stock;    
    }

    getId = () => {
        return this.id;
    }

    getName = () => {
        return this.name;
    }

    getPrice = () => {
        return this.price;
    }

    setPrice = (price) => {
        this.price = price;
    }

    getStock = () => {
        return this.stock;
    }

    setStock = (stock) => {
        this.stock = stock;
    }


}

class Cart {
    constructor(totalProducts = 0, tax = 0, total = 0) {
        this.totalProducts = totalProducts;
        this.tax = tax;
        this.total = total;
        this.products = [];
    }

    addProduct = (product) => {
        this.products.push(product);
        this.totalProducts += 1;
        this.total += product.getPrice();
    }    
}

const initProducts = (n) => {
    let prd = [];

    for( let i=1; i <= n; i++ ) {
        //prd.push( new Product(i, `Product ${i}`, Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10) ) );
        prd.push( new Product(i, `Product ${i}`, 10000, 10 ) );
    }

    return prd;
}

const addCart = (cart = Cart, prds = [], id) => {
    const prd = prds.filter( p => p.id === id );
    cart.addProduct(prd[0]);

    prds.forEach( p => {
        if (p.getId() === id) {
            p.setStock( p.getStock() - 1);
        }
    });
}

const clearDiv = (div) => {
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
}


const createDiv = (divProducts, name, id, products, cart, stock) => {
    let div = document.createElement('div');
    let btn = document.createElement('button');
    let pName = document.createElement('p');
    pName.innerText = `${name} -> quedan ${stock} disponibles.`;
    btn.innerHTML = 'Añadir al carro';
    btn.onclick = function() { 
        addCart(cart, products, id);
        drawProducts(products, cart);
    };
    div.appendChild(pName);
    div.appendChild(btn);
    divProducts.appendChild(div);
}

const drawProducts = (products = [], cart) => {
    const divProducts = document.getElementById('products');
    const divCart = document.getElementById('cart');
    clearDiv(divProducts);
    clearDiv(divCart);
    products.map( prod => {
        let {name, id, stock} = prod;
        createDiv(divProducts, name, id, products, cart, stock); 
    });

    let pCart = document.createElement('p');
    pCart.innerText = `Cantidad de productos en el carrito ${cart.products.length}`;
    divCart.appendChild(pCart);

}


const products = initProducts(5); 

const cart = new Cart();

drawProducts(products, cart);


