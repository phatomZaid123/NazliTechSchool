import express from "express"
import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { listVideos, createVideo, uploadVideo } from "../controllers/videoController.js"

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.resolve(__dirname, "../../uploads")

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now()
    const safeName = file.originalname.replace(/\s+/g, "-")
    cb(null, `${timestamp}-${safeName}`)
  },
})

const upload = multer({ storage })

router.get("/", listVideos)
router.post("/", createVideo)
router.post("/upload", upload.single("video"), uploadVideo)

export default router
