require("dotenv").config(); // Ensure environment variables are loaded
const mysql = require("mysql2/promise");

// Validate environment variables
if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_NAME
) {
  throw new Error(
    "❌ Missing required database environment variables. Check your .env file."
  );
}

// Database connection pool configuration
const dbConfig = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Async query function
async function query(sql, params) {
  let connection;

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    console.log("✅ Database connected");

    // Execute SQL query
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.log("❌ Database Query Error:", error.message);
    throw error; // Ensure errors propagate to the caller
  } finally {
    if (connection) connection.release(); // Always release the connection
  }
}
async function testConnection() {
  try {
    // Test the connection with a simple query
    const result = await query("SELECT 1 + 1 AS solution");
    console.log("✅ Database connection is working:", result);
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
  }
}

// Call the test function to verify the connection
testConnection();

// Export the query function for database operations
module.exports = { query };
