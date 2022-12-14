import React, {useState, useEffect} from "react"
import axios from 'axios'
import MainHead from "../MainHead"
import "./Login.css"

function LoginComponent(){
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
    
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const login = () => {
        axios({
            method: "post",
            url: "http://localhost:5000/login",
            params: {
                'userId': inputId,
                'userPw': inputPw
            }
        })
        .then(res => {
            console.log(res.data.result)
            if(res.data.loginResult == "1"){
                sessionStorage.setItem('userId', inputId)
                document.location.href = "/"
            }
            else{
                alert("일치하지 않습니다.")
            }
        })
    }

    const register = () => {
        axios({
            method: "post",
            url: "http://localhost:5000/register",
            params: {
                'userId': inputId,
                'userPw': inputPw
            }
        })
        .then(res => {
            console.log(res.data.result)
            if(res.data.registerResult == "1"){
                sessionStorage.setItem('userId', inputId)
                document.location.href = "/"
            }
            else{
                alert("회원가입에 실패했습니다.\n\n(만약, 입력 칸에 아무것도 입력 안하셨다면 아이디와 비밀번호를 입력해주세요.)")
            }
        })
    }
    
    return(
        <div class="LoginComponent">
            <MainHead/>
            
            <div class="login_body">
                <input type="text" id="input_loginInfor" onChange={handleInputId} placeholder='아이디를 입력해주세요.'></input><p/>
                <input type="password" id="input_loginInfor" onChange={handleInputPw} placeholder='비밀번호를 입력해주세요.'></input><p/>
                <button id="login_body_loginBut" onClick={login}>로그인</button><p/><p/>
            </div>

        </div>
    )
}

export default LoginComponent;