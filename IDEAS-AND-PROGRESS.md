# Website sinh nhật — ý tưởng và tiến độ

Cập nhật: 22/10/2026. Dự án: C:/Users/hovan/Documents/projects/birthday.

## Mục tiêu và người nhận

Website sinh nhật vui nhộn dành cho một người bạn quen qua mạng. Không có ảnh chụp chung hay ảnh người nhận. Người nhận thích những thứ nhỏ nhắn, đáng yêu; hay thức khuya làm việc, đau lưng và hay quên. Tông hài nhẹ, cà khịa thân thiện. Người dùng thấy một số lời thoại/lời chúc hiện tại hơi sến và sẽ sửa text sau.

Làm từng bước, trợ lý viết code và người dùng xem kết quả để điều chỉnh. Không tự đẩy nhanh các quyết định sáng tạo chưa chốt.

## Công nghệ và deploy

HTML, CSS, JavaScript thuần; website tĩnh, không backend, không dependency và không cần build. Dùng đường dẫn tương đối ./assets/... để deploy cả ở đường dẫn con. Gom tài nguyên vào dự án. Tên file chữ thường. Chưa chọn hosting và chưa deploy công khai.

Chạy local trong thư mục birthday:
python -m http.server 8000 --bind 127.0.0.1
Mở http://127.0.0.1:8000/. Nếu server cũ không còn chạy thì khởi động lại. Kiểm tra port trước khi mở thêm server.

Mật khẩu ngày sinh là 21111998. Đây chỉ là một cổng trò chơi frontend, không phải bảo mật; nội dung và mật khẩu có thể đọc được trong mã trang. Không cần lưu dữ liệu người chơi.

## Kịch bản đã chốt và đã có trong code

### 1. Mở đầu giả lỗi

- Nền xám, spinner, chữ Loading.... trong 3 giây.
- Sau đó Đợi xíu nha.... trong 4 giây. Tổng chờ 7 giây.
- Không hiện birthday.exe ở màn tải.
- Cửa sổ lỗi mang dáng hệ thống, tiêu đề Application Error; đã bỏ birthday.exe.
- Nội dung: The application was unable to start correctly.
- An unexpected error occurred while loading the application.
- Error code: 0x80070002 / Resource: message / Status: FILE_NOT_FOUND.
- Dừng phần nội dung lỗi ở The requested resource could not be located.
- Nút Retry with password (đã thử đổi tiếng Việt rồi người dùng yêu cầu đổi lại).
- Bấm nút mới hiện What is your birthday?, gợi ý DDMMYYYY, ô password và Unlock.
- Nhập sai: Incorrect password. Try again. Nhập đúng 21111998: chuyển sang cánh cụt.

### 2. Cánh cụt đi tìm

- Khi bé xuất hiện, ẩn toàn bộ cửa sổ Application Error.
- Bé xuất hiện gãi đầu bối rối, KHÔNG thoại lúc này.
- Đi tìm ở khoảng 2–3 vị trí có chủ ý, không chạy mãi vòng bốn góc.
- Code hiện tại: xuất hiện gần dưới trái, sang vùng phải, rồi về giữa màn hình.
- Đến giữa trang, bé nhìn thẳng ra người xem rồi mới nói.
- Nhịp ở giữa: “ủa....” + gãi đầu, tiếp đó nhăn mặt, rồi “đâu mất rồi....” + chống cằm suy nghĩ.
- Sau chuỗi biểu cảm mới hiện nút SOS giải cứu cánh cụt.
- Bong bóng thoại có đuôi nằm sát bé và di chuyển cùng bé, không đặt trong hộp riêng cách xa nhân vật.

### 3. Tìm giấy

