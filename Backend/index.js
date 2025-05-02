const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Koneksi MongoDB
mongoose.connect('mongodb+srv://izzannsyarif:aSVGNCG34pwaIg1A@modul7-sbd.imwkkyg.mongodb.net/Modul9', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Inisialisasi Express
const app = express();
app.use(cors());
app.use(express.json());

// Routing
const todoRoutes = require('./src/routes/todos');
app.use('/', todoRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
