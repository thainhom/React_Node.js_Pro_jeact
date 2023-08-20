import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function CustomerLoginPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("");
    const [errorUsername, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const navigate = useNavigate()
    const listUser = JSON.parse(localStorage.getItem("users")) ?? [];
    console.log('listUser', listUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = false
        // debugger
        for (let i = 0; i < listUser.length; i++) {
            if (listUser[i].username === userName
                && listUser[i].role === 'customer'
                && listUser[i].password === password) {
                localStorage.setItem("userLogin", JSON.stringify(listUser[i]));
                navigate("/home")
                break;


            }



        }


        if (userName.length === 0) {
            flag = true;
            setErrorUserName("Tên đăng nhập bắt buộc phải nhập")
        }
        if (password.length === 0) {
            flag = true;
            setErrorPassword("Mật khẩu bắt buộc phải nhập")
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "userName") {
            setUserName(value)
            setErrorUserName("")
        } else if (name === "password") {
            setPassword(value)
            setErrorPassword("")

        }
    }

    return (
        <>   <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input onChange={(e) => handleChange(e)} type="text" name="userName" required="" />
                    <label>Username</label><br></br>
                    <span className="error">{errorUsername}</span><br></br><br></br>
                </div>

                <div className="user-box">
                    <input onChange={(e) => handleChange(e)}
                        type="password" name="password" required="" />
                    <label>Password</label><br></br>
                    <span className="error">{errorPassword}</span><br></br>
                </div>

                <button type="submit" >
                    <a >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        SUBMIT
                    </a></button>
                <a href="/register">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Register
                </a>

            </form>
        </div>
        </>
    );
};

export default CustomerLoginPage;
