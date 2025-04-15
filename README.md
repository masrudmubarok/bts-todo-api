# BTS Todo API

BTS Todo API adalah API backend untuk mengelola daftar todo. API ini dibangun menggunakan Node.js, Express.js, Sequelize ORM, dan MySQL.

## Fitur

* Registrasi Pengguna
* Login Pengguna
* Manajemen Checklist (CRUD)
* Manajemen Item dalam Checklist (CRUD)
* Otentikasi JWT

## Persyaratan

* Node.js (versi 14 atau lebih tinggi)
* npm (atau yarn)
* MySQL

## Instalasi

1.  Klon repositori ini:

    ```bash
    git clone <URL_repositori_Anda>
    ```

2.  Pindah ke direktori proyek:

    ```bash
    cd bts-todo-api
    ```

3.  Instal dependensi:

    ```bash
    npm install
    ```

4.  Buat file `.env` di direktori root proyek dan tambahkan variabel lingkungan berikut:

    ```dotenv
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=todo_api
    DB_DIALECT=mysql
    JWT_SECRET=your_jwt_secret
    ```

    * Ganti `your_mysql_username`, `your_mysql_password`, dan `your_jwt_secret` dengan nilai yang sesuai.

5.  Jalankan migrasi database:

    ```bash
    npx sequelize-cli db:migrate
    ```

6.  Jalankan server:

    ```bash
    npm start
    ```

    atau

    ```bash
    npm run dev
    ```

    untuk pengembangan dengan nodemon.

## Dokumentasi API

### Otentikasi

* **Registrasi Pengguna**

    * `POST /register`
    * Body:

        ```json
        {
          "username": "nama_pengguna",
          "password": "kata_sandi",
          "email": "email@example.com"
        }
        ```

    * Respons:

        * 201 Created: `{ "message": "User registered successfully" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Login Pengguna**

    * `POST /login`
    * Body:

        ```json
        {
          "username": "nama_pengguna",
          "password": "kata_sandi"
        }
        ```

    * Respons:

        * 200 OK: `{ "message": "Login berhasil" }` (token JWT disimpan di cookie "token")
        * 401 Unauthorized: `{ "message": "Username atau password salah" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

### Checklist

* **Mendapatkan Semua Checklist**

    * `GET /checklists`
    * Header: `Authorization: Bearer <token>`
    * Respons:

        * 200 OK: `[ { "id": 1, "name": "Checklist 1" }, ... ]`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Membuat Checklist Baru**

    * `POST /checklists`
    * Header: `Authorization: Bearer <token>`, `Content-Type: application/json`
    * Body:

        ```json
        {
          "name": "Nama Checklist Baru"
        }
        ```

    * Respons:

        * 201 Created: `{ "id": 2, "name": "Nama Checklist Baru" }`
        * 400 Bad Request: `{ "errors": [ { "msg": "Checklist name is required" } ] }`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Menghapus Checklist**

    * `DELETE /checklists/:checklistId`
    * Header: `Authorization: Bearer <token>`
    * Respons:

        * 200 OK: `{ "message": "Checklist deleted successfully" }`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

### Item

* **Mendapatkan Semua Item dalam Checklist**

    * `GET /checklists/:checklistId/items`
    * Header: `Authorization: Bearer <token>`
    * Respons:

        * 200 OK: `[ { "id": 1, "itemName": "Item 1", "status": false }, ... ]`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Membuat Item Baru dalam Checklist**

    * `POST /checklists/:checklistId/items`
    * Header: `Authorization: Bearer <token>`, `Content-Type: application/json`
    * Body:

        ```json
        {
          "itemName": "Nama Item Baru"
        }
        ```

    * Respons:

        * 201 Created: `{ "id": 2, "itemName": "Nama Item Baru", "status": false }`
        * 400 Bad Request: `{ "errors": [ { "msg": "Item name is required" } ] }`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Mendapatkan Item dalam Checklist**

    * `GET /checklists/:checklistId/items/:itemId`
    * Header: `Authorization: Bearer <token>`
    * Respons:

        * 200 OK: `{ "id": 1, "itemName": "Item 1", "status": false }`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 404 Not Found: `{ "message": "Item not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Memperbarui Status Item**

    * `PUT /checklists/:checklistId/items/:itemId`
    * Header: `Authorization: Bearer <token>`
    * Respons:

        * 200 OK: `{ "message": "Item status updated successfully" }`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Menghapus Item**

    * `DELETE /checklists/:checklistId/items/:itemId`
    * Header: `Authorization: Bearer <token>`
    * Respons:

        * 200 OK: `{ "message": "Item deleted successfully" }`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

* **Mengganti Nama Item**

    * `PUT /checklists/:checklistId/items/rename/:itemId`
    * Header: `Authorization: Bearer <token>`, `Content-Type: application/json`
    * Body:

        ```json
        {
          "itemName": "Nama Item Baru"
        }
        ```

    * Respons:

        * 200 OK: `{ "message": "Item renamed successfully" }`
        * 400 Bad Request: `{ "errors": [ { "msg": "New item name is required" } ] }`
        * 401 Unauthorized: `{ "message": "Token not found" }`
        * 500 Internal Server Error: `{ "message": "Internal server error" }`

## Kontribusi

Kontribusi dipersilakan. Silakan fork repositori ini dan kirim pull request.

## Lisensi

MIT