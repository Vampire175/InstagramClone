const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(
    path.join(__dirname, "public")
));

app.post("/api/login", async (req, res) => {

    const { username, password } = req.body;

    console.log(username, password);

    res.json({
        success: true
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running");
});