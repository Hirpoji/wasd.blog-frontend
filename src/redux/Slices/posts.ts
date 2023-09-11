import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { PostState } from "../../types";
import { ObjectId } from "mongodb";

interface PostsState {
  items: any[];
  status: string;
}

const initialState: PostsState = {
  items: [],
  status: "loading",
};

export const fetchPostsByCreatedAt = createAsyncThunk(
  "posts/fetchPostsByCreatedAt",
  async () => {
    const { data } = await axios.get("/posts?sortOrder=createdAt");
    return data;
  }
);

export const fetchPostsByViewsCount = createAsyncThunk(
  "posts/fetchPostsByViewsCount",
  async () => {
    const { data } = await axios.get("/posts?sortOrder=viewsCount");
    return data;
  }
);

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id: ObjectId) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByCreatedAt.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPostsByCreatedAt.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchPostsByCreatedAt.rejected, (state) => {
        state.items = [];
        state.status = "error";
      })

      .addCase(fetchPostsByViewsCount.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPostsByViewsCount.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchPostsByViewsCount.rejected, (state) => {
        state.items = [];
        state.status = "error";
      })

      .addCase(fetchRemovePost.pending, (state, action) => {
        state.items = state.items.filter(
          (post: PostState) =>
            post._id.toString() !== action.meta.arg.toString()
        );
      });
  },
});

export const postsReducer = postsSlice.reducer;
export const { actions: postsActions } = postsSlice;
