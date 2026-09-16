// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="zine-colophon">
      <div className="zine-container">
        <div className="colophon-grid">
          <div>
            <h4 className="colophon-title">The Marginalia Press</h4>
            <p className="colophon-text">
              Được kiến tạo không qua thuật toán thao túng, không chạy theo chỉ số đo lường, hay sự can thiệp thương mại.
              Một chốn ẩn náu tĩnh lặng cho những suy niệm dài hơi, những đắn đo và những góc nhìn chân thật.
            </p>
          </div>

          <div>
            <h5 className="colophon-subheading">QUY CÁCH ẤN BẢN</h5>
            <ul className="colophon-list">
              <li>Kiểu chữ: Newsreader &amp; Space Grotesk</li>
              <li>Chất liệu: Bề mặt giấy thô điện tử</li>
              <li>Kiến trúc CSS: Thuần biến bản địa (CSS Variables)</li>
              <li>Quản lý trạng thái: Zustand phía máy khách</li>
            </ul>
          </div>

          <div>
            <h5 className="colophon-subheading">BÀN BIÊN TẬP</h5>
            <ul className="colophon-list">
              <li>Thư từ trao đổi: toasoan@marginalia.press</li>
              <li>Đóng góp bản thảo: Luôn rộng mở</li>
              <li>Địa hạt: Không gian mạng tự do</li>
              <li>Giấy phép: Dành trọn cho sự trầm tư của con người</li>
            </ul>
          </div>
        </div>

        <div className="colophon-bottom">
          <span>&copy; {new Date().getFullYear()} The Marginalia. Không giữ độc quyền trước những tâm hồn biết nghĩ.</span>
          <span>In trên nền hạt electron thô</span>
        </div>
      </div>
    </footer>
  );
}
