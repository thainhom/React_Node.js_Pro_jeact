import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import moment from "moment/moment";
import "./Register.css";
function CustomerRegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    ////////////////////////////////////////////////////////////////
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(window.localStorage.getItem("users") ? JSON.parse(window.localStorage.getItem("users")) : [])
    }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target
        if (name === 'username') {
            await setUsername(value)
            setErrorUsername("")
        } else if (name === 'email') {
            await setEmail(value)
            setErrorEmail("")
        } else if (name === 'password') {
            await setPassword(value)
            setErrorPassword("")
        } else if (name === 'confirm_password') {
            await setConfirmPassword(value)
            setErrorConfirmPassword("")
        }
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);// test để kiểm tra 1 chuỗi có khớp vs biểu thức hay không  và trả về true false
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;

        if (username.trim().length === 0) {
            hasError = true;
            await setErrorUsername("Bắt buộc nhập tên đăng nhập.")
        }
        if (email.trim().length === 0) {
            hasError = true;
            await setErrorEmail("Bắt buộc nhập địa chỉ email.")
        } else if (!validateEmail(email)) {
            hasError = true;
            await setErrorEmail("Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng email.");
        }
        if (password.trim().length === 0) {
            hasError = true;
            await setErrorPassword("Bắt buộc nhập mật khẩu.")
        }
        if (confirmPassword.trim().length === 0) {
            hasError = true;
            await setErrorConfirmPassword("Bắt buộc nhập xác nhận mật khẩu.")
        }
        if (password !== confirmPassword) {
            hasError = true;
            alert("mật khẩu không trùng khớp")


        }


        // TODO: Kiểm tra mật khẩu và xác nhận mật khẩu có trùng nhau không

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username || users[i].email === email) {
                if (users[i].username === username) {
                    hasError = true;
                    await setErrorUsername("Tên đăng nhập đã tồn tại")
                }
                if (users[i].email === email) {
                    hasError = true;
                    await setErrorEmail("Địa chỉ email đã tồn tại")
                }
                break;

            }
        }



        if (hasError) {
            return;
        }

        const newUser = {
            username: username,
            email: email,
            password: password,
            role: 'customer',
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        const newListUsers = [...users, newUser];
        window.localStorage.setItem("users", JSON.stringify(newListUsers));
        navigate('/login');


    }
    return (
        <div className="login-box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input
                        value={username}
                        onChange={(e) => handleChange(e)} type="text" name="username" />
                    <span className="error">{errorUsername}</span><br></br>
                    <label>Username</label><br></br>
                </div>
                <div className="user-box">
                    <input
                        value={email}
                        onChange={(e) => handleChange(e)} type="text" name="email" />
                    {<span className="error">{errorEmail}</span>}<br></br>
                    <label>Email</label><br></br>
                </div>
                <div className="user-box">
                    <input
                        value={password}
                        onChange={(e) => handleChange(e)} type="password" name="password" />
                    {<span className="error">{errorPassword}</span>}<br></br>
                    <label>Password</label><br></br>
                </div>
                <div className="user-box">
                    <input
                        value={confirmPassword}
                        onChange={(e) => handleChange(e)} type="password" name="confirm_password" />
                    {<span className="error">{errorConfirmPassword}</span>}<br></br>
                    <label>Confirm Password </label><br></br>
                </div>
                <button type="submit"  >
                    <a >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        SUBMIT
                    </a></button>
                <button>
                    <a href="/login">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        LOGIN
                    </a></button>

            </form>
        </div>
    );
};

export default CustomerRegisterPage;