- Bấm SOS hiện ba mẩu giấy để người nhận chạm mở.
- Hiện tại: ba nút giấy cùng trong một panel, chưa phải đồ vật giấu rải quanh trang.
- Hai lần đầu tìm nhầm đồ: danh sách đồ ăn, giấy nhắc ngủ sớm.
- Lần thứ ba tìm được bài kiểm tra chống già.
- Mỗi mẩu chỉ mở một lần. Nội dung theo thứ tự mở, không cố định theo vị trí nút.
- Sau khi mở đủ, nút Mở bài kiểm tra chống già xuất hiện.

### 4. Bài kiểm tra chống già

Ba câu đã được người dùng chấp thuận:

Câu 1: Đồng hồ chỉ 2 giờ sáng. Bạn đang:
A. Ngủ từ lâu rồi.
B. Làm nốt tí thôi, sắp xong rồi.
C. Không tiện trả lời, đang làm việc.
Phản ứng: Cánh cụt nhìn đồng hồ, lặng lẽ ghi chép.

Câu 2: Vừa đứng dậy sau khi ngồi làm việc, âm thanh nào xuất hiện?
A. Không có gì.
B. “Rắc.”
C. “Á… lưng.”
Phản ứng: Cánh cụt lấy ra một miếng cao dán.

Câu 3: Câu đầu tiên của bài kiểm tra hỏi gì?
A. Mấy giờ đi ngủ?
B. Không nhớ, cho xem lại.
C. Có câu đầu tiên hả?
Phản ứng: Cánh cụt lật lại giấy… chính nó cũng quên.

- Hiển thị lần lượt từng câu, ba đáp án, chọn một lần rồi khóa lựa chọn.
- Hiện phản ứng sau mỗi câu và nút Câu tiếp theo; câu cuối là Xem kết quả.
- Đây là trò đùa, không chấm điểm sức khỏe; chọn đáp án nào cũng đến cùng kết quả.
- Kết quả: HỆ ĐIỀU HÀNH CẦN BẢO TRÌ.
- Phát hiện: làm việc quá giờ, lưng phát tín hiệu, bộ nhớ chập chờn.
- Đề xuất: lưu công việc, nghỉ một chút và nhận bánh sinh nhật.
- Nút Lưu rồi, đưa bánh đây.
- Hiện tại phản ứng của cánh cụt ở từng câu mới là CHỮ, nhân vật trên panel là hình đứng yên. Chưa có hoạt ảnh đeo kính, nhìn đồng hồ, ghi chép, lấy cao dán, lật giấy.

### 5. Sinh nhật

- Bấm nhận bánh: panel Chúc mừng sinh nhật!, bánh emoji, lời chúc và trang trí confetti dạng ký tự.
- Chạm bánh hiện ánh sáng và lời nhắc ước.
- Đây còn là bản đơn giản. Chưa có bánh vẽ riêng, hiệu ứng confetti hạt thật hay cảnh cánh cụt vỗ cánh.
- Lời chúc hiện tại là bản nháp, người dùng muốn sửa text sau.

## Thiết kế nhân vật và những điều cần giữ

Đã thử thỏ SVG, vịt chưa triển khai, rồi cánh cụt SVG đeo cặp. Người dùng thấy SVG chưa đủ cute, duyệt mẫu cánh cụt chibi vẽ màu nước/bút chì: đầu tròn lớn, thân mochi, xám xanh và kem, má hồng, mỏ và chân cam nhỏ.

Ban đầu có cặp sách và khăn học sinh. Yêu cầu mới nhất: BỎ CẶP SÁCH; asset mới đã bỏ cả cặp, quai và phụ kiện.

Người dùng phản đối việc xoay/lắc cả ảnh để giả chạy. Giữ hoạt ảnh bằng khung hình với tư thế chân khác nhau. Đừng quay lại kiểu sticker lắc lư liên tục. Bộ chạy hiện chỉ có 4 frame, chuyển động còn ngắn và cần xem lại độ tự nhiên.

