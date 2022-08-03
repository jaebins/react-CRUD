import React, {useState, useEffect} from "react";

function Posts({items}){
    const writePage = () => {
        window.location.href = "/writePost"
    }

    const postPage = (postId) => {
        window.location.href = "/post?ID=" + postId
    }

    return(
        <div class="posts">
            <div class="posts_body">
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((week, index) => (
                                <tr key={items[index].ID}>
                                    <td>{items[index].ID}</td>
                                    <td onClick={() => postPage(items[index].ID)}>{items[index].title}</td>
                                    <td>{items[index].date}</td>
                                    <td>{items[index].userId}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div class="posts_foot">
                <button id="posts_writePost" onClick={writePage}>글쓰기</button>
            </div>
        </div>
    )
}

export default Posts