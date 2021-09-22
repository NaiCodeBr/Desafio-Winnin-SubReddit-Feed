import axios from "axios";

const api = axios.create({
  baseURL: "https://www.reddit.com/r/subreddit",
});

export const getHot = () => {
  return api.get("/hot.json");
};

export const getNews = () => {
  return api.get("/new.json");
};

export const getRising = () => {
  return api.get("/rising.json");
};