Các asset hiện có:
- assets/penguin-walk-no-bag.png: sheet bốn khung chạy không cặp, đang dùng.
- assets/penguin-confused.png: gãi đầu và tư thế đứng nhìn thẳng, đang dùng.
- assets/penguin-thinking.png: gãi đầu, nhăn mặt, chống cằm, đang dùng.
- assets/penguin.svg: hình cũ, hiện vẫn dùng làm favicon.
- assets/penguin-chibi.png và assets/penguin-walk.png: mẫu cũ có cặp, giữ làm lịch sử/tham chiếu, không dùng cho nhân vật chính hiện tại.

Ảnh được tạo bằng Imagegen rồi copy vào assets. Sheet có tỉ lệ 3:1 toàn ảnh, 4 cell, mỗi cell tỉ lệ 3:4. Animation dùng background-size 400% 100% và steps(). Cần giữ đúng căn khung để không lộ khung bên cạnh.

## Các file chính

- index.html: các màn, form, nhân vật, giấy, quiz, bánh.
- styles.css: style và animation, hiện có một số rule/keyframe cũ không còn dùng; có thể dọn khi cần, tránh sửa rộng chỉ để dọn.
- script.js: chuỗi thời gian, password, di chuyển, biểu cảm, giấy, quiz và bánh.
- README.md: hướng dẫn local/deploy ban đầu; mô tả tiến độ trong README còn cũ (bước 1), cần cập nhật trước khi bàn giao/deploy.

## Kiểm tra đã làm và giới hạn

- node --check script.js đã qua sau lần thêm quiz.
- Kiểm tra bằng VM mô phỏng DOM: các vị trí đáp án, ba câu liên tiếp, màn kết quả và nút chuyển sang bánh đều qua.
- Trước đó đã kiểm tra logic password đúng/sai, chuỗi biểu cảm và luồng SOS → giấy → bánh bằng mock DOM.
- Đã từng kiểm tra local server trả 200, đường dẫn asset và cấu trúc div cân bằng.
- Đã xem trên trình duyệt một số bản trước và xác nhận cửa sổ lỗi ẩn khi bé xuất hiện.
- Bản QUIZ mới nhất chưa được kiểm tra tương tác trực quan end-to-end trên trình duyệt.
- Chưa kiểm tra trên điện thoại thật; cần xem clipping của bong bóng thoại, khoảng cách nút SOS và nhân vật, đường chạy khi đổi kích thước/đổi hướng.
- Có hỗ trợ prefers-reduced-motion; cần kiểm tra trực quan luồng này nữa.
- Chưa deploy công khai, chưa thêm nhạc/âm thanh.

## Việc tiếp theo nên làm

1. Cho người dùng xem và chỉnh câu chữ (ưu tiên bớt sến, tự nhiên, cà khịa nhẹ).
2. Kiểm tra trực quan toàn luồng bản mới, cả màn nhỏ, keyboard và reduced motion.
3. Nếu người dùng muốn: tạo hoạt ảnh phản ứng cho ba câu quiz; chưa được làm trong code hiện tại.
4. Tinh chỉnh hoạt ảnh chạy nếu vẫn trông trượt hoặc giật; đừng mô tả là mượt khi chưa xem.
5. Hoàn thiện đoạn bánh/lời chúc theo lựa chọn của người dùng.
6. Cập nhật README, dọn asset/CSS không dùng khi phù hợp, chọn hosting và kiểm tra bản deploy.

## Ý tưởng đã bàn nhưng CHƯA chốt triển khai

Giấy làm lộ kịch bản giả lỗi; hộp quà giao nhầm toàn cá; máy đổi giấy ra tất rồi ra bánh; bánh mọc chân chạy; nhiều lớp hộp quà; phiếu bảo hành tuổi mới. Người dùng đã chọn bài kiểm tra chống già cho luồng hiện tại, không tự thay bằng các ý tưởng này.

Ý tưởng ban đầu có lời nhắn bí mật khi chạm nhân vật nhiều lần, thổi/thắp nến, nhạc tùy chọn và đoạn kết bé ngủ cạnh quà. Chưa có trong code hiện tại; không coi là đã hoàn thành hoặc bắt buộc trước khi trao đổi thêm.

