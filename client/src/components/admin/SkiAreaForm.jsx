import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";

const SkiAreaForm = ({ onClose, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]); // 🔥 artık array
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [season, setSeason] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || images.length === 0) {
            toast.error("Tüm alanlar ve en az 1 fotoğraf zorunlu");
            return;
        }

        try {
            setLoading(true);

            await api.post("/ski-areas", {
                title,
                description,
                images,
                location,
                season
            });


            toast.success("Kayak yeri eklendi 🎉");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Ekleme başarısız"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">
                    Yeni Kayak Yeri
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Başlık"
                        className="w-full border px-4 py-2 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Konum (Örn: Sivas / Yıldız Dağı)"
                        className="w-full border px-4 py-2 rounded-md"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Sezon (Örn: Aralık - Mart)"
                        className="w-full border px-4 py-2 rounded-md"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                    />


                    {/* Description */}
                    <textarea
                        placeholder="Açıklama"
                        className="w-full border px-4 py-2 rounded-md min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Image Upload */}
                    <ImageUploader images={images} setImages={setImages} />

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border"
                        >
                            İptal
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-70"
                        >
                            {loading ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SkiAreaForm;
