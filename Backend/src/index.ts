import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//import uploadRoutes from "./routes/upload"
//import resultRoutes from "./routes/result"
import authRoutes from "./routes/auth"



const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
//app.use("/api", uploadRoutes)
//app.use("/api", resultRoutes)


app.get("/api/user", (req, res) => {
  const user = req.cookies.user
  if (!user) return res.status(401).json(null)
  res.json(JSON.parse(user))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

