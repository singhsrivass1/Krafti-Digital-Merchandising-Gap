import multer from "multer"
import path from "path"
import crypto from "crypto"
import fs from "fs"


const uploadDir = path.join(process.cwd(), "uploads")


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = crypto.randomBytes(16).toString("hex")
    cb(null, `${name}${ext}`)
  }
})

function fileFilter(
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files allowed"))
    return
  }
  cb(null, true)
}

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
})
