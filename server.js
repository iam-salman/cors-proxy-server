const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send("Missing 'url' query parameter");
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

app.get("/", (req, res) => {
    res.json({
        test: "Welcome to the General CORS Proxy Server!",
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
