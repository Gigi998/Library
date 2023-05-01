const express = require("express");
export default express;
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
require("dotenv").config();
const cookieParse = require("cookie-parser");
import { verifyJWT } from "./middleware/verifyJWT";
import { Request, Response } from "express";
import credentials from "./middleware/credentials";

// Check options
app.use(credentials);

// Check cors
app.use(cors(corsOptions));

// built in middleware for json
app.use(express.json());

app.use(cookieParse());

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/api/students", require("./routes/api/students"));
app.use("/api/books", require("./routes/api/books"));

// Catch 404
app.get("/*", (req: Request, res: Response) => {
  res.status(400).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
