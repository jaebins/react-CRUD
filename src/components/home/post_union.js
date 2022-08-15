import axios from "axios";
import React, {useState, useEffect} from "react";

function Posts(){
    const [items, setItems] = useState('')
    const [isLogin, setisLogin] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem("userId")){
            setisLogin(true)
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/getPosts'
        }).then((res) => {
            setItems(res.data)
            console.log(res.data)
        })
    }, [])

    const pageMove = (tar) => {
        window.location.href = "http://localhost:3000/" + tar
    }

    return(
        <div class="posts">
            <div class="body_posts_body">
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>이름</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.length > 0 
                            ?
                                items.map((week, index) => (
                                    <tr key={items[index].ID}>
                                        <td id="home_body_posts_ID">{items[index].ID}</td>
                                        <td id="home_body_posts_title" onClick={() => pageMove("post?ID=" + items[index].ID)}>{items[index].title}</td>
                                        <td id="home_body_posts_userId">{items[index].userId}</td>
                                        <td id="home_body_posts_date">{items[index].date}</td>
                                    </tr>
                                ))
                            :
                                <h2>불러오는중</h2>
                        }
                    </tbody>
                </table>
            </div>
            <div class="home_body_posts_foot">
                {isLogin
                ?
                <button onClick={() => pageMove("writePostPage")}>글쓰기</button>
                :
                <div></div>
                }
            </div>
        </div>
    )
}

export default Posts