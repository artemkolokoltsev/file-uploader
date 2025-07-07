const express = require('express');
const router = express.Router();
const client = require('../cosmosClient');
require('dotenv').config();

const db = client.database(process.env.COSMOS_DB);
const container = db.container(process.env.COSMOS_CONTAINER);

// GET
router.get('/files', async (req, res) => {
    try {
        const query = 'SELECT * FROM c';
        const { resources } = await container.items.query(query).fetchAll();
        res.json(resources);
    } catch (error) {
        console.error('Error querying Cosmos DB:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// POST
router.post('/files', async (req, res) => {
    const items = req.body;

    if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Expected an array of items.' });
    }

    try {
        const results = [];

        for (const item of items) {
            const { resource } = await container.items.create(item);
            results.push(resource);
        }

        res.status(201).json({ inserted: results.length });
    } catch (error) {
        console.error('Error inserting items:', error.message);
        res.status(500).json({ error: 'Failed to insert items' });
    }
});

module.exports = router;
