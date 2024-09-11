import api from "./api";


export const posts = () => {
  return api.get("/posts");
};

export const comments = (postId) => {
    return api.get(`comments?postId=${postId}`);
};