# AN PHÚ MIRROR – Template giao diện website gương (bản demo xem giao diện)

Mở `index.html` bằng trình duyệt (double-click) là chạy – không cần cài đặt hay máy chủ.

## Cấu trúc
| File | Nội dung |
|---|---|
| index.html | Trang chủ (hero slider, danh mục, sản phẩm nổi bật, quy trình, dự án, tin tức…) |
| products.html | Danh sách sản phẩm: lọc danh mục, tìm kiếm, sắp xếp, lọc LED |
| product-detail.html?id=… | Chi tiết sản phẩm: thư viện ảnh, zoom, thử ánh sáng LED 3000K/4000K/6000K |
| cnc-service.html | Gia công & cắt kính CNC + bộ mô phỏng hình dạng/kích thước gương |
| projects.html | Dự án (lọc + lightbox) |
| about.html / news.html / contact.html / 404.html | Giới thiệu / Tin tức / Liên hệ (form + bản đồ) / Lỗi 404 |
| css/style.css | Toàn bộ giao diện. Đổi màu thương hiệu ở `:root` (đầu file) |
| js/data.js | **Thông tin công ty, LINK ẢNH, sản phẩm, dự án, tin tức** |
| js/i18n.js | Chuỗi chữ song ngữ Việt / Anh |
| js/main.js | Hiệu ứng & tương tác |

## Việc thường làm
- **Đổi tên/logo chữ**: `COMPANY.brand` trong `js/data.js`.
- **Đổi hình**: sửa URL trong object `IMG` (js/data.js). Toàn site tự cập nhật.
- **Thêm/sửa sản phẩm**: mảng `PRODUCTS` (js/data.js).
- **Sửa chữ/dịch**: `js/i18n.js` (dạng `'khoá': ['Tiếng Việt', 'English']`).
- **Zalo**: `COMPANY.zalo` trong js/data.js.

## Lưu ý
- Hình ảnh dùng hotlink (không lưu trong thư mục). Nếu link bị đổi/chặn, ảnh dự phòng sẽ hiện thay thế.
- Ảnh có nguồn từ bolenmirror.com và các gian hàng bán sản phẩm BOLEN: chỉ nên dùng để **xem demo nội bộ**. Khi làm website thật hãy dùng ảnh do công ty tự chụp/sản xuất hoặc ảnh có bản quyền.
- Nội dung sản phẩm, thông số, số liệu thống kê, dự án, tin tức, chứng nhận, phản hồi khách hàng là **dữ liệu mẫu**.
- Thông tin công ty/địa chỉ/hotline lấy từ kinhhopphongsach.com/lien-he/.
- Form liên hệ là bản demo (chưa có backend): hiển thị nút gửi qua Email/Zalo.
- Font Be Vietnam Pro tải từ Google Fonts (cần internet; nếu không có sẽ dùng font hệ thống).
