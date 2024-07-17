// Require the Express module, which is a framework for building web applications in Node.js.
const express = require('express');

// Create an instance of an Express application.
const app = express();

// Define the port number on which the server will listen.
const port = 3000;

// Middleware to parse JSON bodies from incoming requests.
app.use(express.json());

// In-memory storage for items. Initially empty.
let items = [];

// Variable to keep track of the current item ID. Starts at 1.
let currentId = 1;

// Route to handle POST requests to '/items' for creating a new item.
app.post('/items', (req, res) => {
    // Create a new item object with a unique ID and the data from the request body.
    const newItem = {
        id: currentId++, // Increment the ID for the next item.
        ...req.body // Spread the properties from the request body into the new item.
    };
    // Add the new item to the items array.
    items.push(newItem);
    // Respond with the newly created item and a status code of 201 (Created).
    res.status(201).json(newItem);
});

// Route to handle GET requests to '/items' for retrieving all items.
app.get('/items', (req, res) => {
    // Respond with the array of items in JSON format.
    res.json(items);
});

// Route to handle GET requests to '/items/:id' for retrieving a specific item by ID.
app.get('/items/:id', (req, res) => {
    // Find the item with the specified ID in the items array.
    const item = items.find(i => i.id === parseInt(req.params.id));
    // If the item is not found, respond with a 404 (Not Found) status code and a message.
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    // If the item is found, respond with the item in JSON format.
    res.json(item);
});

// Route to handle PUT requests to '/items/:id' for updating a specific item by ID.
app.put('/items/:id', (req, res) => {
    // Find the index of the item with the specified ID in the items array.
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    // If the item is not found, respond with a 404 (Not Found) status code and a message.
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    // Create an updated item object by merging the existing item with the new data from the request body.
    const updatedItem = {
        ...items[itemIndex], // Spread the properties of the existing item.
        ...req.body // Spread the properties from the request body, overwriting existing ones if necessary.
    };
    // Update the item in the items array with the updated item.
    items[itemIndex] = updatedItem;
    // Respond with the updated item in JSON format.
    res.json(updatedItem);
});

// Route to handle DELETE requests to '/items/:id' for deleting a specific item by ID.
app.delete('/items/:id', (req, res) => {
    // Find the index of the item with the specified ID in the items array.
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    // If the item is not found, respond with a 404 (Not Found) status code and a message.
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    // Remove the item from the items array.
    items.splice(itemIndex, 1);
    // Respond with a 204 (No Content) status code, indicating successful deletion.
    res.status(204).end();
});

// Error-handling middleware for catching and responding to internal server errors.
app.use((err, req, res, next) => {
    // Log the error stack trace to the console.
    console.error(err.stack);
    // Respond with a 500 (Internal Server Error) status code and a message.
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the Express server, listening on the defined port.
app.listen(port, () => {
    // Log a message to the console indicating that the server is running.
    console.log(`Server is running on http://localhost:${port}`);
});
