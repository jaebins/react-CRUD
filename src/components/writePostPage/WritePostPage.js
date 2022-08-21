import React, {useState} from "react";
import "./WritePostPage.css"
import axios from "axios"
import $ from "jquery";
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

    var getFile = () => {
        var fileInput = $("#input_image").get(0);
        return fileInput.files[0];
    }

    const submitWrite = () => {
        if(inputTitle.length > 0 && inputDescription.length > 0){
            var file = getFile()
            var fileName = "NULL"
            if(file != undefined){
                console.log("파일 업로드 모드")
    
                var formData = new FormData()
                
                formData.append('image', file)
                $.ajax({
                    type: "POST",
                    url: "http://localhost:5000/writePostEvent_receiveFile",
                    data: formData,
                    processData: false,
                    contentType: false,
                    cache: false,
                    success:(data) => {
                        console.log(data)
                        fileName = data;
                    }, 
                    error:(data) => {
                        console.log("실패 : " + data.responseText)
                    }
                })
            }

            setTimeout(() => {
                axios({
                    url: "http://localhost:5000/writePostEvent",
                    params: {
                        title: inputTitle,
                        description: inputDescription,
                        userId: sessionStorage.getItem("userId"),
                        imageName: fileName,
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
            }, 500)
        }
        else{
            window.alert("제목이나 내용에 공백이 존재합니다.")
        }

    }

    return(
        <div class="WritePost">
            <MainHead/>
            
            <div class="WritePost_body">
                <input id="input_title" type="text" onInput={handleInputTitle} placeholder="제목을 입력하세요." size="80"></input><br/><br/>
                <textarea id="input_description" onInput={handleInputDescription} placeholder="내용을 입력하세요." rows="40" cols="82"></textarea><br/><br/>
                <input id="input_image" type="file" accept=".jpg, .png, .gif"></input>
            </div>
            <div class="WritePost_body">
                <button id="but_submit" onClick={submitWrite}>완료</button>
            </div>
        </div>
    )
}

export default WritePost