const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MySQL DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Your MySQL username
  password: 'march',        // Your MySQL password
  database: 'login_db' // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL Database!');
  }
});

// POST route for handling login data
app.post('/login', (req, res) => {
  const { username, email, passcode, mobile } = req.body;

  if (!username || !email || !passcode || !mobile) {
    return res.json({ success: false, message: 'All fields are required.' });
  }

  const sql = 'INSERT INTO users (username, email, passcode, mobile) VALUES (?, ?, ?, ?)';

  db.query(sql, [username, email, passcode, mobile], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.json({ success: false, message: 'Database error.' });
    }
    res.json({ success: true, message: 'User data saved successfully!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
