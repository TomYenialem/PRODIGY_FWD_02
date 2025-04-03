require("dotenv").config();
const express = require("express");
const cors = require("cors");
const route = require("./Routes/allRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // ✅ Corrected: Apply CORS middleware properly
app.use(route);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