## Gợi ý tiếp tục phiên sau

“Đọc birthday/IDEAS-AND-PROGRESS.md và các file hiện tại. Tiếp tục website sinh nhật cánh cụt từ bản quiz chống già. Mình muốn chỉnh text/xem và sửa animation trước khi deploy.”

## Cập nhật phiên tiếp theo — 22/10/2026

- Đã thêm assets/penguin-quiz-reactions.png: sheet 2 cột x 3 hàng, mỗi hàng hai tư thế: đồng hồ/ghi chép, đưa cao dán, lật giấy. Tạo bằng Imagegen và lưu trong dự án.
- Phản ứng chạy ngắn sau khi chọn đáp án, reset khi sang câu tiếp theo; chế độ giảm chuyển động hiện tư thế tĩnh.
- Đưa hình phản ứng xuống dưới đáp án khi chọn để thấy được trên màn nhỏ; chuyển về đầu panel khi sang câu/kết quả.
- Đã kiểm tra trên trình duyệt: password sai/đúng, Application Error biến mất, đến SOS, mở quiz, trả lời ba câu và xem kết quả. Luồng giấy đã được mở trong lúc xem; chưa tự kiểm thử lại cả ba lần mở giấy ở phiên này.
- Kiểm tra mô phỏng ba vị trí đáp án và ánh xạ reaction đã qua trước lần tinh chỉnh vị trí hình; node --check qua sau tinh chỉnh. Chưa kiểm tra lại trực quan riêng lần đổi vị trí hình cuối phiên.
- Không đổi câu chữ người dùng đã chốt. Chưa deploy, chưa kiểm tra điện thoại thật, nhạc và bánh vẫn ở mức bản nháp.

## Thay kịch bản sau mở khóa — 25/10/2026

Yêu cầu mới thay thế đoạn đi tìm cũ: bé mặc yếm hồng đào, xuất hiện ngay giữa màn hình, vẫy tay nói “Ủa helloooo ! Chị ở đây hỏ”, rồi “Có cái này cho chị xem nè !!”. Sau đó bé mò túi yếm, nhìn trái/phải, nói “Ủa..” rồi “ủa đâu rồi....”. Kết thúc mới hiện SOS. Không còn chạy qua các góc ở đoạn này.

Đã thêm assets/penguin-overalls-intro.png (Imagegen, 2 cột x 3 hàng: chào/mò túi/ngó nghiêng), preload trong HTML và startPenguinIntroduction() trong JS. CSS đặt nhân vật giữa viewport, responsive, có reduced-motion. Đã kiểm tra cú pháp và lịch thoại/pose/SOS bằng fake timer. Các text tự sửa của người dùng trong phần thư và quiz được giữ nguyên. Nhân vật quiz hiện vẫn dùng bộ asset cũ không yếm; chưa thay cả bộ quiz.

### Kịch bản vào cảnh mới nhất

Bé mặc yếm ló đầu sau tường nhỏ giữa màn hình, nói “Hellooo chị đến rồi hỏ”. Sau đó chống cánh, nhấc chân, bật qua tường và đáp xuống, tường ẩn đi, bé nói “Có cái này cho chị nèeee”. Tiếp tục mò túi, “Ủa..”, “ủa đâu rồi....”, rồi SOS. Thay thế lời chào cũ và đoạn xuất hiện đứng ngay giữa.

Asset mới assets/penguin-wall-entry.png (Imagegen, 2x2: bám tường/nhấc chân/bật/đáp). Tường làm bằng CSS và chuyển lớp trước/sau nhân vật theo pose. Đã kiểm tra chuỗi thời gian bằng mock timers; CSS/JS URL version wall-entry-2 để tránh cache bản cũ. Không thay text ở phần thư/quiz.

### Nhịp cảm xúc khi lục túi

