class Product {
    constructor(id, name, price, stock) {
        this.id = id
        this.name = name;
        this.price = price;
        this.stock = stock;    
    }

    getStock = () => {
        return this.stock;
    }

    setStock = (stock) => {
        this.stock = stock;
    }

    getPrice = () => {
        return this.price;
    }

    getId = () => {
        return this.id;
    }

    getName = () => {
        return this.name;
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
        const prd = this.products.filter( prd => { if (prd.id === product.getId()) return prd });
        if (prd.length === 0) {
            const newProduct = new Product(product.getId(), product.getName(), product.getPrice(), 1);
            this.products.push(newProduct);
            this.totalProducts += 1;
            this.total += product.getPrice();
        } else {
            this.products.forEach(prd => {
                if (prd.getId() === product.getId()) {
                    prd.setStock(prd.getStock()+1);
                }
            });
            this.totalProducts += 1;
            this.total += product.getPrice();
        }
    }    
}

const products = [];

const cart = new Cart();

const divProducts = document.getElementById('products');

const divCart = document.getElementById('cart');

const initProducts = (n) => {
    for( let i=1; i <= n; i++ ) {
        products.push( new Product(i, `Product ${i}`, Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10) ) );
        //products.push( new Product(i, `Product ${i}`, 10000, 10 ) );
    }
}

const clearDiv = (div) => {
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
}

const drawCart = () => {
    clearDiv(divCart);

    let pCart = document.createElement('p');
    pCart.innerText = `Total de productos $ ${cart.total}`;
    divCart.appendChild(pCart);
    cart.products.map( ({id, name, stock}) => {
        let div = document.createElement('div');
        let pName = document.createElement('p');
        pName.innerText = `${name} cantidad ${stock}`;
        div.appendChild(pName);
        divCart.appendChild(div);
    });

    
}

const drawProducts = () => {
    
    clearDiv(divProducts);
    
    products.map( ({ id, name ,stock, price } )=> {
        createDivProduct(id, name, stock, price);
    });

    drawCart();
    
}

const addCart = (id) => {
    products.forEach( prd => {
        if (prd.id === id) {
            if (prd.stock === 0) {
                alert(`Producto ${prd.name} sin stock`);   
            } else {
                prd.setStock(prd.getStock()-1);
                cart.addProduct(prd);
            }
        }
    });
}


const createDivProduct = (id, name, stock, price) => {
    let div = document.createElement('div');
    let btn = document.createElement('button');
    let pName = document.createElement('p');
    pName.innerText = `${name} $${price}-> quedan ${stock} disponibles.`;
    btn.innerHTML = 'Añadir al carro';
    btn.onclick = function() { 
        addCart(id);
        drawProducts();
    };
    div.appendChild(pName);
    div.appendChild(btn);
    divProducts.appendChild(div);
}


const init = (n) => {
    
    initProducts(n);

    drawProducts();
}




