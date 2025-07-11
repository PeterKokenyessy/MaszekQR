const express = require('express');
const fs = require('fs').promises; // aszinkron fájlkezelés
const app = express();
const port = 3000;
const dbFile = 'dataBase.txt';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Teljes fájl felülírás POST-tal
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

// Teljes fájl visszaolvasása
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
});
