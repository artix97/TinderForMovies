import express from "express";
import cors from "cors";
import helmet from "helmet";
import recomendationsRoutes from "./routes/recommendationRoutes.js";

// Configurations
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use("/recommendations", recomendationsRoutes );
app.listen(8080,()=>{console.log("Server running on port 8080")})


