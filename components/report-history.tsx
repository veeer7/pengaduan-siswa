"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ReportHistory({ reports }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Disetujui"
      case "rejected":
        return "Ditolak"
      default:
        return "Menunggu"
    }
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Belum ada laporan. Buat laporan baru untuk memulai.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Kategori: <span className="font-medium">{report.category}</span>
                </p>
              </div>
              <Badge className={getStatusColor(report.status)}>{getStatusLabel(report.status)}</Badge>
            </div>

            <p className="text-gray-700 mb-4">{report.description}</p>

            {report.image && (
              <div className="mb-4">
                <img
                  src={report.image || "/placeholder.svg"}
                  alt="Report"
                  className="max-w-xs h-auto rounded-md border border-gray-300"
                />
              </div>
            )}

            <div className="flex justify-between text-xs text-gray-500">
              <span>Dibuat: {new Date(report.createdAt).toLocaleDateString("id-ID")}</span>
              <span>Diperbarui: {new Date(report.updatedAt).toLocaleDateString("id-ID")}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
