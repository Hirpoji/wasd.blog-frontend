import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwitchButtons from "../components/UI/SwitchButton";
import PostsList from "../components/Post/PostsList";
import { fetchTags } from "../redux/Slices/tags";
import TagsList from "../components/Tags/TagsList";
import {
  fetchPostsByViewsCount,
  fetchPostsByCreatedAt,
} from "../redux/Slices/posts";
import { setValue } from "../redux/Slices/home";
import { RootState } from "../redux/store"; 

const Home: FC = () => {
  const buttonsList = ["Последние", "Популярные", "Тэги"];

  const value = useSelector((state: RootState) => state.home.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags() as any);
  }, []);

  const handleButtonClick = (name: string) => {
    dispatch(setValue(name));
    if (name === buttonsList[0]) {
      dispatch(fetchPostsByCreatedAt() as any);
    }
    if (name === buttonsList[1]) {
      dispatch(fetchPostsByViewsCount() as any);
    }
  };

  return (
    <div className="grid gap-y-10 grid-cols-12 mb-20 gap-x-5 ">
      <div className="flex flex-col col-start-1 col-end-12  gap-y-10">
        <SwitchButtons
          buttonsList={buttonsList}
          value={value}
          onClickType={handleButtonClick}
          classes="col-start-1 col-end-13"
        />
      </div>
      {(value === buttonsList[0] || value === buttonsList[1]) && <PostsList />}
      {value === buttonsList[2] && <TagsList />}
    </div>
  );
};

export default Home;
