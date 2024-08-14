const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
mongoose.pluralize(null);

// Create an Express application
const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML form)
app.use(express.static('form.html'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/nikeStore', {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

// Define a Mongoose schema for the orders
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    shoeModel: { type: String, required: true },
    shoeSize: { type: Number, required: true },
    shoeColor: { type: String, required: true }
});

// Create a Mongoose model from the schema
const Order = mongoose.model('Order', orderSchema);

// Serve the form.html file when accessing the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submissions
app.post('/submit-order', async (req, res) => {
    const { name, email, phone, address, shoeModel, shoeSize, shoeColor } = req.body;

    try {
        // Create a new order instance with the form data
        const newOrder = new Order({
            name,
            email,
            phone,
            address,
            shoeModel,
            shoeSize,
            shoeColor
        });

        // Save the order to the database
        await newOrder.save();

        // Send a success response
        res.send(`Thank you for your order, ${name}! We will process it shortly.`);
    } catch (error) {
        console.error("Error saving the order:", error);
        res.status(500).send("Failed to process your order. Please try again.");
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
