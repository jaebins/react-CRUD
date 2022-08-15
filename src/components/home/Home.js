import React from "react";
import "./Home.css"
import Post_Union from "./post_union"
import MainHead from "../MainHead"

function Home(){
    return(
        <div class="Home">
            <MainHead/>
            
            <div class="home_body">
                <Post_Union/>
            </div>
        </div>
    )
}

export default Home