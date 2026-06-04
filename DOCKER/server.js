import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 3000;

// Create __dirname manually in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
