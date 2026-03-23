import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import videoRoutes from "./routes/videoRoutes.js"
import socialRoutes from "./routes/socialRoutes.js"

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }))
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")))

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/videos", videoRoutes)
app.use("/api/social", socialRoutes)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("MongoDB connected")
    } else {
      console.warn("MONGO_URI not set, using in-memory data only")
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server", error)
    process.exit(1)
  }
}

start()
