const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");

const app = express();
const PORT = 3000;

const upload = multer();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  // password: 'tahi@12',
  database: "sign_up",
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/sign", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

app.post("/api/sign_up", upload.none(), (req, res) => {
  let data = req.body;
  console.log(data);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database");
      res.status(500).send("Error connecting to the database");
      return;
    }

    let query =
      "INSERT INTO users(firstname, lastname, email, dob, phone, password) VALUES (?, ?, ?, ?, ?, ?)";
    let values = [
      data.firstname,
      data.lastname,
      data.email,
      data.dob,
      data.phone,
      data.password,
    ];

    // Execute the SQL query
    connection.query(query, values, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.log(err);
        res.status(500).send("Error executing SQL query");
      } else {
        console.log("Data inserted successfully");
        res.send("Data submitted successfully");
      }
    });
  });
});

app.get("/signs", (req, res) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database");
      res.status(500).send("Error connecting to the database");
      return;
    }

    // Query to fetch all sign ups from the 'users' table
    const selectusersSql = "SELECT * FROM users";

    // Execute the SQL query
    connection.query(selectusersSql, (err, users) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error executing the SQL query");
        res.status(500).send("Error executing SQL query");
        return;
      }

      // Send the sign up data as the response
      res.send(users);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
