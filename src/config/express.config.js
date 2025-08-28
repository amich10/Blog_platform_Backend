import express from "express";
import router from "./router.config.js";
import "./db.config.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();

app.use(
  cors({
    origin: "https://blog-frontend-eta-ten.vercel.app",
    credentials: true, // needed if using cookies or Authorization headers
  })
);

// ✅ Rate limiting and helmet before routes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000
});
app.use(limiter);
app.use(helmet());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Versioning
app.use("/api/v1", router);

// Handle 404
app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: "Page not found",
    status: "PAGE_NOT_FOUND",
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let msg = error.message || "Internal server error";
  let status = error.status || "SERVER_ERROR";
  let errorDetail = error.detail || null;

  if (error.name === "MongoServerError") {
    statusCode = 422;
    if (error.code === 11000) {
      statusCode = 400;
      let key = Object.keys(error.keyPattern).pop();
      errorDetail = {
        [key]: `${key} has been already taken or should be unique`,
      };
      msg = "Unique validation failed";
      status = "UNIQUE_VALIDATION_FAILED";
    }
  }

  res.status(statusCode).json({
    message: msg,
    status: status,
    error: errorDetail,
    options: null,
  });
});

app.get("/",(req,res) =>{
  res.send("The server is running")
})

export default app;
