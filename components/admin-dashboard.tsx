"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AdminReportList from "./admin-report-list"

export default function AdminDashboard({ user, onLogout }) {
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 })

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = () => {
    const allReports = JSON.parse(localStorage.getItem("reports") || "[]")
    setReports(allReports)

    setStats({
      total: allReports.length,
      pending: allReports.filter((r) => r.status === "pending").length,
      approved: allReports.filter((r) => r.status === "approved").length,
      rejected: allReports.filter((r) => r.status === "rejected").length,
    })
  }

  const handleStatusChange = (reportId, newStatus) => {
    const allReports = JSON.parse(localStorage.getItem("reports") || "[]")
    const updatedReports = allReports.map((r) =>
      r.id === reportId ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r,
    )
    localStorage.setItem("reports", JSON.stringify(updatedReports))
    loadReports()
  }

  const statCards = [
    { label: "Total Laporan", value: stats.total, color: "from-primary to-accent" },
    { label: "Menunggu", value: stats.pending, color: "from-yellow-500 to-orange-500" },
    { label: "Disetujui", value: stats.approved, color: "from-green-500 to-emerald-500" },
    { label: "Ditolak", value: stats.rejected, color: "from-red-500 to-rose-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">Kelola semua laporan siswa</p>
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
          {statCards.map((stat, idx) => (
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
            <CardTitle className="gradient-text">Daftar Laporan</CardTitle>
            <CardDescription>Kelola status laporan dari semua siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminReportList reports={reports} onStatusChange={handleStatusChange} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
