const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const users = []; // This should be a database in a real application

app.use(bodyParser.json());
app.use(cors()); // To allow cross-origin requests

app.get('/', (req,res) => {
    res.send('Hello World!');
})

// Register endpoint 

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log({email,password});
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ email, password: hashedPassword });
    res.status(200).send('User registered successfully');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).send({ auth: true });
    } else {
        res.status(401).send('Invalid email or password');
    }
});

// Start server
const port = 3005;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

