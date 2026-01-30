export type JobStatus = "processing" | "done" | "error"

export type Job = {
  id: string
  userId: string
  originalImagePath: string
  status: JobStatus
  result?: {
    enhancedImageUrl?: string
    title?: string
    description?: string
    price?: string
  }
}

const jobs = new Map<string, Job>()

export function createJob(job: Job) {
  jobs.set(job.id, job)
}

export function getJob(id: string) {
  return jobs.get(id)
}

export function updateJob(id: string, data: Partial<Job>) {
  const job = jobs.get(id)
  if (!job) return
  jobs.set(id, { ...job, ...data })
}
