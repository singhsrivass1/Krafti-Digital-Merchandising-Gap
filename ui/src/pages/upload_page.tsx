import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const [jobId, setJobId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  
  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      credentials: "include"
    })

    const data = await res.json()
    setJobId(data.jobId)
  }


  
  useEffect(() => {
    if (!uploading) return

    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 2
      if (current >= 100) {
        current = 100
        clearInterval(interval)
      }
      setProgress(current)
    }, 250)

    return () => clearInterval(interval)
  }, [uploading])


  useEffect(() => {
    if (!jobId) return

    const poll = setInterval(async () => {
      const res = await fetch(`/api/result/${jobId}`, {
        credentials: "include"
      })
      const data = await res.json()

      if (data.status === "done") {
        clearInterval(poll)
        navigate(`/result?jobId=${jobId}`)
      }
    }, 1500)

    return () => clearInterval(poll)
  }, [jobId, navigate])

  return (
    <div className="min-h-screen flex justify-center bg-[#f7f3f0]">
      <div className="w-full max-w-sm p-6">

        
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-[#a67c52]">🤲 Krafti</h1>
        </div>

      
        {!uploading && (
          <>
            <h2 className="text-xl font-semibold text-[#3e2723] mb-2">
              Upload a photo of your craft
            </h2>
            <p className="text-sm text-[#6d4c41] mb-6">
              AI will turn your photo into a beautiful product listing.
            </p>

            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-[#d7ccc8]
                         bg-white/40 backdrop-blur
                         rounded-3xl p-10 text-center cursor-pointer
                         hover:bg-white/60 transition"
            >
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />

              <div className="w-20 h-20 mx-auto mb-4 rounded-full
                              bg-[#a67c52] text-white flex items-center
                              justify-center text-2xl">
                📷
              </div>

              <h3 className="font-medium">Tap to Upload Photo</h3>
            </div>
          </>
        )}

       
        {uploading && (
          <>
            <h2 className="text-xl font-semibold text-[#3e2723] mb-6">
              Creating your listing…
            </h2>

            <div className="flex justify-between text-sm text-[#a67c52] font-semibold mb-2">
              <span>Analyzing…</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full h-3 bg-[#e0d7d0] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#a67c52] to-[#d4a373] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
