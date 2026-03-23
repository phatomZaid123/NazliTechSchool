import express from "express"
import { listPlatforms } from "../controllers/socialController.js"

const router = express.Router()

router.get("/", listPlatforms)

export default router
