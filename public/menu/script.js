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
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'categryContanier';

    for (const category in products) {
        let hasItems = false;

        const categoryH2 = document.createElement('h2');
        categoryH2.className = 'Category';
        categoryH2.textContent = category;

        const section = document.createElement('div');

        products[category].forEach(product => {
            if (product.available) {
                hasItems = true;

                const itemContainer = document.createElement('div');

                const itemLine = document.createElement('div');
                itemLine.className = 'menu-item';

                const itemName = document.createElement('span');
                itemName.className = 'menu-name';
                itemName.textContent = product.name;

                const itemDots = document.createElement('span');
                itemDots.className = 'menu-dots';

                const itemPrice = document.createElement('span');
                itemPrice.className = 'menu-price';
                itemPrice.textContent = `${product.price} Ft`;

                itemLine.appendChild(itemName);
                itemLine.appendChild(itemDots);
                itemLine.appendChild(itemPrice);

                const itemDesc = document.createElement('div');
                itemDesc.className = 'menu-description';
                itemDesc.textContent = product.description;

                itemContainer.appendChild(itemLine);
                itemContainer.appendChild(itemDesc);

                section.appendChild(itemContainer);
            }
        });

        if (hasItems) {
            categoryContainer.appendChild(categoryH2);
            categoryContainer.appendChild(section);
        }
    }

    rootElement.appendChild(categoryContainer);
}


window.addEventListener('load', loadEvent);