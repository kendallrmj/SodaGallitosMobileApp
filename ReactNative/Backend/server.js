import express from "express";
import cors from "cors";
import morgan from "morgan";

import mobileRoutes from "./routes/mobileApp.js";

const app = express();

app.set("port", 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mobileRoutes);

app.listen(app.get('port'))
console.log('Server on port', app.get('port'))

