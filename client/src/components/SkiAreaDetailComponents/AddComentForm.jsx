import { useState } from "react";
import { getUsername } from "../../utils/auth";

const AddCommentForm = ({ setComments }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      username: getUsername(),
      content: text,
    };

    // MOCK → backend gelince POST atacağız
    setComments((prev) => [newComment, ...prev]);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="w-full border rounded-lg p-3 min-h-[100px]"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
      >
        Add Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
