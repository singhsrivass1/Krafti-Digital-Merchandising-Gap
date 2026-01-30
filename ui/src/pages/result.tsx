import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

type ResultData = {
  status: string
  enhancedImageUrl: string | null
  generatedTitle: string | null
  generatedDescription: string | null
  suggestedPrice: string | null
}

export default function ResultPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const jobId = params.get("jobId")

  const [data, setData] = useState<ResultData | null>(null)

  useEffect(() => {
    if (!jobId) return

    fetch(`/api/result/${jobId}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(setData)
  }, [jobId])

  if (!data) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#FAF4EC] px-4 pb-24">

      {/* HEADER */}
      <div className="pt-6 flex items-center">
        <button onClick={() => navigate(-1)} className="text-[#7A5A44] text-xl">
          ←
        </button>
      </div>

      <div className="mt-4 max-w-sm mx-auto">

        <h1 className="text-lg font-semibold tracking-tight text-[#4A2E1F] text-center">
          {data.generatedTitle}
        </h1>

        <div className="mt-4 rounded-3xl overflow-hidden shadow-sm">
          <img
            src={data.enhancedImageUrl ?? ""}
            alt="Enhanced product"
            className="w-full h-72 object-cover"
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#7A5A44] text-center">
          {data.generatedDescription}
        </p>

        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-[#8A6A54]">Suggested Price</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-[#4A2E1F]">
            {data.suggestedPrice}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#FAF4EC] border-t border-[#EADFD3] px-4 py-4">
        <div className="max-w-sm mx-auto space-y-3">

          <div className="flex gap-3">
            <button className="flex-1 rounded-xl bg-[#F3E6DA] py-3 text-sm text-[#7A5A44]">
              Share
            </button>
            <button className="flex-1 rounded-xl bg-[#C07A54] py-3 text-sm font-medium text-white">
              Download
            </button>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="w-full rounded-xl bg-white py-3 text-sm font-medium text-[#4A2E1F] shadow-sm"
          >
            Upload Another Product
          </button>

        </div>
      </div>
    </div>
  )
}
