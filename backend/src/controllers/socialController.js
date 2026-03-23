import { getPlatforms } from "../models/socialModel.js"

export const listPlatforms = (_req, res) => {
  res.json(getPlatforms())
}
