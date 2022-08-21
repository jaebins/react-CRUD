import "./Post.css"
import React, {useEffect, useState} from "react";
import axios from "axios"
import MainHead from "../MainHead"

function Post(){
    const [result, setResult] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        var urlSearch = new URLSearchParams(window.location.search);
        var postId = urlSearch.get("ID");

        axios({
            method: "post",
            url: "http://localhost:5000/getPost_sendFile",
            params: {
                ID: postId
            },
            responseType: "blob"
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            document.getElementById("post_body_image").src = url
        })

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
            <MainHead/>
            <div class="post_body">
                <div id="post_body_title">{result.title}</div>
                <div class="post_body_postInfor">
                    <div id="post_body_postInfor_userId">유저명 : {result.userId}</div>
                    <div id="post_body_postInfor_date">{result.date}</div>
                </div>
                <img id="post_body_image"></img>
                <div id="post_body_description">{result.description}</div>
            </div>
            <div class="post_foot">
                {userId == result.userId 
                ? 
                    <button id="post_foot_deleteBut" onClick={() => deletePost()}>삭제</button> 
                :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Post