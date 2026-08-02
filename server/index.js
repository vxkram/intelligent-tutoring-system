const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authModel = require('./models/auth');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
	.connect('mongodb://localhost:27017/auth')
	.catch((err) => console.error('MongoDB connection failed:', err.message));

app.post('/register', (req, res) => {
	authModel
		.create(req.body)
		.then((admin) => res.status(201).json(admin))
		.catch((err) => res.status(400).json({ error: err.message }));
});

app.listen(3001, () => {
	console.log('server listening on port 3001');
});
