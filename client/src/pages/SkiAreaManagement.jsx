import { useEffect, useState } from "react";
import api from "../api/AxiosInstance";

const SkiAreaManagement = () => {
  const [skiAreas, setSkiAreas] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    rating: 0,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchSkiAreas = async () => {
    const res = await api.get("/api/SkiArea/GetAll");
    setSkiAreas(res.data);
  };

  useEffect(() => {
    fetchSkiAreas();
  }, []);

  // 🔹 CREATE
  const handleCreate = async (e) => {
    e.preventDefault();

    await api.post("/api/SkiArea/Create", form);
    setForm({ name: "", description: "", rating: 0 });

    fetchSkiAreas();
    alert("Ski Area created");
  };

  // 🔹 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await api.delete(`/api/SkiArea/Delete?id=${id}`);
    fetchSkiAreas();
  };

  // 🔹 FILE SELECT
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 UPLOAD PHOTO (MinIO)
  const handleUpload = async (skiAreaName) => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("SkiAreaName", skiAreaName);
    formData.append("File", selectedFile);

    await api.put("/api/SkiArea/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setSelectedFile(null);
    setPreview(null);
    fetchSkiAreas();
    alert("Photo uploaded");
  };

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold">Ski Area Management</h1>

      {/* CREATE FORM */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded-lg shadow space-y-4 max-w-lg"
      >
        <h2 className="font-medium">Create Ski Area</h2>

        <input
          placeholder="Name"
          value={form.name}
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Rating"
          value={form.rating}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, rating: Number(e.target.value) })
          }
        />

        <button className="bg-slate-900 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* LIST */}
      <div className="space-y-4">
        {skiAreas.map((area) => (
          <div
            key={area.id}
            className="bg-white p-4 rounded shadow flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{area.name}</h3>
                <p className="text-sm text-slate-500">
                  Rating: {area.rating}
                </p>
              </div>

              <button
                onClick={() => handleDelete(area.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>

            {/* EXISTING PHOTO */}
            {area.photoUrl && (
              <img
                src={area.photoUrl}
                alt={area.name}
                className="h-40 object-cover rounded"
              />
            )}

            {/* DRAG & DROP / SELECT */}
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-slate-500 cursor-pointer hover:border-slate-400"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileSelect(e.dataTransfer.files[0]);
              }}
              onClick={() =>
                document.getElementById(`file-${area.id}`).click()
              }
            >
              Drag & drop photo here or click to select
            </div>

            <input
              id={`file-${area.id}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            {/* PREVIEW */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-32 object-cover rounded"
              />
            )}

            <button
              onClick={() => handleUpload(area.name)}
              className="self-start bg-slate-800 text-white px-3 py-1 rounded text-sm"
            >
              Upload Photo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkiAreaManagement;
