import { apiUpload } from "@/utils/axios-setup";

export const uploadFiles = async (files: File[]) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        apiUpload.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      const formData = new FormData();
      files.forEach(file => {
        formData.append("image", file);
      });
  
      const response = await apiUpload.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.message && response.data.filePaths) {
        return response.data;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };
  
  
  export const deleteFiles = async (filenames: string[]) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        apiUpload.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
  
      const response = await apiUpload.delete("/delete", {
        data: {
          filenames: filenames,
        },
      });
  
      if (response.data && response.data.deletedFiles) {
        return response.data;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };