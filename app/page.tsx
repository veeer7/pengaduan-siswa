"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoginPage from "@/components/login-page"
import StudentDashboard from "@/components/student-dashboard"
import AdminDashboard from "@/components/admin-dashboard"

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-border rounded-full border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLoginSuccess={setUser} />
  }

  return user.role === "admin" ? (
    <AdminDashboard
      user={user}
      onLogout={() => {
        localStorage.removeItem("currentUser")
        setUser(null)
      }}
    />
  ) : (
    <StudentDashboard
      user={user}
      onLogout={() => {
        localStorage.removeItem("currentUser")
        setUser(null)
      }}
    />
  )
}
