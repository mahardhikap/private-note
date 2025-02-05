import Admin from "@/containers/admin.container";
import React, { useState, useEffect } from "react";
import { detailUser, updateUser } from "@/api/users.api";
import { LoginI, RootUser } from "@/interfaces/users.interface";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Profile: React.FC = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<LoginI>({
    username: "",
    password: "",
  });
  const [dataDetailUser, setDataDetailUser] = useState<RootUser>();
  const handleGetDetailUser = async () => {
    try {
      const user = await detailUser();
      setDataUser({ ...dataUser, username: user?.data?.username });
      setDataDetailUser(user);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdateUser = async () => {
    Swal.fire({
      title: "Mau ganti kredensial login kamu, yakin?🤔",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd3333",
      cancelButtonColor: "#a5dc86",
      confirmButtonText: "Gas ganti",
      cancelButtonText: "Gak jadi",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Diupdate!👌",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          try {
            const result = await updateUser(
              dataDetailUser?.data?.id as string,
              dataUser
            );
            if (result?.code === 200) {
              localStorage.clear()
              router.replace('/login')
            } else {
              toast.error(result?.message);
            }
          } catch (error: any) {
            toast.error(error.message);
          }
        });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleGetDetailUser();
  }, []);
  return (
    <Admin>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          className="p-3 border-2 border-black rounded w-full"
          placeholder="Nama Pengguna"
          name="username"
          value={dataUser?.username}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="text"
          className="p-3 border-2 border-black rounded w-full"
          placeholder="Kata Sandi"
          name="password"
          value={dataUser?.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          className="p-3 rounded bg-gray-400 text-gray-100 w-full font-semibold"
          onClick={handleUpdateUser}
        >
          SAVE
        </button>
      </div>
    </Admin>
  );
};

export default Profile;
