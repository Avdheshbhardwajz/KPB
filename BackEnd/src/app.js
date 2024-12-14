import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'

const app = express();

dotenv.config({
    path: "./env"
})
const corsarry = [
    process.env.CORS_ORIGIN1,
    process.env.CORS_ORIGIN2,
    process.env.CORS_ORIGIN3,
]
/// use is used for middle wares or configration parts
app.use(cors({
    origin: corsarry,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true, // Allow credentials
    preflightContinue: false,
    optionsSuccessStatus: 204
    // read about cors or cridentials or whitelisting 
}))

app.use(express.json({
    limit: "16kb",
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("Public"))
app.use(cookieParser())

// routes import 
import userRouter from "./routes/user.routes.js"
import AdminRouter from "./routes/Admin.user.routes.js"

// routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/Admin', AdminRouter);

export { app }