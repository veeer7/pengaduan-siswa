"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [nisn, setNisn] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (email === "admin@school.com" && password === "admin1234") {
      const adminUser = {
        id: "admin-1",
        email,
        name: "Admin",
        role: "admin",
      }
      localStorage.setItem("currentUser", JSON.stringify(adminUser))
      onLoginSuccess(adminUser)
    } else if (email && password) {
      const studentUser = {
        id: `student-${Date.now()}`,
        email,
        name: email.split("@")[0],
        nisn: email.split("@")[0],
        role: "student",
      }
      localStorage.setItem("currentUser", JSON.stringify(studentUser))
      onLoginSuccess(studentUser)
    } else {
      setError("Email dan password harus diisi")
    }
    setLoading(false)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email || !password || !name || !nisn) {
      setError("Semua field harus diisi")
      setLoading(false)
      return
    }

    const studentUser = {
      id: `student-${Date.now()}`,
      email,
      name,
      nisn,
      role: "student",
    }
    localStorage.setItem("currentUser", JSON.stringify(studentUser))
    onLoginSuccess(studentUser)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      <Card className="w-full max-w-md shadow-xl relative z-10 border border-border/60 hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-t-lg py-8">
          <CardTitle className="text-4xl font-bold">Laporan Siswa</CardTitle>
          <p className="text-sm text-primary-foreground/80 mt-2">Sistem manajemen laporan modern</p>
        </CardHeader>
        <CardContent className="pt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Password</label>
                  <Input
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {error && <p className="text-destructive text-sm font-medium">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground">Nama Lengkap</label>
                  <Input
                    placeholder="Masukkan nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">NISN</label>
                  <Input
                    placeholder="Masukkan NISN Anda"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Password</label>
                  <Input
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {error && <p className="text-destructive text-sm font-medium">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Daftar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
