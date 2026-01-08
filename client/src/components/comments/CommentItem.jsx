import { useEffect, useState } from "react";
import api from "../../api/axios";

const CommentItem = ({ comment }) => {
  const [replies, setReplies] = useState([]);

  const fetchReplies = async () => {
    try {
      const res = await api.get(
        `/comments/replies/${comment._id}`
      );
      setReplies(res.data.data || []);
    } catch {
      console.error("Replies fetch failed");
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [comment._id]);

  return (
    <div>
      {/* Main Comment */}
      <div className="border rounded p-4">
        <p className="font-medium">
          {comment.user?.username}
        </p>
        <p className="mt-1">{comment.text}</p>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="ml-6 mt-3 space-y-3">
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="border-l-4 border-blue-500 bg-gray-50 p-3"
            >
              <p className="text-sm font-medium text-blue-600">
                {reply.user?.username} (Admin)
              </p>
              <p className="text-sm">
                {reply.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
