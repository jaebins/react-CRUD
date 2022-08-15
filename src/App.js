import Home from './components/home/Home'
import Login from "./components/login/Login"
import Post from "./components/post/Post"
import WritePostPage from './components/writePostPage/WritePostPage'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <Home/> 
          }>
          </Route>

          <Route path="/login" element={
            <Login/>
          }></Route>

          <Route path='/post' element={
            <Post/>
          }></Route>

          <Route path="/writePostPage" element={
            <WritePostPage/>
          }></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
