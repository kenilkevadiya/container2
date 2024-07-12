const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 6001;
const FILE_DIR = process.env.FILE_DIRECTORY || "/kenil_PV_dir";

// container2

app.post('/calculate', (req, res) => {
    const { file, product } = req.body;
    const filePath = path.join(FILE_DIR, file);

    let sum = 0;
    let isFileEmpty = true;

    fs.createReadStream(filePath)
        .on('error', () => {
            return res.json({ file, error: 'File not found.'});
        })
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim()
        }))
        .on('data', (data) => {
            isFileEmpty = false;
            if (data.product === product) {
                console.log(data);
                console.log(product);
                sum += parseInt(data.amount, 10);
                console.log(sum)
            }
        })
        .on('end', () => {
            if (isFileEmpty) {
                return res.json({ file, error: 'Input file not in CSV format.' });
            }
            return res.json({ file, sum  });
        });
        

});

app.listen(PORT, () => {
    console.log(`Container 2 is listening on port ${PORT}`);
});