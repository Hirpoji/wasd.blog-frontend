import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const { data } = await axios.get("posts/tags");
    return data;
});

interface TagsState {
  items: string[];
  status: "loading" | "loaded" | "error";
}

const initialState: TagsState = {
  items: [],
  status: "loading",
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const tagsReducer = tagsSlice.reducer;
export default tagsSlice;
