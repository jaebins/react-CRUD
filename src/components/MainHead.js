import { useEffect, useState } from "react"
import "./MainHead.css"

function MainHead(){
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem("userId")){
            setIsLogin(true);
        }  
    }, [])

    const pageMove = (tar) => {
        window.location.href = "http://localhost:3000/" + tar
    }

    const Logout = () => {
        sessionStorage.removeItem("userId")
        window.location.href = "http://localhost:3000/"
    }

    return(
        <div class="head">
            <div class="head_loginArea">
                {isLogin 
                ?
                    <button id="head_loginArea_but" onClick={() => Logout()}>로그아웃</button>
                :
                    <div>
                        <button id="head_loginArea_but" onClick={() => pageMove("login")}>로그인</button>
                        <button id="head_loginArea_but" onClick={() => pageMove("register")}>회원가입</button>
                    </div>
                }
            </div>

            <div class="head_titleArea">
                <a href="/" id="head_titleAarea_titleText">JaebsSite</a>
            </div>
        </div>
    )
}

export default MainHead;