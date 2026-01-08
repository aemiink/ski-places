import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const CommentForm = ({ skiAreaId, onSuccess }) => {
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <p className="text-gray-500 mt-4">
        Yorum yazmak için giriş yapmalısınız.
      </p>
    );
  }

  const submitComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await api.post("/comments", {
        text,
        skiAreaId
      });

      toast.success("Yorum eklendi");
      setText("");
      onSuccess();
    } catch {
      toast.error("Yorum eklenemedi");
    }
  };

  return (
    <form
      onSubmit={submitComment}
      className="mt-6 space-y-3"
    >
      <textarea
        className="w-full border rounded p-3"
        placeholder="Yorumunuzu yazın..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Gönder
      </button>
    </form>
  );
};

export default CommentForm;
