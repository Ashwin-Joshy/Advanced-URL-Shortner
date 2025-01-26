import express from "express";
import setupSwagger from "./swagger/swagger";
import cors from 'cors';
import router from "./routes/mainRouter";
import authRoute from "./routes/authRouter";
import * as dotenv from "dotenv";
import { AppDataSource } from "./datasource";
import session from 'express-session';
import passport from "passport";
import { initializePassport } from "./passport.setup";
import { authenticateToken } from "./middlewares/authMiddleware";
import analyticsRouter from "./routes/analyticsRouter";

dotenv.config()
const app = express();
const port = 3000;
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true, 
};
app.set('trust proxy', true)
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(cors(corsOptions))


app.use(passport.initialize());
app.use(passport.session());


app.use(cors(corsOptions));

initializePassport();

AppDataSource.initialize().then(() => {
  console.log("Database connected");
}).catch((error: any) => console.log("Database connection error: ", error));

setupSwagger(app);

app.use("/api/auth", authRoute)
app.use("/api/analytics", analyticsRouter)
app.use("/api", router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
