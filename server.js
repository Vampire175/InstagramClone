const express = require("express");
const fs = require("fs");
const path = require("path");

const {
    IgApiClient
} = require("instagram-private-api");

const app = express();

app.use(express.json());

app.use(express.static(
    path.join(__dirname, "public")
));

app.post("/api/login", async (req, res) => {

    console.log("BODY:", req.body);

    const { username, password } = req.body;

    // Empty check
    if (!username || !password) {

        return res.json({
            success: false,
            error: "Username or password missing"
        });
    }

    const ig = new IgApiClient();

    try {

        // Generate device
        ig.state.generateDevice(username);

        // Load previous session if exists
        if (fs.existsSync("./state.json")) {

            const state = JSON.parse(
                fs.readFileSync("./state.json")
            );

            await ig.state.deserialize(state);

            console.log("Previous session loaded");
        }

        // Login
        await ig.account.login(
            username,
            password
        );

        console.log("LOGIN SUCCESS");

        // Save session
        const state = await ig.state.serialize();

        delete state.constants;

        fs.writeFileSync(
            "./state.json",
            JSON.stringify(state)
        );

        console.log("Session saved");

        res.json({
            success: true
        });

    } catch (err) {

        console.log("FULL ERROR:");
        console.log(err);

        res.json({
            success: false,
            error: err.message,
            name: err.name
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );
});