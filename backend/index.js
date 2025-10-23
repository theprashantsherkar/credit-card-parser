const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse"); 
const dotenv = require('dotenv'); 
const fs = require("fs");
const cors = require('cors');

const { detectProvider, parseStatement } = require("./parser/utils.js");



dotenv.config({ path: './config.env' });
const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ dest: "uploads/" });

app.use(
    cors({
        origin: ["https://credit-card-assessment.vercel.app"], 
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options("*", cors());

app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: "hello from backend"
    })
});

app.post("/upload", upload.single("file"), async (req, res) => {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    const provider = detectProvider(text);
    const extracted = parseStatement(provider, text);

    fs.unlinkSync(req.file.path); // cleanup
    res.json(extracted);
});



app.listen(PORT, () => console.log("Server running on port ", PORT));
