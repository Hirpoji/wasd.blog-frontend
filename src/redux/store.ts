import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./Slices/posts";
import { tagsReducer } from "./Slices/tags";
import { authReducer} from "./Slices/auth";
import { homeReducer } from "./Slices/home";

const rootReducer = combineReducers({
  posts: postsReducer,
  tags: tagsReducer,
  auth: authReducer,
  home: homeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
