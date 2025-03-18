# Dự Án Intern Web

## Hướng Dẫn Cài Đặt

Dự án này bao gồm **backend** và **frontend**, mỗi phần chạy trên các cổng khác nhau:
- **Backend:** Chạy trên cổng `3000`
- **Frontend:** Chạy trên cổng `3001`

### Yêu Cầu
Đảm bảo bạn đã cài đặt các công cụ sau:
- Node.js (khuyến nghị phiên bản LTS mới nhất)
- MongoDB
- Git

### Clone Repository
```sh
git clone https://github.com/yourusername/intern-web.git
cd intern-web
```

## Cài Đặt Backend
1. Di chuyển vào thư mục backend:
   ```sh
   cd backend
   ```
2. Cài đặt các dependencies:
   ```sh
   npm install
   ```
3. Tạo file `.env` trong thư mục backend và cấu hình các biến môi trường (ví dụ: chuỗi kết nối MongoDB).
4. Nạp dữ liệu mẫu vào database (tùy chọn):
   ```sh
   node seeder.js
   ```
5. Khởi động server backend:
   ```sh
   npm run dev
   ```
   Backend sẽ chạy tại `http://localhost:3000`.

## Cài Đặt Frontend
1. Di chuyển vào thư mục frontend:
   ```sh
   cd ../frontend
   ```
2. Cài đặt các dependencies:
   ```sh
   npm install
   ```
3. Khởi động server frontend:
   ```sh
   npm run dev
   ```
   Frontend sẽ chạy tại `http://localhost:3001`.

## Sử Dụng
- Mở `http://localhost:3001` trong trình duyệt để truy cập giao diện frontend.
- Frontend sẽ giao tiếp với backend tại `http://localhost:3000`.

## Xử Lý Lỗi
- Nếu các cổng đã được sử dụng, hãy thay đổi chúng trong `package.json` (frontend) và `.env` (backend).
- Đảm bảo MongoDB đã được khởi động trước khi chạy backend.

## Đóng Góp
Hãy thoải mái fork repository và gửi pull request.

