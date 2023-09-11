import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FullPost from "./pages/FullPost";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/Slices/auth";
import User from "./pages/User";
import PostsListByTag from "./pages/PostsListByTag";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe() as any);
  }, []);

  return (
    <div className="App mx-auto max-w-5xl mt-12 mb-12 pl-5 pr-5 relative">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow mb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`/post/:id`} element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/user" element={<User />} />
            <Route path={`/tag/:tag`} element={<PostsListByTag />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
