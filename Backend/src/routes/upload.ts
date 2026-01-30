import express from "express"
import crypto from "crypto"
import { uploadMiddleware } from "../upload/multer"
import { requireAuth } from "../middleware/RequireAuth"
import { createJob } from "../jobs/jobstore"
import { simulateAIProcessing } from "../ai/simulateProcessing"

const router = express.Router()

router.post(
  "/upload",
  requireAuth,
  uploadMiddleware.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const user = JSON.parse(req.cookies.user)
    const jobId = crypto.randomUUID()

    createJob({
      id: jobId,
      userId: user.id,
      originalImagePath: req.file.path,
      status: "processing"
    })


    simulateAIProcessing(jobId)

    res.json({ jobId })
  }
)

export default router
