import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/authcontext"

export default function RequireAuth({
  children
}: {
  children: ReactNode
}) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-[#7A5A44]">
        Checking session…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