Sau “Có cái này cho chị nèeee”, bé phải vui/thoải mái, cúi xuống lục túi trong im lặng 4,2 giây. Lúc này chưa có mắt buồn hay mày bối rối. Sau đó mới chuyển pose search, nói “Ủa..”, rồi “ủa đâu rồi....” và SOS. Đã thêm penguin-overalls-happy-pocket.png thay sheet intro ở các tư thế chào/lục túi/ngó nghiêng. Asset tường riêng giữ nguyên. URL CSS/JS phiên bản happy-pocket-3.

## Làm lại hoạt ảnh theo khớp — 25/10/2026

Người dùng phản đối sprite sheet vì các hình lệch nhau, trông như slide; yêu cầu làm lại và kiểm tra toàn bộ. Đã thay cơ chế đổi hình toàn thân bằng hình nhân vật tách phần trong assets/penguin-parts.png (tạo bằng Imagegen), ghép vào SVG template trong index.html. Các phần được cắt vùng hiển thị bằng viewBox SVG, không sửa pixel asset. Đầu/thân/cánh/chân giữ nguyên registration và cánh quay tại khớp vai, chân co ở khớp, đầu nghiêng liên tục. CSS không còn steps() hay sprite sheet cho nhân vật. Bộ quiz cũng dùng cùng rig và yếm, đạo cụ đồng hồ/sổ/cao dán/giấy vẽ bằng SVG và chuyển động liên tục. Asset cũ giữ lại làm tham chiếu.

Cập nhật README và tests/flow.test.cjs. Các test Node: timing loading/password; chặn mở khóa lặp; tất cả pose, lục túi im lặng 4,2 giây và SOS cuối; 6 thứ tự thư với duplicate guard; 27 tổ hợp đáp án và thắp nến. Nến giờ thắp một lần và không tự tắt khi bấm lại.

Đã chạy UI tới bánh và thắp nến ở viewport mặc định (~426px). Xác nhận text mới giữ nguyên, thư phải mở đủ, quiz phản ứng đúng, không tràn ngang tại màn bánh. Tiếp tục ghi kết quả kiểm tra màn hẹp/ngang ở cuối file.

### Kết quả kiểm tra sau làm lại

Xem QA.md để biết phạm vi đã kiểm tra và giới hạn. Màn 320x568, 667x375 và 1280x800 đã xem/đo trong trình duyệt; viewport đã reset. Đã sửa chân lộ dưới tường ở tư thế peek. Thêm khớp con cho chu kỳ vẫy/lục tay/ghi chép để khớp vai chuyển tư thế êm thay vì animation mới ghi đè góc vai ngay lập tức. Thêm miệng nhúc nhích khi thoại, không cử động khi lục túi im lặng. CSS/JS cache version rig-3. Chưa kiểm tra thiết bị thật/Safari và trực quan reduced-motion.

## Quan trọng: người dùng đã bác bỏ bản ghép khớp

Bản penguin-parts.png bị ghép sai tỉ lệ/điểm nối, người dùng không chấp nhận. Đã gỡ SVG template và phần khớp khỏi trang. Không khôi phục bản rig này.

Thỏa thuận mới: chỉ làm và duyệt một đoạn vẫy tay ngắn với nhân vật nguyên vẹn trước; CHƯA nối lại trèo tường/lục túi. Đã tạo assets/penguin-wave-sample.png, 8 hình nguyên vẹn 4x2, vẫy tay nhẹ. Trang wave-preview.html cho xem ngay và phát lại không cần password. Trang chính sau unlock chỉ chào “Hellooo chị đến rồi hỏ”, chạy mẫu 3 giây, hiện Xem lại vẫy tay và SOS để giữ đường đi tới game. Quiz tạm dùng hình nguyên vẹn tĩnh và phản ứng chữ, không ghép tay chân. Chờ người dùng duyệt chất lượng mẫu trước khi làm các cảnh còn lại.

## Sau khi duyệt mẫu vẫy tay

