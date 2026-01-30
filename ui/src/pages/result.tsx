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

  /* ---------- ACTION HANDLERS ---------- */

  function handleDownload() {
    if (!data?.enhancedImageUrl) return

    const link = document.createElement("a")
    link.href = data.enhancedImageUrl
    link.download =
      `${data.generatedTitle ?? "krafti-product"}.jpg`
        .replace(/\s+/g, "-")
        .toLowerCase()

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  async function handleShare() {
    if (!data?.enhancedImageUrl) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: data.generatedTitle ?? "Krafti Product",
          text: data.generatedDescription ?? "Created using Krafti",
          url: data.enhancedImageUrl
        })
      } catch {
        // user cancelled — do nothing
      }
    } else {
      await navigator.clipboard.writeText(data.enhancedImageUrl)
      alert("Image link copied to clipboard")
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-[#7A5A44]">
        Preparing your product…
      </div>
    )
  }

  return (
   <div className="min-h-screen bg-[#FAF4EC] px-4 pb-[160px]">


      {/* HEADER */}
      <div className="pt-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-[#7A5A44] text-xl"
        >
          ←
        </button>
      </div>

      <div className="mt-4 max-w-sm mx-auto space-y-6">

        {/* TITLE */}
        <h1 className="text-lg font-semibold tracking-tight text-[#4A2E1F] text-center">
          {data.generatedTitle}
        </h1>

        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <img
            src={data.enhancedImageUrl ?? ""}
            alt="Enhanced product"
            className="w-full h-72 object-cover"
          />
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm leading-relaxed text-[#7A5A44] text-center">
          {data.generatedDescription}
        </p>

        {/* PRICE */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-[#8A6A54]">
            Suggested Price
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-[#4A2E1F]">
            {data.suggestedPrice}
          </p>
        </div>

        {/* MARKETPLACE READY */}
        <div className="bg-[#F3E6DA] rounded-2xl p-4 text-sm text-[#7A5A44]">
          <p className="font-medium text-[#4A2E1F] mb-2">
            Ready for marketplaces
          </p>
          <ul className="space-y-1">
            <li>✔️ Amazon</li>
            <li>✔️ Flipkart</li>
            <li>✔️ Etsy</li>
            <li>✔️ eBay</li>
          </ul>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FAF4EC] border-t border-[#EADFD3] px-4 py-4">
        <div className="max-w-sm mx-auto space-y-3">

         
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="
                flex-1 flex items-center justify-center gap-2
                rounded-xl bg-[#F3E6DA]
                py-3 text-sm font-medium text-[#7A5A44]
                active:scale-[0.97] transition
              "
            >
              📤 Share
            </button>

            <button
              onClick={handleDownload}
              className="
                flex-1 flex items-center justify-center gap-2
                rounded-xl bg-[#C07A54]
                py-3 text-sm font-medium text-white
                active:scale-[0.97] transition
              "
            >
              ⬇️ Download
            </button>
          </div>

        
          <button
            onClick={() => navigate("/upload")}
            className="
              w-full flex items-center justify-center gap-2
              rounded-xl bg-white
              py-3 text-sm font-medium text-[#4A2E1F]
              shadow-sm active:scale-[0.97] transition
            "
          >
            ➕ Upload Another Product
          </button>

        </div>
      </div>
    </div>
  )
}
