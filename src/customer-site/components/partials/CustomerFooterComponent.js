import "./Footer.css";
import { Link } from "react-router-dom";

function CustomerFooterComponent() {
    return (
        <div class="footer-card">
            <footer>
                <div class="footer">
                    <div class="about">
                        <div class="logo-set-small">
                            <Link to="/">
                                <h6>ThaiNhom.com</h6>
                            </Link>
                        </div>
                        <section class="about-p">
                            <p>Chúng tôi trang bị những sản phẩm tuyệt vời để phục vụ quý khách !</p>
                        </section>
                    </div>
                    <div class="info">
                        <h4>Liên kết</h4>
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/products'>Sản phẩm</Link>
                                </li>
                                <li>
                                    <a href="/aboutUs">Câu chuyện của chúng tôi</a>
                                </li>
                                <li>
                                    <a href="/QnA">Các câu hỏi thường gặp</a>
                                </li>

                                {/* <li>
                      <a href="">Chính sách đổi trả</a>
                    </li> */}
                                <li>
                                    <a href="/Admin">Truy cập quyền quản trị</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div class="contact">
                        <h4>Liên hệ</h4>
                        <ul class="link-list">
                            <li>
                                <Link to='/contact'>Để lại lời nhắn</Link>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/le.quangthai.56/">info@ThaiNhom.com</a>
                            </li>
                            <li>
                                <a href="">www.ThaiNhom.com</a>
                            </li>
                            <li>
                                <a href="">Da Nang City, Vietnam</a>
                            </li>
                            <li>
                                <a href="">+084 905 602 739</a>
                            </li>
                        </ul>
                    </div>
                    <div class="social">
                        <h4>Social</h4>
                        <ul class="link">
                            <li>
                                <i class="fab fa-facebook-f"></i> 22.543 Likes
                            </li>
                            <li>
                                <i class="fab fa-twitter"></i> 12.860 Followers
                            </li>
                            <li>
                                <i class="fab fa-pinterest"></i> 3331 Pins
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default CustomerFooterComponent;
