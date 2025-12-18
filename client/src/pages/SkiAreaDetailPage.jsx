import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import SkiAreaInfo from "../components/SkiAreaDetailComponents/SkiAreaInfo";
import CommentList from "../components/SkiAreaDetailComponents/CommentList";
import AddCommentForm from "../components/SkiAreaDetailComponents/AddComentForm";

import { isLoggedIn } from "../utils/auth";
import { getCommentsBySkiArea } from "../api/comment.service";

const SkiAreaDetailPage = () => {
  const { id } = useParams();

  const [skiArea, setSkiArea] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    setSkiArea({
      id,
      name: "Uludağ",
      city: "Bursa",
      description:
        "Uludağ is one of the most popular ski destinations in Turkey with long slopes and modern facilities.",
    });
  }, [id]);

  useEffect(() => {
    // 🔹 GERÇEK API ÇAĞRISI
    setLoadingComments(true);

    getCommentsBySkiArea(id)
      .then((res) => {
        setComments(res.data);
      })
      .catch(() => {
        setComments([]);
      })
      .finally(() => {
        setLoadingComments(false);
      });
  }, [id]);

  if (!skiArea) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <SkiAreaInfo skiArea={skiArea} />

      {loadingComments ? (
        <p className="text-sm text-slate-500">Loading comments...</p>
      ) : (
        <CommentList comments={comments} />
      )}

      {isLoggedIn() ? (
        <AddCommentForm
          skiAreaId={id}
          setComments={setComments}
        />
      ) : (
        <p className="text-sm text-slate-500">
          You must be logged in to add a comment.
        </p>
      )}
    </div>
  );
};

export default SkiAreaDetailPage;
