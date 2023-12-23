# Hasil Testing

total testing

![Alt text](Screenshot_20231206_190844.png)

detail testing

![Alt text](Screenshot_20231206_190909.png)

# Cara menjalankan testing di lokal

1. install dependensi

```
npm install
```

2. membuat database

```
create database <database name>
```

3. setup `.env`

```
# db url local = postgresql://yourusername:yourpassword@localhost:5432/yourdb

DB_URL=
PORT=
SECRET_KEY_JWT=
```

4. Migrasi database

eksekusi perintah `node index.js`, sampai terlihat seperti gambar dibawah

![Alt text](Screenshot_20231206_192602.png)

lalu batalkan proses di teminal `ctrl + c`

(jika terjadi error migrasi, periksa konfigurasi .env dan nama databasenya)

5. Jalankan testing

```
npm run test
```
