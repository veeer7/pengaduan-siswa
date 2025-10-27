"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReportForm from "./report-form"
import ReportHistory from "./report-history"

export default function StudentDashboard({ user, onLogout }) {
  const [reports, setReports] = useState([])
  const [activeTab, setActiveTab] = useState("history")

  useEffect(() => {
    const allReports = JSON.parse(localStorage.getItem("reports") || "[]")
    const userReports = allReports.filter((r) => r.studentId === user.id)
    setReports(userReports)
  }, [user.id])

  const handleReportSubmitted = (newReport) => {
    const allReports = JSON.parse(localStorage.getItem("reports") || "[]")
    allReports.push(newReport)
    localStorage.setItem("reports", JSON.stringify(allReports))
    setReports([...reports, newReport])
    setActiveTab("history")
  }

  const stats = [
    { label: "Total Laporan", value: reports.length, color: "from-primary to-accent" },
    {
      label: "Disetujui",
      value: reports.filter((r) => r.status === "approved").length,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Menunggu",
      value: reports.filter((r) => r.status === "pending").length,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Ditolak",
      value: reports.filter((r) => r.status === "rejected").length,
      color: "from-red-500 to-rose-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard Siswa</h1>
            <p className="text-muted-foreground text-sm mt-1">Selamat datang, {user.name}</p>
          </div>
          <Button
            onClick={onLogout}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="bg-card/40 backdrop-blur-xl border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 overflow-hidden"
            >
              <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card/40 backdrop-blur-xl border border-border/50 shadow-lg shadow-primary/20">
          <CardHeader>
            <CardTitle className="gradient-text">Kelola Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted">
                <TabsTrigger value="history">Riwayat Laporan</TabsTrigger>
                <TabsTrigger value="submit">Buat Laporan Baru</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="mt-6">
                <ReportHistory reports={reports} />
              </TabsContent>

              <TabsContent value="submit" className="mt-6">
                <ReportForm user={user} onSubmit={handleReportSubmitted} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