Người dùng đã duyệt wave-preview.html. Bước kế đang duyệt riêng: climb-preview.html, chưa ghép vào trang chính và chưa làm lục túi. Asset penguin-climb-sample.png có 12 hình nguyên vẹn 4x3, không ghép bộ phận. Luồng: ló đầu, chào, trèo 1,8 giây, đáp xuống, dùng lại bộ wave đã duyệt rồi nói “Có cái này cho chị nèeee”. Có nút replay, chặn bấm chồng khi đang chạy và chờ decode ảnh. Kiểm tra trực quan đã sửa tường che mắt bằng cách nâng peek từ +42px lên -5px. tests/climb.test.cjs kiểm tra lịch/replay; cả 5 test qua. Chờ người dùng duyệt đoạn trèo trước khi làm tiếp.

## Mẫu lục túi — 27/10/2026

Hai mẫu vẫy tay và trèo tường đã được người dùng duyệt. Làm tiếp riêng pocket-preview.html, chưa ghép vào index. Asset penguin-pocket-sample.png có 8 hình nguyên vẹn 4x2: hàng trên vui vẻ lục túi với thay đổi tay nhỏ; hàng dưới ngó trái/phải bối rối. Không dùng bộ phận ghép rời. Kịch bản: “Có cái này cho chị nèeee” 2,4s; lục túi vui vẻ im lặng 4,2s; “Ủa..” 1,8s; “ủa đâu rồi....” và ngó nghiêng 2,4s; hiện SOS. SOS trong trang mẫu disabled, chưa nối game. Có replay khóa khi chạy và reset đầy đủ. Đã kiểm tra đoạn mặt vui im lặng và đoạn cuối trực tiếp trên trình duyệt. tests/pocket.test.cjs kiểm tra lịch cảm xúc, SOS và replay; cả 6 test hiện tại qua. Giữ chỗ cố định cho SOS để nhân vật không nhảy vị trí khi nút hiện. Chờ người dùng duyệt mẫu lục túi rồi mới nối các cảnh vào trang chính.

### Biểu cảm ở hai câu “Ủa”

Người dùng yêu cầu nét mặt đổi rõ sang bối rối ở “Ủa..” và “ủa đâu rồi....”. Đã tạo penguin-pocket-confused.png: giữ hàng trên vui vẻ lục túi; hàng dưới có lông mày lệch/nhíu, mắt ngạc nhiên hoặc ngó nghiêng và mỏ nhỏ bối rối, không giữ nụ cười như trước. Trang pocket-preview.html/CSS trỏ asset mới; cache version confused-2. Timing không đổi, test pocket qua.

### Bỏ biểu cảm liếc mắt gian

Người dùng thấy tư thế nhìn trái hơi gian. Đã đổi thành quay nhẹ cả đầu/mỏ theo hướng nhìn, mắt tròn bình thường không liếc sát rìa hay lộ lòng trắng, hai mày ngơ ngác. Asset mới penguin-pocket-gentle-look.png; giữ hàng vui vẻ và timing. Trang mẫu dùng phiên bản gentle-look-3.

### Tiếp tục lục túi khi nói “ủa đâu rồi....”

Người dùng yêu cầu không rút tay ra khi đổi sang mặt bối rối. Asset mới penguin-pocket-still-searching.png giữ một cánh trong túi ở cả 4 tư thế bối rối; cánh kia giữ mép túi. Animation ở looking/done lặp nhẹ để bé còn tìm tiếp cả khi SOS đã hiện. Không đổi lịch thoại. Cache still-searching-4.

## Bốc phiếu trực tiếp — 10/11/2026

Sau lục túi và câu “ủa đâu rồi....”, cánh cụt đưa ra ba phiếu bốc thăm. Phiếu xuất hiện từ vùng túi, nâng lên rồi xòe ra để chọn. Đã gỡ SOS và màn tìm giấy khỏi trang chính. Chọn bất kỳ phiếu nào lần đầu đều mở đề kiểm tra, khóa cả ba phiếu và hiện nút bắt đầu quiz. Giữ lời chào người dùng sửa trong script.js. Sáu test Node qua, gồm chọn từng vị trí và chặn chọn sớm/lặp. Hoạt cảnh lấy phiếu dùng phiếu CSS trên hình cánh cụt hiện có.

