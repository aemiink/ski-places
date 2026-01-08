import mongoose from "mongoose";
import slugify from "slugify";

const SkiAreaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    description: {
      type: String,
      required: true,
      minlength: 10
    },
    slug: {
      type: String,
      unique: true
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    location: {
      type: String,
      required: true
    },
    season: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


SkiAreaSchema.pre("save", function () {
  if (!this.isModified("title")) return;

  this.slug = slugify(this.title, {
    lower: true,
    strict: true
  });
});


const SkiArea = mongoose.model("SkiArea", SkiAreaSchema);

export default SkiArea;
