"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminReportList({ reports, onStatusChange }) {
  const [expandedId, setExpandedId] = useState(null)

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
        <p className="text-gray-500 text-lg">Tidak ada laporan.</p>
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
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <Badge className={getStatusColor(report.status)}>{getStatusLabel(report.status)}</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Dari: <span className="font-medium">{report.studentName}</span> (NISN: {report.studentNisn})
                </p>
                <p className="text-sm text-gray-600">
                  Kategori: <span className="font-medium">{report.category}</span>
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
              >
                {expandedId === report.id ? "Tutup" : "Lihat Detail"}
              </Button>
            </div>

            {expandedId === report.id && (
              <div className="border-t pt-4 mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Deskripsi:</p>
                  <p className="text-gray-700">{report.description}</p>
                </div>

                {report.image && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Gambar:</p>
                    <img
                      src={report.image || "/placeholder.svg"}
                      alt="Report"
                      className="max-w-md h-auto rounded-md border border-gray-300"
                    />
                  </div>
                )}

                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>Dibuat: {new Date(report.createdAt).toLocaleDateString("id-ID")}</span>
                  <span>Diperbarui: {new Date(report.updatedAt).toLocaleDateString("id-ID")}</span>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => onStatusChange(report.id, "approved")}
                    disabled={report.status === "approved"}
                  >
                    Setujui
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => onStatusChange(report.id, "rejected")}
                    disabled={report.status === "rejected"}
                  >
                    Tolak
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStatusChange(report.id, "pending")}
                    disabled={report.status === "pending"}
                  >
                    Kembalikan ke Pending
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
