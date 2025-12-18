import { useState } from "react";
import api from "../api/AxiosInstance";

const CommentManagement = () => {
  const [skiAreaId, setSkiAreaId] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await api.get(
      `/api/Comment/getbyskiarea/${skiAreaId}`
    );
    setComments(res.data);
  };

  const deleteComment = async (id) => {
    await api.delete(`/api/Comment/Delete?id=${id}`);
    fetchComments();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Comments</h1>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Ski Area ID"
          className="border p-2 rounded"
          onChange={(e) => setSkiAreaId(e.target.value)}
        />
        <button
          onClick={fetchComments}
          className="bg-slate-900 text-white px-4 rounded"
        >
          Fetch
        </button>
      </div>

      <div className="space-y-3">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <p>{c.content}</p>
            <button
              onClick={() => deleteComment(c.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentManagement;
