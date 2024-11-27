import express from 'express';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
// const express = require('express');
// const cors = require('cors');
const app = express();
const port = 5159;

// Directory organization
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const medications = [
    { id: 0, name: "Ibuprofen", type: "pain", strength: "1" },
    { id: 1, name: "Acetaminophen", type: "pain", strength: "1" },
    { id: 2, name: "Morphine", type: "pain", strength: "5" },
    { id: 3, name: "Zyrtec", type: "allergy", strength: "1" },
    { id: 4, name: "Allegra", type: "allergy", strength: "1" },
    { id: 5, name: "Xyzal", type: "allergy", strength: "4" },
    { id: 6, name: "Peptobismol", type: "digestive", strength: "1" },
    { id: 7, name: "Tums", type: "digestive", strength: "1" }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/medications', (req, res) => {
    res.json(medications);
});

app.get('/medications/search', (req, res) => {
    const searchTerm = req.query.name.toLowerCase();
    const filteredMeds = medications.filter(med => med.name.toLowerCase().includes(searchTerm));
    res.json(filteredMeds);
});

app.post('/medication', (req, res) => {
    const { name, type, strength } = req.body;
    const newMed = { id: medications.length, name, type, strength };
    medications.push(newMed);
    res.json(newMed);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
