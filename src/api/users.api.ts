import { apiClient } from "@/utils/axios-setup";
import { toast } from "react-toastify";
import { LoginI } from "@/interfaces/users.interface";

export const loginUser = async (data: LoginI) => {
  try {
    const response = await apiClient.post("/user/login", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const detailUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.get("/user/detail");
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateUser = async (id:string, data:LoginI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.put(`/user/${id}/update`, data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
