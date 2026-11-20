# Oupsss !!!

Website sinh nhật tĩnh bằng HTML, CSS và JavaScript thuần, không cần cài dependency hoặc build.

## Chạy thử

Trong thư mục birthday:

```sh
python -u -m http.server 8000 --bind 127.0.0.1
```

Mở http://127.0.0.1:8000/. Sau 7 giây tải, chọn Retry with password và nhập 21111998.

Luồng: lỗi giả → ngày sinh → cánh cụt mặc yếm trèo tường, chào và lục túi → SOS → mở đủ ba lá thư → quiz ba câu → kết quả → bánh.

## Chỉnh nội dung

- index.html: các màn và lời chúc cuối.
- script.js: lời thoại, nội dung thư, câu hỏi/đáp án, thứ tự và thời gian hoạt cảnh.
- styles.css: giao diện và chuyển động các khớp nhân vật.
- assets/penguin-parts.png: các bộ phận nhân vật được ghép bằng SVG trong template HTML. Không dùng đổi sprite cả thân nữa.
- IDEAS-AND-PROGRESS.md: ý tưởng và lịch sử quyết định.

## Kiểm tra

```sh
node --check script.js
node --test tests/flow.test.cjs
```

Bài kiểm tra dùng Node có sẵn, không cần cài thư viện. Kiểm tra lịch mở đầu, password sai/đúng, chống mở lặp, lịch cảm xúc, cả 6 thứ tự thư, 27 tổ hợp đáp án, kết quả và thắp nến.

## Deploy

Trang chạy tại https://fromkhanhwithlove.pages.dev/. Workflow GitHub Actions deploy nhánh `main` lên project Cloudflare Pages `fromkhanhwithlove` và dùng secret `CLOUDFLARE_API_TOKEN`. Trang không cần build. HTML dùng phiên bản query cho CSS/JS để tránh cache bản cũ khi cập nhật.

Mật khẩu là cổng trò chơi frontend, không phải bảo mật. Nội dung và mật khẩu có thể xem trong mã trang. Không thu thập hoặc lưu dữ liệu người chơi.

## Trạng thái mới nhất

Bản ghép khớp đã gỡ vì hình thể không đạt. Mở /wave-preview.html để duyệt riêng mẫu vẫy tay nguyên vẹn. Trang chính tạm chỉ chào sau mở khóa; cảnh trèo tường/lục túi đang chờ làm lại sau khi duyệt mẫu. Quiz hiện dùng ảnh nguyên vẹn tĩnh. Các mô tả rig/QA trước đây là lịch sử, không còn phản ánh bản hiện tại.
