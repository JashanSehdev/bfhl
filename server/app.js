import express from "express";
import cors from "cors";

import bfhlRoutes from "./routes/bfhlRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bfhl", bfhlRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "BFHL API Running"
    });
});

app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
});