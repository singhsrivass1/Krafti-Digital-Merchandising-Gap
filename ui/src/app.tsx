import { Routes, Route } from "react-router-dom"
import RequireAuth from "./auth/requireauth"


 import LandingPage from "./pages/landing_page"
import LoginPage from "./pages/loginpage"
import UploadPage from "./pages/upload_page"
//import ProcessingPage from "./pages/ProcessingPage"
// import ResultPage from "./pages/result"
//import AboutPage from "./pages/AboutPage"

export default function App() {
  return (
    <Routes>
      { <><Route path="/" element={<LandingPage />} /><Route path="/home" element={<LandingPage />} /></> }
       <Route
        path="/upload"
        element={
          <RequireAuth>
            <UploadPage />
          </RequireAuth>
        }
      />

      <Route path="/login" element={<LoginPage />} />
       
      {/* <Route path="/result" element={<ResultPage />} /> */}
    </Routes>
  )
}

     /* <Route path="/processing" element={<ProcessingPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/about" element={<AboutPage />} 
      <Route path="/upload" element={<UploadPage />} />*/