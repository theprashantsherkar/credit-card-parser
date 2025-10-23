# Credit Card Statement Parser

A lightweight, extensible service that parses credit-card statements (PDF) from major card providers and extracts **key data points** like last 4 digits, billing cycle, due date & total amount due.
Built by **Prashant Sherkar**.

## Why this exists  
When you receive a credit-card statement PDF (HDFC, ICICI, SBI, Axis, Amex etc.), manually reading and extracting details can be tedious. This tool automates that process — upload the PDF, and get meaningful structured JSON output. Great for automation, workflows or simply saving time.

## Features  
- Supports **5 major card providers**.  
- Extracts 5 key data points:  
  - Provider name  
  - Card last 4 digits  
  - Billing period / statement cycle  
  - Payment due date  
  - Total amount due  
- Handles **real-world PDF formats** (using robust parsing).  
- Simple REST API for upload + parse.  
- Front-end UI component to select file and view results.

## 🧱 Tech stack  
- **Backend**: Node.js + Express  
- PDF parsing: `pdfjs-dist` (via `pdfjs-dist/legacy/build/pdf.js`)  
- File upload: `multer`  
- **Frontend**: React (Functional Components + Hooks)  
- Styling: Tailwind CSS  
- Environment config: `dotenv`

### 🛠️ Installation  

#### 1️⃣ Clone the repository  
```bash
git clone https://github.com/theprashantsherkar/credit-card-parser.git
cd credit-card-parser
cd backend
npm install
PORT=8000
node index.js

cd ../frontend
npm install
npm run dev