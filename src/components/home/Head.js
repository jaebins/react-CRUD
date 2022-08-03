import React, {useState, useEffect} from 'react'

function Head({login}){
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem("userId")){
            setIsLogin(true)
        }
    }, [])

    const logOut = () => {
        sessionStorage.removeItem("userId")
        document.location.href = "/"
    }

    return(
        <div className="Head">
            <div class="head">
                {isLogin ? <h1 onClick={logOut}>로그아웃</h1> : <h1>로그인</h1>}
            </div>
        </div>
    )
}

export default Head;