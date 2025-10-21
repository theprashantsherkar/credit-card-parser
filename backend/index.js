import express from "express";
import multer from "multer";
import pdf from "pdf-parse";
import dotenv from 'dotenv';
import fs from "fs";

import { detectProvider, parseStatement } from "./parser/utils.js";


dotenv.config({ path: './config.env' });
const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(dataBuffer);
    const text = data.text;

    const provider = detectProvider(text);
    const extracted = parseStatement(provider, text);

    fs.unlinkSync(req.file.path); // cleanup
    res.json(extracted);
});

app.listen(PORT, () => console.log("Server running on port 4000"));
