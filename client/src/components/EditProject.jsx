import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPost } from "@/actions/postActions";
import { categories } from "@/categories";

const EditProject = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const { isLoading } = useSelector((state) => state?.posts);

  //data
  const [postData, setPostData] = useState({
    postId: post?._id,
    title: post?.title,
    desc: post?.desc,
    category: post?.category,
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  //final call
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost(postData, navigate));
  };

  return (
    <div className="pt-9 flex justify-center overflow-auto text-slate-900">
      <div className="w-3/4 flex flex-col gap-24">
        <h1 className="text-5xl font-extrabold">Edit post</h1>
        <form
          onSubmit={handleSubmit}
          className="text-lg flex flex-col gap-11 pb-72"
        >
          <label className="flex flex-col gap-5">
            Title
            <input
              name="title"
              onChange={handleChange}
              value={postData.title}
              className="bg-gray-100 outline-none p-4 w-full rounded-xl"
              placeholder="Artfolio"
              required
            />
          </label>
          <label className="flex flex-col gap-5">
            Description
            <textarea
              name="desc"
              onChange={handleChange}
              value={postData.desc}
              className="bg-gray-100 outline-none p-4 w-full rounded-xl"
              placeholder="Modern Full-stack website for artist to...   "
              required
            />
          </label>
          <label className="flex flex-col gap-5">
            Category
            <Select
              onValueChange={(value) =>
                setPostData({ ...postData, category: value })
              }
            >
              <SelectTrigger className="sm:w-fit w-full text-base p-4 h-auto bg-gray-100 rounded-xl border-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <div>
            {isLoading ? (
              <Button className="sm:w-auto w-full h-auto py-3 flex items-center gap-3 bg-violet-500 hover:bg-violet-500 rounded-xl">
                <LoaderCircle className="animate-spin" size={16} />
                Editing..
              </Button>
            ) : (
              <Button className="sm:w-auto w-full h-auto py-3 flex items-center gap-3 bg-violet-500 hover:bg-violet-500 rounded-xl">
                <Plus size={16} />
                Edit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
