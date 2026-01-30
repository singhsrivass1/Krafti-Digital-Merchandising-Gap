import express from "express"
import { requireAuth } from "../middleware/RequireAuth"
import { getJob } from "../jobs/jobstore"

const router = express.Router()

router.get("/result/:jobId", requireAuth, (req, res) => {
  
  const user = JSON.parse(req.cookies.user)
  const jobId = req.params.jobId as string

  const job = getJob(jobId)

  if (!job) {
    return res.status(404).json({ error: "Job not found" })
  }

  if (job.userId !== user.id) {
    return res.status(403).json({ error: "Forbidden" })
  }

  res.json({
    status: job.status,
    enhancedImageUrl: job.result?.enhancedImageUrl ?? null,
    generatedTitle: job.result?.title ?? null,
    generatedDescription: job.result?.description ?? null,
    suggestedPrice: job.result?.price ?? null
  })
})

export default router
