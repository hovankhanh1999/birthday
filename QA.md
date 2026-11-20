# Kiểm tra bản hoạt ảnh theo khớp — 25/10/2026

## Đã qua

- node --check script.js.
- node --test tests/flow.test.cjs: 4 nhóm test, gồm timing loading và password, khóa mở lặp, lịch pose và lục túi im lặng 4,2 giây, 6 thứ tự thư, 27 tổ hợp đáp án, kết quả và bánh.
- Tất cả href/src và URL tài nguyên CSS trỏ đến file có thật; ID HTML không trùng; SVG rig parse được bằng XML parser.
- Không còn steps() hoặc đổi ảnh toàn thân trong CSS.
- UI tại viewport mặc định ~426px: đi từ password đúng tới SOS, chọn thư theo thứ tự phải → trái → giữa; chỉ lá cuối mở quiz; chọn đáp án cả ba câu, xem kết quả, mở bánh và thắp nến.
- UI màn 320x568: nhập password sai bằng Enter rồi sửa đúng; lỗi biến mất, chân không lộ dưới tường khi bắt đầu ló đầu; thoại, nhân vật và SOS nằm trong màn, không tràn ngang.
- Xoay ngang 667x375: thoại x193,5 y65,2 w280 h39; nút SOS x183,5 y287 w300 h51,1; nằm trong viewport, không tràn ngang.
- Màn máy tính 1280x800: nhân vật x525 y264 w230 h271,9 và thoại x500 y199,6 w280 h52,5, nằm giữa viewport.
- Đã reset viewport test về kích thước mặc định.

## Giới hạn

Chưa kiểm tra trên điện thoại vật lý hoặc trình duyệt Safari. Reduced-motion có CSS vô hiệu hóa toàn bộ animation/transition; chưa bật chế độ hệ điều hành để kiểm tra trực quan. Đây là hoạt ảnh cutout bằng khớp; không phải phim hoạt hình vẽ từng khung hay video. Các kiểm tra UI luồng game chạy trước lần bổ sung chuyển động miệng và wrapper khớp con cuối; logic game không đổi, test tự động đã chạy lại sau cùng.
