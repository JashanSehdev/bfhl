import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import bfhlRoutes from "./routes/bfhlRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bfhl", bfhlRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  express.static(
    path.join(__dirname, "../client/dist")
  )
);

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html")
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});