import { FC, useRef, useState } from "react";
import Button from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../redux/Slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import axios from "../axios";

const Registration: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      console.log(1);
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка загрузки файла!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      avatarUrl: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: {
    email: string;
    password: string;
    fullName: string;
    avatarUrl: string;
  }) => {
    if (!values.email || !values.password || !values.fullName) {
      return;
    }

    values.avatarUrl = imageUrl;

    console.log(values.avatarUrl);

    const data = await dispatch(fetchRegister(values) as any);

    if (!data.payload) {
      return alert("Не удалось зарегестрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col gap-y-6 lg:p-20 md:p-20 p-5  rounded-lg mx-auto  bg-white max-w-xl">
      <h5 className="text-center font-bold text-2xl mb-6">Создание аккаунта</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <div className="flex justify-center items-center mb-6 flex-col gap-y-4">
          {imageUrl ? (
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={`http://127.0.0.1:5554/${imageUrl}`}
              alt="Uploaded"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          )}
          <div className="flex gap-x-4">
            <Button
              classes="border mb-4 !bg-black !text-white py-2 px-5 w-fit"
              onclick={() => inputFileRef.current!.click()}
            >
              Загрузить превью
            </Button>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />
            {imageUrl && (
              <Button
                classes="text-black rounded-md p-2 mb-4"
                onclick={onClickRemoveImage}
              >
                Удалить
              </Button>
            )}
          </div>
        </div>
        {errors.fullName && (
          <span className="text-red-500 text-sm">
            {errors.fullName.message}
          </span>
        )}
        <input
          className={`border mb-4 border-gray-300 p-3 rounded-lg m-auto max-w-lg w-full ${
            errors.email ? "border-red-500" : ""
          }`}
          type="text"
          placeholder="Полное имя"
          {...register("fullName", { required: "Укажите полное имя" })}
          aria-label="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        <input
          className={`border mb-4 border-gray-300 p-3 rounded-lg m-auto max-w-lg w-full ${
            errors.email ? "border-red-500" : ""
          }`}
          type="email"
          placeholder="E-Mail"
          {...register("email", { required: "Укажите почту" })}
          aria-label="Email"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        <input
          className={`border mb-4 border-gray-300 p-3 rounded-lg m-auto max-w-lg w-full ${
            errors.password ? "border-red-500" : ""
          }`}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: "Укажите пароль" })}
          aria-label="Password"
        />
        <div className="flex justify-end m-auto max-w-lg w-full">
          <Button
            classes="!bg-black text-white py-2 px-5 w-fit"
            typeButton="submit"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
