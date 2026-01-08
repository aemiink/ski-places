import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

const ImageUploader = ({ images, setImages }) => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return res.data.url;
  };

  const handleFiles = async (files) => {
    try {
      setUploading(true);

      for (const file of files) {
        if (!file.type.startsWith("image")) continue;

        const url = await uploadFile(file);
        setImages((prev) => [...prev, url]);
      }

      toast.success("Fotoğraf yüklendi");
    } catch (error) {
      toast.error("Fotoğraf yüklenemedi");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const removeImage = (url) => {
    setImages(images.filter((img) => img !== url));
  };

  return (
    <div>
      {/* Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
        onClick={() =>
          document.getElementById("imageInput").click()
        }
      >
        <Upload className="mx-auto mb-2 text-gray-400" />
        <p className="text-gray-600">
          Fotoğrafları sürükle & bırak <br />
          veya tıklayıp seç
        </p>

        {uploading && (
          <p className="text-sm text-blue-600 mt-2">
            Yükleniyor...
          </p>
        )}

        <input
          id="imageInput"
          type="file"
          multiple
          hidden
          accept="image/*"
          onChange={handleFileSelect}
        />
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {images.map((img) => (
            <div
              key={img}
              className="relative group border rounded overflow-hidden"
            >
              <img
                src={img}
                alt="uploaded"
                className="w-full h-24 object-cover"
              />
              <button
                onClick={() => removeImage(img)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
