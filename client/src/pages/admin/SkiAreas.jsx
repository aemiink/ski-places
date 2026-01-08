import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Trash2, Plus, Eye, EyeOff } from "lucide-react";
import SkiAreaForm from "../../components/admin/SkiAreaForm";
import SkiAreaEditForm from "../../components/admin/SkiAreaEditForm";
import { Pencil } from "lucide-react";


const SkiAreas = () => {
  const [skiAreas, setSkiAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);



const fetchSkiAreas = async () => {
  try {
    setLoading(true);
    const res = await api.get("/ski-areas");

    console.log("SKI AREAS RESPONSE:", res.data); // 👈 BUNU EKLE

    setSkiAreas(res.data.data || []);
  } catch (error) {
    console.error("FETCH ERROR:", error.response?.data || error);
    toast.error("Kayak yerleri yüklenemedi");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchSkiAreas();
  }, []);

  const togglePublish = async (id) => {
    try {
      await api.patch(`/ski-areas/${id}/publish`);
      toast.success("Yayın durumu güncellendi");
      fetchSkiAreas();
    } catch {
      toast.error("İşlem başarısız");
    }
  };

  const deleteSkiArea = async (id) => {
    if (!confirm("Bu kayak yerini silmek istiyor musun?")) return;

    try {
      await api.delete(`/ski-areas/${id}`);
      toast.success("Kayak yeri silindi");
      fetchSkiAreas();
    } catch {
      toast.error("Silme başarısız");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ski Areas</h1>
        <button
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={() => setShowForm(true)}
        >
        <Plus size={18} />
        Yeni Ekle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Başlık</th>
              <th className="p-3">Yazar</th>
              <th className="p-3">Durum</th>
              <th className="p-3 text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {skiAreas.map((area) => (
              <tr
                key={area._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{area.title}</td>
                <td className="p-3 text-center">
                  {area.author?.username || "-"}
                </td>
                <td className="p-3 text-center">
                  {area.isPublished ? (
                    <span className="text-green-600 font-medium">
                      Yayında
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Taslak
                    </span>
                  )}
                </td>
                <td className="p-3 flex justify-end gap-3">
                  <button
                    onClick={() => togglePublish(area._id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {area.isPublished ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                  <button
                    onClick={() => deleteSkiArea(area._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedArea(area)}
                    className="text-gray-600 hover:text-gray-800"
                    >
                    <Pencil size={18} />
                  </button>

                </td>
              </tr>
            ))}

            {!loading && skiAreas.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-400"
                >
                  Henüz kayak yeri yok
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showForm && (
        <SkiAreaForm
            onClose={() => setShowForm(false)}
            onSuccess={fetchSkiAreas}
        />
        )}
        {selectedArea && (
        <SkiAreaEditForm
            skiArea={selectedArea}
            onClose={() => setSelectedArea(null)}
            onSuccess={fetchSkiAreas}
        />
        )}


    </div>
  );
};

export default SkiAreas;
