let products = {};
const baseURL = 'http://localhost:3000/info';

function categoriaAddBt (){
    const categoriInput = document.getElementById('categoriInput');
    const category = categoriInput.value.trim();
    if(products[category]){
        alert("Ez a kategória már létezik.");
    }else{
        products[category] = [];
        addSelectcategory();
        console.log(products);
    }
    displayProducts()
    sendDataToServer();
}

function addSelectcategory(){
    const categorySelect = document.getElementById("type");
    categorySelect.innerHTML = ""; // az elsot is torli, de mukodik.
    
    for(const category in products){
        const option = document.createElement("option");
        option.textContent = category;
        option.value = category;
        categorySelect.append(option);
    }
}

async function getDataFromServer (){
    try {
        const res = await fetch('http://localhost:3000/output');
        if(!res.ok){
            throw new Error(`http hiba Statusz: ${res.status}`);
        }
        const data = await res.json();
        console.log('fajlt tartalma',data);
        products = data;
        addSelectcategory();
        displayProducts();
    } catch (error) {
        console.error('hiba tortent az adatok lekerdezesekor: ',error);
    }
}

async function sendDataToServer() {
    try {
        const res = await fetch('http://localhost:3000/ujadat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });
        if (!res.ok) throw new Error('HTTP error: ' + res.status);
        const result = await res.json();
        console.log(result);
    } catch (err) {
        console.error('Fetch POST error:', err);
    }
}

function deleteTr (e) {
    const tempResult = {}
    const productTr = e.target.closest('tr');
    console.log(productTr.id);

    for(const key in products){
        if(Array.isArray(products[key])){
            tempResult[key] = products[key].filter(e => e.id !== productTr.id)
        }
    }

    products = tempResult;
    sendDataToServer();
    productTr.remove();
}

function displayProducts (){
    const dispalyContanier = document.getElementById('dispalyContanier');
    dispalyContanier.innerHTML = "";

    for(const category in products){

        const categoryDiv = document.createElement('div');
        categoryDiv.textContent = category;

        const table = document.createElement('table');
        products[category].forEach(product => {
            const tr = document.createElement('tr');
            tr.id = product.id;

            tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price} Ft</td>
            <td>${product.description}</td>
            `
            const deleteBtn = document.createElement('a');
            deleteBtn.textContent = "❌";
            deleteBtn.addEventListener('click',(e) =>{
                deleteTr(e)                
            });
            tr.appendChild(deleteBtn);

            table.appendChild(tr);
        });
        categoryDiv.appendChild(table);
        dispalyContanier.appendChild(categoryDiv);
    }

}

function addBtnLoad (){ // kemeny kivetelkezeles
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const descriptionInput = document.getElementById("description");
    const categoriInput = document.getElementById('type');

    const productStructure = {
        id: crypto.randomUUID(),
        name: nameInput.value,
        price: priceInput.value,
        description: descriptionInput.value,
        available: true
    }
    products[categoriInput.value].push(productStructure);
    console.log(products);
    
    displayProducts();
    sendDataToServer();
}

function loadEvent (){
getDataFromServer();

const elementAddBt = document.getElementById("add");
elementAddBt.addEventListener("click",addBtnLoad);

const categoryBtn = document.getElementById('categoriBtn');
categoryBtn.addEventListener('click',categoriaAddBt);
}

window.addEventListener("load",loadEvent);