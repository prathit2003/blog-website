import { Blog } from "../types/blogtypes";

const Blogs = (blog: Blog) => {
  return <div>{blog.title}</div>;
};

export default Blogs;
