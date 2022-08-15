import React, {useState} from "react";
import "./WritePostPage.css"
import axios from "axios"
import MainHead from "../MainHead"

function WritePost(){
    const [inputTitle, setInputTitle] = useState('')
    const [inputDescription, setInputDescription] = useState('')

    const handleInputTitle = (e) => {
        setInputTitle(e.target.value)
    }

    const handleInputDescription = (e) => {
        setInputDescription(e.target.value)
    }

    const submitWrite = () => {
        axios({
            url: "http://localhost:5000/writePostEvent",
            params: {
                title: inputTitle,
                description: inputDescription,
                userId: sessionStorage.getItem("userId")
            },
            method: "post",
        })
        .then( res => {
            if(res.data.postResult == "1"){
                window.location.href = "/"
            }
            else{
                console.log(res.data)
                alert("글 작성을 실패하였습니다.")
            }
        })
    }

    return(
        <div class="WritePost">
            <MainHead/>
            
            <div class="WritePost_body">
                <input id="input_title" type="text" onInput={handleInputTitle} placeholder="제목을 입력하세요." size="80"></input><br/><br/>
                <textarea id="input_description" onInput={handleInputDescription} placeholder="내용을 입력하세요." rows="40" cols="82"></textarea><br/><br/>
            </div>
            <div class="WritePost_body">
                <button id="but_submit" onClick={submitWrite}>완료</button>
            </div>
        </div>
    )
}

export default WritePost