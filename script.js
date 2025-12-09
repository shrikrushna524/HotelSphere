const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'march',
  database: 'login' 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to MySQL database.');
  }
});

app.post('/log', (req, res) => {
  const { username, email, passcode, mobile } = req.body;

  if (!username || !email || !passcode || !mobile) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const query = 'SELECT * FROM login WHERE username = ? AND email = ? AND passcode = ? AND mobile = ?';
  const values = [username, email, passcode, mobile];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error during query:', err.message);
      return res.status(500).json({ success: false, message: 'Database query error' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful!' });
    } else {
      res.json({ success: false, message: 'Invalid login credentials' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
