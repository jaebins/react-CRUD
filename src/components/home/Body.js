import React, {useState, useEffect} from "react"
import $ from "jquery"
import axios from "axios";

import LoginComponent from "./LoginComponet"
import Posts from "./Posts"

function Body(){
    const [isLogin, setIsLogin] = useState(false)
    const [results, setResults] = useState([])

    useEffect(() => {
        if(sessionStorage.getItem("userId")){
            setIsLogin(true)
        }

        axios({
            method: 'post',
            url: "http://localhost:5000/getPosts"
        }).then(res => {
            setResults(res.data)
        })
    }, [])

    return(
        <div class="body">
            {isLogin ? 
                <Posts items={results}></Posts>
                :
                <LoginComponent></LoginComponent>
            }
        </div>
    )
}

export default Body;