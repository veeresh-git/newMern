import { Post, User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  mode: "light",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picturePath: "",
    friends: [],
    location: "",
    occupation: "",
  },
  token: "",
  posts: [],
};

const initialState: { mode: String; user: User; token: String; posts: Post[] } =
  emptyState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = { ...emptyState.user };
      state.token = "";
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user not found");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setPost, setPosts, setFriends } =
  authSlice.actions;

export default authSlice.reducer;
