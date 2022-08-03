import "./Post.css"
import React, {useEffect, useState} from "react";
import axios from "axios"

function Post(){
    const [result, setResult] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        var urlSearch = new URLSearchParams(window.location.search);
        var postId = urlSearch.get("ID");
        axios({
            method: "post",
            url: "http://localhost:5000/getPost",
            params: {
                ID: postId
            }
        }).then(res => {
            setResult(res.data[0])
        })
        
        if(sessionStorage.getItem("userId")){
            setUserId(sessionStorage.getItem("userId"))
        }
    }, [])

    const deletePost = () => {
        axios({
            method: "post",
            url: "http://localhost:5000/deletePost",
            params: {
                ID: result.ID
            }
        }).then(res => {
            if(res.data.deleteResult == "1"){
                window.location.href = "/"
            }
            else{
                alert("글 삭제를 실파해였습니다.")
                console.log(res.data)
            }
        })
    }

    return(
        <div class="Post">
            <div class="post_head">
                <a href="/"><h1>메인으로</h1></a>
            </div>
            <div class="post_body">
                <div id="title">{result.title}</div>
                <div class="postInfor">
                    <div id="userId">유저명 : {result.userId}</div>
                    <div id="date">{result.date}</div>
                </div>
                <div id="description">{result.description}</div>
            </div>
            <div class="post_foot">
                {userId == result.userId ? 
                    <button id="But_DeletePost" onClick={() => deletePost()}>삭제</button> :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Post