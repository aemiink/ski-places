Bilgisayarında aşağıdakiler kurulu olmalı:

Node.js (v18 veya üzeri önerilir)
👉 https://nodejs.org

npm (Node.js ile birlikte gelir)

Kurulu mu kontrol etmek için:

node -v
npm -v

📦 Projeyi Kurma

Proje klasörüne gir:

cd ski-places-frontend


Bağımlılıkları yükle:

npm install

▶️ Projeyi Çalıştırma

Geliştirme ortamında projeyi başlatmak için:

npm run dev


Terminalde buna benzer bir çıktı görürsün:

VITE v5.x.x  ready in 500 ms

➜  Local:   http://localhost:5173/


Tarayıcıdan aç:

👉 http://localhost:5173

🔐 Admin Girişi (Development)

Backend / DB hazır değilse mock admin login kullanılır.

/admin/login sayfasına git

Login butonuna bas

Otomatik olarak admin paneline yönlendirilirsin

⚠️ Bu özellik sadece development ortamı içindir.

🧱 Kullanılan Teknolojiler

⚡ Vite

⚛️ React

🎨 Tailwind CSS

🔁 React Router

🌐 Axios

📁 Proje Yapısı (Özet)
src/
├─ api/
├─ components/
├─ pages/
│  ├─ Admin/
│  ├─ Landing
│  ├─ SkiAreas
│  └─ SkiAreaDetail
├─ routes/
├─ utils/
└─ main.jsx

🛠️ Backend Bağlantısı

Backend hazır olduğunda sadece:

api/AxiosInstance.js

BASE_URL

ayarlarının güncellenmesi yeterlidir.

✅ Notlar

Login olmayan kullanıcılar yorum yapamaz

Admin paneli protected route ile korunur

Fotoğraflar MinIO üzerinden yüklenir

👨‍💻 Geliştirici Notu

Bu proje frontend–backend ayrımı gözetilerek geliştirilmiştir.
Backend servisleri hazır olmasa bile frontend geliştirmesi kesintisiz devam edebilir.