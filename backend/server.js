const express = require('express');
const dotenv = require('dotenv');
const DBconnection = require('./src/config/database');
const authRoute = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use("/", authRoute);
app.use("/", projectRoutes);

app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    DBconnection();
});
