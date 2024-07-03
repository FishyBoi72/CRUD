const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let items = [];
let currentId = 1; 

app.post('/items', (req, res) => {
    const newItem = {
        id: currentId++,
        ...req.body
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

app.put('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    const updatedItem = {
        ...items[itemIndex],
        ...req.body
    };
    items[itemIndex] = updatedItem;
    res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    items.splice(itemIndex, 1);
    res.status(204).end();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
