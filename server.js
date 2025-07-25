const express = require('express');
const fs = require('fs').promises; 
const app = express();
const port = 3000;
require('dotenv').config();
const dbFile = 'dataBase.json';


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/szerkeszto', express.static('public/szerkeszto'));
app.use('/', express.static('public/menu'));




app.post('/ujadat', async (req, res) => {
    const input = req.body;

    try {
        await fs.writeFile(dbFile, JSON.stringify(input, null, 2), 'utf8');
        res.status(200).send({ info: 'Sikeres felülírás', data: input });
    } catch (err) {
        console.error(err);
        res.status(500).send('Hiba történt a fájl írásakor');
    }
});


app.get('/output', async (req, res) => {
    try {
        const raw = await fs.readFile(dbFile, 'utf8');
        const parsed = JSON.parse(raw);
        res.json(parsed);
    } catch (err) {
        console.error(err);
        res.status(500).send('Hiba történt a fájl olvasásakor');
    }
});

app.listen(port, () => {
    console.log(`Szerver fut: http://localhost:${port}`);
    console.log(`Szerver fut: http://localhost:${port}/szerkeszto`);


});
