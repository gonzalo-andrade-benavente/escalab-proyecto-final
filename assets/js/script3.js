const products = [];
const divProducts = document.getElementById('products');

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

}

const initProducts = (n) => {
    for( let i=1; i <= n; i++ ) {
        //prd.push( new Product(i, `Product ${i}`, Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10) ) );
        products.push( new Product(i, `Product ${i}`, 10000, 10 ) );
    }
}

const clearDiv = (div) => {
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
}

const drawProducts = () => {
    const divProducts = document.getElementById('products');
    const divCart = document.getElementById('cart');
    
    clearDiv(divProducts);
    clearDiv(divCart);
    
    products.map( prod => {
        const { id, name ,stock }  = prod;
        createDivProduct(id, name, stock);
    });

    /*
    let pCart = document.createElement('p');
    pCart.innerText = `Cantidad de productos en el carrito ${cart.products.length}`;
    divCart.appendChild(pCart);
    */
}

const addCart = (id) => {
    products.forEach( prd => {
        if (prd.id === id) {
            if (prd.stock === 0) {
                alert(`Producto ${prd.name} sin stock`);   
            } else {
                prd.setStock(prd.getStock()-1);
            }
        }
    });
}


const createDivProduct = (id, name, stock) => {
    let div = document.createElement('div');
    let btn = document.createElement('button');
    let pName = document.createElement('p');
    pName.innerText = `${name} -> quedan ${stock} disponibles.`;
    btn.innerHTML = 'Añadir al carro';
    btn.onclick = function() { 
        addCart(id);
        drawProducts();
    };
    div.appendChild(pName);
    div.appendChild(btn);
    divProducts.appendChild(div);
}




