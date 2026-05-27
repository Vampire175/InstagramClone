const express = require("express");
const { IgApiClient } =
    require("instagram-private-api");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/login", async (req, res) => {

    const { username, password } = req.body;

    const ig = new IgApiClient();

    try {

        ig.state.generateDevice(username);

        await ig.account.login(
            username,
            password
        );

        res.json({
            success: true
        });

    } catch (err) {

        res.json({
            success: false,
            error: err.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running");
});