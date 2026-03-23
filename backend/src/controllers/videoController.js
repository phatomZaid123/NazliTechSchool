import { getVideos, addVideo, addUploadedVideo } from "../models/videoModel.js"

export const listVideos = (_req, res) => {
  res.json(getVideos())
}

export const createVideo = (req, res) => {
  const { title, author, type, thumbnail } = req.body
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" })
  }

  const newVideo = addVideo({ title, author, type, thumbnail })
  return res.status(201).json(newVideo)
}

export const uploadVideo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "video file is required" })
  }

  const { title, author, type, thumbnail } = req.body
  const newVideo = addUploadedVideo({ file: req.file, title, author, type, thumbnail })
  return res.status(201).json(newVideo)
}
