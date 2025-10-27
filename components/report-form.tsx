"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CATEGORIES = [
  { id: "akademik", label: "Akademik", icon: "📚", description: "Nilai, tugas, ujian" },
  { id: "kesehatan", label: "Kesehatan", icon: "🏥", description: "Sakit, kesehatan fisik" },
  { id: "perilaku", label: "Perilaku", icon: "👤", description: "Tingkah laku, disiplin" },
  { id: "kehadiran", label: "Kehadiran", icon: "📋", description: "Absen, keterlambatan" },
  { id: "ekstrakurikuler", label: "Ekstrakurikuler", icon: "🎯", description: "Kegiatan di luar kelas" },
  { id: "sosial", label: "Sosial", icon: "👥", description: "Hubungan dengan teman" },
  { id: "prestasi", label: "Prestasi", icon: "🏆", description: "Penghargaan, pencapaian" },
  { id: "lainnya", label: "Lainnya", icon: "📝", description: "Laporan lainnya" },
]

export default function ReportForm({ user, onSubmit }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("akademik")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title || !description) {
      setError("Judul dan deskripsi harus diisi")
      return
    }

    setLoading(true)

    const newReport = {
      id: `report-${Date.now()}`,
      studentId: user.id,
      studentName: user.name,
      studentNisn: user.nisn,
      title,
      description,
      category,
      image: imagePreview,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSubmit(newReport)
    setTitle("")
    setDescription("")
    setCategory("akademik")
    setImage(null)
    setImagePreview("")
    setLoading(false)
  }

  const selectedCategory = CATEGORIES.find((c) => c.id === category)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Judul Laporan */}
      <div>
        <label className="text-sm font-medium text-gray-700">Judul Laporan</label>
        <Input
          placeholder="Masukkan judul laporan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-3">Pilih Kategori Laporan</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                category === cat.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-xs font-semibold text-gray-900">{cat.label}</div>
              <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
            </button>
          ))}
        </div>
        {selectedCategory && (
          <p className="text-sm text-blue-600 mt-2">
            ✓ Kategori dipilih: <strong>{selectedCategory.label}</strong>
          </p>
        )}
      </div>

      {/* Deskripsi */}
      <div>
        <label className="text-sm font-medium text-gray-700">Deskripsi Laporan</label>
        <textarea
          placeholder="Jelaskan detail laporan Anda dengan lengkap..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Upload Gambar */}
      <div>
        <label className="text-sm font-medium text-gray-700">Upload Gambar (Opsional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview Gambar:</p>
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Preview"
              className="max-w-xs h-auto rounded-md border border-gray-300"
            />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
        {loading ? "Mengirim..." : "Kirim Laporan"}
      </Button>
    </form>
  )
}
