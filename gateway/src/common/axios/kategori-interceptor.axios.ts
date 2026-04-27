import { HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

// buat variabel untuk endpoint API Kategori
export const kategori_api = axios.create({
  baseURL: 'http://localhost:3001/api/kategori',
  timeout: 1000,
});

// buat interceptor untuk kategori_api
kategori_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // buat variabel untuk response
    const status = error.response?.status;
    const message = error.response?.data;

    // jika status error terdefinisi
    if (status && message) {
      throw new HttpException(message, status);
    }

    // jika status error tidak terdefinisi
    throw new HttpException('Kategori Service Error', 500);
  },
);
