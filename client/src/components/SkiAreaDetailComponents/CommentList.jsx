const CommentList = ({ comments }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Comments
      </h2>

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg p-4 bg-slate-50"
          >
            <p className="text-sm font-medium text-slate-800">
              {c.username}
            </p>
            <p className="text-slate-700 mt-1">
              {c.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
