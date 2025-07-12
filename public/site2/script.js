function loadEvent() {
    getDataFromServer();
}

async function getDataFromServer() {
    try {
        const res = await fetch('http://localhost:3000/output');
        if (!res.ok) {
            throw new Error(`http hiba Statusz: ${res.status}`);
        }
        const data = await res.json();
        console.log('fajlt tartalma', data);
        displayProducts(data)
    } catch (error) {
        console.error('hiba tortent az adatok lekerdezesekor: ', error);
    }
}
function displayProducts(products) {
    const rootElement = document.getElementById('rootElement');

    const categoyContanier = document.createElement('div');
    categoyContanier.className = 'categryContanier';

    for (const category in products) {
        let categoryValid = false;

        const categoryH2 = document.createElement('h2');
        categoryH2.className = 'Category'
        categoryH2.textContent = category;

        const table = document.createElement('table');


        products[category].forEach(product => {
            if (product.available) {
                const productTr = document.createElement('tr');
                productTr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                `
                table.appendChild(productTr);
                categoryValid = true;
            }
        });
        if (categoryValid) {
            categoyContanier.appendChild(categoryH2);
            categoyContanier.appendChild(table);
        }
    }
    rootElement.appendChild(categoyContanier)
}

window.addEventListener('load', loadEvent);