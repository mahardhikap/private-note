import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const apiUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UPLOAD_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

