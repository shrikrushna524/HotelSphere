const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server host
  user: 'root',      // Replace with your MySQL username
  password: 'march', // Replace with your MySQL password
  database: 'Sdata' // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  
  // Query the Sdata table
  const query = 'SELECT * FROM Sdata';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return;
    }

    console.log('Data retrieved:', results);
    
    // Close the connection
    connection.end();
  });
});