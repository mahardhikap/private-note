import React, { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "@/api/users.api";
import { LoginI } from "@/interfaces/users.interface";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<LoginI>({
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    try {
      const result = await loginUser(dataUser);
      if (result?.code === 200) {
        localStorage.setItem("token", result?.data?.token);
        Swal.fire({
          icon: "success",
          title: "Akhirnya berhasil login🎉",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>router.replace('/dashboard'))
      } else {
        Swal.fire({
          icon: "error",
          title: "Yang bener nulisnya!😑",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <h1 className="font-semibold text-lg">Login TulisanQ 👀</h1>
      <input
        type="text"
        name="username"
        value={dataUser.username}
        onChange={handleChange}
        className="border-2 border-black w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/3 p-3 rounded"
        placeholder="Nama Pengguna"
        autoComplete="off"
      />
      <input
        type="text"
        name="password"
        value={dataUser.password}
        onChange={handleChange}
        className="border-2 border-black w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/3 p-3 rounded"
        placeholder="Kata Sandi"
        autoComplete="off"
      />
      <button
        className="p-3 font-semibold bg-gray-400 rounded w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/3 text-gray-100"
        onClick={handleLogin}
      >
        MASUK
      </button>
      <div className="cursor-pointer" onClick={() => router.replace("/")}>
        &larr; kembali halaman depan
      </div>
    </div>
  );
};

export default Login;
