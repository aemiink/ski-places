import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";
import { X } from "lucide-react";

const SkiAreaEditForm = ({ skiArea, onClose, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([...skiArea.images]);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [season, setSeason] = useState("");

    useEffect(() => {
        if (skiArea) {
            setTitle(skiArea.title || "");
            setDescription(skiArea.description || "");
            setLocation(skiArea.location || "");
            setSeason(skiArea.season || "");
        }
    }, [skiArea]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            toast.error("Başlık ve açıklama zorunlu");
            return;
        }

        try {
            setLoading(true);

            await api.put(`/ski-areas/${skiArea._id}`, {
                title,
                description,
                images,
                location,
                season
            });


            toast.success("Kayak yeri güncellendi");
            onSuccess();
            onClose();
        } catch {
            toast.error("Güncelleme başarısız");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveImage = async (imageUrl) => {
        try {
            await api.patch(`/ski-areas/${skiArea._id}/remove-image`, {
                imageUrl
            });

            setImages(images.filter((img) => img !== imageUrl));
            toast.success("Fotoğraf silindi");
        } catch {
            toast.error("Fotoğraf silinemedi");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        Kayak Yerini Düzenle
                    </h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        className="w-full border px-4 py-2 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <input
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                    />


                    <textarea
                        className="w-full border px-4 py-2 rounded-md min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Existing Images */}
                    {images.length > 0 && (
                        <div>
                            <p className="font-medium mb-2">Mevcut Fotoğraflar</p>
                            <div className="grid grid-cols-3 gap-3">
                                {images.map((img) => (
                                    <div
                                        key={img}
                                        className="relative group border rounded overflow-hidden"
                                    >
                                        <img
                                            src={img}
                                            className="h-24 w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(img)}
                                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add New Images */}
                    <ImageUploader images={images} setImages={setImages} />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md"
                        >
                            İptal
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            {loading ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SkiAreaEditForm;
