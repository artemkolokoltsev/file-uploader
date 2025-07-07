const express = require('express');
const router = express.Router();
const client = require('../cosmosClient');
require('dotenv').config();

router.get('/data', async (req, res) => {
    try {
        const db = client.database(process.env.COSMOS_DB);
        const container = db.container(process.env.COSMOS_CONTAINER);

        const query = 'SELECT * FROM c';
        const { resources } = await container.items.query(query).fetchAll();

        res.json(resources);
    } catch (error) {
        console.error('Error querying Cosmos DB:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;