const { isUtf8 } = require('buffer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post('/ujadat', (req, res) => {
    const input = req.body
    fs.writeFileSync("dataBase.txt",JSON.stringify(input,null,2) + '\n' ,(err) => { 
        if(err){
            console.log(err);
            res.status(500).send("hiba tortent");
        } else {
            res.status(200).send({info: "sikeres api",data: input})
        }
    })
});

app.get("/output", (req, res) => {
    try {
        const data = fs.readFileSync('dataBase.txt', 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).send("Nem sikerült beolvasni a fájlt");
    }
});

app.listen(port, () => {
  console.log(`Szerver fut: http://localhost:${port}`);
});