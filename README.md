# Pemrograman Berorientasi Service (IF 23 FX)

---

## Setup Aplikasi

### 1. Cloning Repository

- Buka terminal/command prompt dan jalankan perintah berikut:

```bash
git clone https://github.com/ferico-uti/PBS-IF23FX.git
cd PBS-IF23FX
code .
```

### 2. Project Setup

- Ubah file `.env.example` menjadi `.env` (pada folder `kategori`)

- Sesuaikan konfigurasi postgresql `DATABASE_URL` pada perangkat PC/Laptop.

  ```bash
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db_if23FX_3001?schema=public"
  ```

- Jalankan perintah migrasi database pada terminal VSCode (jika database belum ada pada perangkat PC/Laptop)
  ```bash
  npx prisma migrate dev
  ```
  
- Buka terminal VSCode dan jalankan perintah berikut.

  ```bash
  cd kategori
  npm i
  npm run start:dev
  ```

- Tambah terminal VSCode dan jalankan perintah berikut.

  ```bash
  cd gateway
  npm i
  npm run start:dev
  ```
