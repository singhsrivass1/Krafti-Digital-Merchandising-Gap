import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"
  }

  return (
    <div className="min-h-screen bg-[#e7ded3] px-4 py-10 flex justify-center">
      <div className="relative w-full max-w-sm min-h-[90vh] bg-[#efe5d9] rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 flex flex-col overflow-hidden">

        
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
          <span className="text-[120px] font-bold tracking-tight text-[#4A2E1F]">
            Krafti
          </span>
        </div>

       
        <div className="relative z-10 flex flex-col h-full">

         
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="text-lg font-semibold tracking-tight text-[#4A2E1F]">
              Krafti
            </span>
          </div>

          
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-center text-[#4A2E1F]">
            Enhance Your Craft
          </h1>

          <p className="mt-2 text-sm text-center text-[#7A5A44]">
            Turn simple phone photos into professional product images
          </p>

          <button
            onClick={handleGoogleLogin}
            className="mt-6 w-full flex items-center justify-center gap-3 rounded-full bg-[#C07A54] hover:bg-[#A86443] py-3 text-sm font-medium text-white shadow-md transition active:scale-[0.98]"
          >
            Continue with Google
          </button>

         
          <div className="my-8 h-px bg-[#EADFD3]" />

       
          <div className="w-full h-40 rounded-2xl bg-[#F3E6DA] flex items-center justify-center text-[#8A6A54] text-sm">
            Product photo → Enhanced image
          </div>

          
          <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#7A5A44]">

            <div>
              <h3 className="font-semibold text-[#4A2E1F]">
                Studio-Quality Photos, Instantly
              </h3>
              <p className="mt-1">
                Upload a raw mobile photo of your product. Krafti’s AI
                automatically enhances lighting, background, and clarity —
                no studio needed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4A2E1F]">
                Faster Than Traditional Editing
              </h3>
              <p className="mt-1">
                Skip photographers, editing tools, and delays.
                What used to take days now takes minutes.
              </p>
            </div>

          </div>

         
          <div className="mt-6 w-full h-40 rounded-2xl bg-[#F3E6DA] flex items-center justify-center text-[#8A6A54] text-sm">
            Crafted locally → Sold globally
          </div>

        
          <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#7A5A44]">

            <div>
              <h3 className="font-semibold text-[#4A2E1F]">
                Ready for Amazon, Flipkart & eBay
              </h3>
              <p className="mt-1">
                Krafti helps your products meet global marketplace standards,
                making it easier to list and sell on Amazon, Flipkart,
                Etsy, and eBay.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4A2E1F]">
                Built for Local Artisans
              </h3>
              <p className="mt-1">
                We empower small businesses and rural creators to showcase
                their craftsmanship and reach customers worldwide —
                without technical barriers.
              </p>
            </div>

          </div>

          
          <p className="mt-auto pt-8 text-xs text-center text-[#8A6A54]">
            By continuing, you agree to Krafti’s Terms & Privacy Policy
          </p>

        </div>
      </div>
    </div>
  )
}
