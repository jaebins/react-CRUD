import Home from './components/home/Home'
import WritePost from './components/writePost/WritePost'
import Post from "./components/post/Post"

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

          <Route path="/writePost" element={
            <WritePost/>
          }>
          </Route>
          
          <Route path='/post' element={
            <Post/>
          }></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
