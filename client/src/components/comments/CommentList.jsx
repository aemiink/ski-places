import { useEffect, useState } from "react";
import api from "../../api/axios";
import CommentItem from "./CommentItem";

const CommentList = ({ skiAreaId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/comments/ski-area/${skiAreaId}`
      );
      setComments(res.data.data || []);
    } catch {
      console.error("Comments fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [skiAreaId]);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">
        Yorumlar
      </h3>

      {loading && <p>Yükleniyor...</p>}

      {comments.length === 0 && !loading && (
        <p className="text-gray-400">
          Henüz yorum yok
        </p>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