### Rút phiếu có tay cầm — 10/11/2026

Thêm assets/penguin-ticket-pull.png, 12 hình 4x3 do ImageGen tạo. Prompt giữ nhân vật watercolor xám/kem mặc yếm đào, chân và đầu cố định, tay lần lượt tìm thấy, kéo ba phiếu từ túi lên và xòe trước ngực, nền trong suốt. Câu “ủa đâu rồi....” giữ 3,6 giây, mò thêm 1,6 giây. Rút phiếu 3 giây, sau đó ba nút chọn mới xuất hiện nhẹ trong 0,8 giây và lời mời hiện ở mốc 4,3 giây. Đã gỡ đường bay phóng to phiếu từ túi vì trông không tự nhiên. Chưa phải video liên tục, dùng 12 hình với bước tay nhỏ.

Cập nhật sau kiểm tra trực tiếp: gỡ hàng phiếu rời bên dưới. Ba nút bấm trong suốt đặt ngay trên phiếu bé cầm, phóng nhân vật lên 1,8 lần trong cảnh đưa phiếu. Lời mời và vùng chọn chỉ bật sau khi rút xong. Chụp QA tại qa/ticket-pull.png, thử phiếu giữa thành công. Kiểm tra trình duyệt desktop 1280x720, chưa kiểm tra lại trên điện thoại thật.

## Ghép mẫu đã duyệt vào trang chính — 10/11/2026

Trang chính dùng assets/penguin-approved-search-v4.png cho cả xuất hiện/chào, cúi nhìn túi lục tìm và rút ba phiếu. Mẫu SVG soft-preview cũ đã bị bác bỏ, không khôi phục. Giữ lời chào và text người dùng đã sửa. Giữ “Ủa..”, “ủa đâu rồi....”, nhân vật luôn cúi nhìn túi ở các đoạn này, không ngó quanh. Phiếu đầu tiên luôn là đề kiểm tra, vùng chọn đặt lên ba phiếu bé cầm. Cache styles/script approved-main-1. Sáu test Node qua, đã mở khóa và xem ba phiếu trên trình duyệt. Hình chào/trèo dùng tư thế đầu của mẫu mới, chuyển động toàn thân bằng CSS.

### Sửa trèo tường cứng và nền ảnh — 10/11/2026

Tạo bằng ImageGen hai asset nền alpha thật: penguin-approved-search-transparent.png giữ bộ lục túi đã duyệt, penguin-approved-climb-transparent.png gồm 12 tư thế bám tường/co chân/bật/đáp. Đã kiểm tra pixel góc alpha=0 bằng System.Drawing. Trang chính dùng bộ trèo riêng, bật lại animation các tư thế thay vì kéo một hình đứng yên; chỉnh quỹ đạo tránh cắt đầu và nhún khi đáp. Thời gian trèo giữ 1,8 giây để đồng bộ lịch JS và chuyển lớp trước/sau tường. Cache approved-main-3. Sáu test Node qua.

### Lời chào và tìm thấy phiếu — 10/11/2026

Người dùng yêu cầu đoạn hello ngó lên mềm hơn, bỏ “ủa đâu rồi”, giữ “Ủa..”, khi tìm được phiếu nói “đây rồi”. Đã thêm easing/nhún nhẹ lúc ngó lên và nghiêng nhỏ tư thế chào. Sau “Ủa..” bé tiếp tục cúi tìm trong im lặng. Rút phiếu 0,9 giây, rồi hiện “đây rồi” với nhún vui nhẹ; 0,6 giây sau bật lựa chọn. Cache approved-main-5. Test timing/lời thoại cập nhật, sáu test qua.
