import express from "express";
import setupSwagger from "./swagger/swagger";
import router from "./routes/router";
import authRoute from "./routes/authRouter";

const app = express();
const port = 3000;

app.use(express.json());
setupSwagger(app);

app.use("/api/auth", authRoute)
app.use("/api", router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
