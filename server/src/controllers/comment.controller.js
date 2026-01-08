import Comment from "../models/Comment.model.js";

export const createComment = async (req, res) => {
  try {
    let { text, skiAreaId, parentComment } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required"
      });
    }

    if (req.params.id) {
      parentComment = req.params.id;

      const parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(404).json({
          message: "Parent comment not found"
        });
      }

      skiAreaId = parent.skiArea;
    }

    const comment = await Comment.create({
      text,
      skiArea: skiAreaId,
      user: req.user._id,
      parentComment: parentComment || null
    });

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    console.error("CREATE COMMENT ERROR:", error);
    res.status(500).json({
      message: "Comment could not be created"
    });
  }
};

export const getCommentsBySkiArea = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      skiArea: req.params.skiAreaId,
      parentComment: null,
      isDeleted: false
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

export const getReplies = async (req, res, next) => {
  try {
    const replies = await Comment.find({
      parentComment: req.params.commentId,
      isDeleted: false
    })
      .populate("user", "username")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: replies.length,
      data: replies
    });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const userId = req.user._id.toString();

    const liked = comment.likes.some(
      (id) => id.toString() === userId
    );

    if (liked) {
      comment.likes = comment.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    res.status(200).json({
      success: true,
      liked: !liked,
      likesCount: comment.likes.length
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }


    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment"
      });
    }

    comment.isDeleted = true;
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted"
    });
  } catch (error) {
    next(error);
  }
};


export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isDeleted: false })
      .populate("user", "username")
      .populate("skiArea", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    console.error("GET ALL COMMENTS ERROR:", error);
    res.status(500).json({
      message: "Comments could not be fetched"
    });
  }
};

export const getCommentCount = async (req, res) => {
  try {
    const count = await Comment.countDocuments({
      isDeleted: false
    });

    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error("COMMENT COUNT ERROR:", error);
    res.status(500).json({
      message: "Comment count failed"
    });
  }
};

export const getMyComments = async (req, res) => {
  const comments = await Comment.find({
    user: req.user._id,
    isDeleted: false
  })
    .populate("skiArea", "title slug")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: comments
  });
};

