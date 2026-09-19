import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className='zine-colophon'>
      <div className='zine-container'>
        <div className='colophon-grid'>
          <div>
            <h4 className='colophon-title'>Notes to self</h4>
            <p className='colophon-text'>
              Nơi lưu trữ của riêng bản thân tôi - nơi có từng cột mốc trưởng thành, những bước chân thầm lặng trên hành
              trình hình thành sự nghiệp
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: 'var(--sp-4)' }}>
              <a
                href='https://github.com/annguyen-se'
                target='_blank'
                rel='noreferrer'
                title='GitHub'
                style={{ color: 'var(--fg-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}>
                <FaGithub size={18} />
              </a>
              <a
                href='https://www.linkedin.com/in/trần-an-nguyễn-a46a98309'
                target='_blank'
                rel='noreferrer'
                title='LinkedIn'
                style={{ color: 'var(--fg-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}>
                <FaLinkedin size={18} />
              </a>
              <a
                href='https://www.facebook.com/nguyen.an.863123/'
                target='_blank'
                rel='noreferrer'
                title='Facebook'
                style={{ color: 'var(--fg-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}>
                <FaFacebook size={18} />
              </a>
              <a
                href='mailto:annguyentran35@gmail.com'
                title='Email'
                style={{ color: 'var(--fg-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}>
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>

          <div>
            <h5 className='colophon-subheading'>QUY CÁCH ẤN BẢN</h5>
            <ul className='colophon-list'>
              <li>Kiểu chữ: Newsreader &amp; Space Grotesk</li>
              <li>Chất liệu: Bề mặt giấy thô điện tử</li>
              <li>Kiến trúc CSS: Thuần biến bản địa</li>
            </ul>
          </div>

          <div>
            <h5 className='colophon-subheading'>BÀN BIÊN TẬP</h5>
            <ul className='colophon-list'>
              <li>Thư từ trao đổi: annguyentran35@gmail.com</li>
              <li>Đóng góp bản thảo: Luôn rộng mở</li>
              <li>Địa hạt: Không gian mạng tự do</li>
              <li>Giấy phép: Dành trọn cho sự trầm tư của con người</li>
            </ul>
          </div>
        </div>

        <div className='colophon-bottom'>
          <span>
            &copy; {new Date().getFullYear()} Notes to Self. Không giữ độc quyền trước những tâm hồn biết nghĩ.
          </span>
          <span>In trên nền hạt electron thô</span>
        </div>
      </div>
    </footer>
  );
}
