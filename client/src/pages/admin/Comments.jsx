import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import React from "react";


const Comments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);


    const sendReply = async (commentId) => {
        if (!replyText.trim()) return;

        try {
            await api.post(`/comments/${commentId}/reply`, {
                text: replyText
            });

            toast.success("Cevap gönderildi");
            setReplyText("");
            setReplyingTo(null);
            fetchComments();
        } catch {
            toast.error("Cevap gönderilemedi");
        }
    };


    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await api.get("/comments");
            setComments(res.data.data || []);
        } catch (error) {
            toast.error("Yorumlar yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const deleteComment = async (id) => {
        if (!confirm("Bu yorumu silmek istiyor musun?")) return;

        try {
            await api.delete(`/comments/${id}`);
            toast.success("Yorum silindi");
            fetchComments();
        } catch {
            toast.error("Yorum silinemedi");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Yorumlar</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3 text-left">Yorum</th>
                            <th className="p-3">Kullanıcı</th>
                            <th className="p-3">Kayak Yeri</th>
                            <th className="p-3">Tarih</th>
                            <th className="p-3 text-right">İşlem</th>
                        </tr>
                    </thead>

                    <tbody>
                        {comments.map((comment) => (
                            <React.Fragment key={comment._id}>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="p-3">{comment.text}</td>

                                    <td className="p-3 text-center">
                                        {comment.user?.username || "-"}
                                    </td>

                                    <td className="p-3 text-center">
                                        {comment.skiArea?.title || "-"}
                                    </td>

                                    <td className="p-3 text-center text-xs text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="p-3 flex justify-end gap-2">
                                        <button
                                            onClick={() => setReplyingTo(comment._id)}
                                            className="text-blue-600 text-xs"
                                        >
                                            Cevapla
                                        </button>

                                        <button
                                            onClick={() => deleteComment(comment._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>

                                {/* 🔽 REPLY SATIRI – MAP'İN İÇİNDE */}
                                {replyingTo === comment._id && (
                                    <tr>
                                        <td colSpan="5" className="p-4 bg-gray-50">
                                            <textarea
                                                className="w-full border p-2 rounded mb-2"
                                                placeholder="Admin cevabı..."
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                            />

                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setReplyingTo(null)}
                                                    className="text-sm"
                                                >
                                                    Vazgeç
                                                </button>

                                                <button
                                                    onClick={() => sendReply(comment._id)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Gönder
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}

                        {!loading && comments.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-400">
                                    Henüz yorum yok
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Comments;
