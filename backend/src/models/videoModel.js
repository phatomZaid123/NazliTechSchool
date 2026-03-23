import { videos as seedVideos } from "../data/videos.js"

let videos = [...seedVideos]

export const getVideos = () => videos

export const addVideo = ({ title, author, type, thumbnail }) => {
  const newVideo = {
    id: Date.now(),
    title,
    author,
    views: "0",
    likes: "0",
    comments: "0",
    thumbnail: thumbnail || "from-primary/40 to-accent/40",
    type: type || "Student Project",
  }

  videos = [newVideo, ...videos]
  return newVideo
}

export const addUploadedVideo = ({ file, title, author, type, thumbnail }) => {
  const newVideo = {
    id: Date.now(),
    title: title || file.originalname,
    author: author || "Nazli Tech",
    views: "0",
    likes: "0",
    comments: "0",
    thumbnail: thumbnail || "from-primary/40 to-accent/40",
    type: type || "Event",
    fileUrl: `/uploads/${file.filename}`,
  }

  videos = [newVideo, ...videos]
  return newVideo
}
