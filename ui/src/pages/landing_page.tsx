import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/authcontext"

export default function LandingPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  function handleUploadClick() {
    if (loading) return

    if (!user) {
      navigate("/login")
    } else {
      navigate("/upload")
    }
  }

  return (
    <main className="min-h-screen flex justify-center px-4 py-6">
      <div className="w-full max-w-sm space-y-6">

        
        <div className="card space-y-5">

         
          <div className="brand">
            <span className="brand-icon"></span>
            <span>Krafti</span>
          </div>

        
          <h1 className="heading">
            Turn your craft into a <br /> global business.
          </h1>

         
          <p className="subtitle px-3">
            Empowering rural artisans to showcase their work with
            professional-grade tools. Start today.
          </p>

          
          <button
            onClick={handleUploadClick}
            className="cta-btn"
          >
            <span className="text-lg">📷</span>
            Upload Photo
          </button>

          
          <div className="preview">
            <img
              src="/images/preview.png"
              alt="Product preview"
              className="w-full"
            />
          </div>
        </div>

        
        <nav className="bottom-nav">
          <div className="nav-item active">
            <span>🏠</span>
            <span>Home</span>
          </div>
          <div className="nav-item">
            <span>🛠</span>
            <span>Tools</span>
          </div>
          <div className="nav-item">
            <span>👤</span>
            <span>Profile</span>
          </div>
        </nav>

      </div>
    </main>
  )
}
