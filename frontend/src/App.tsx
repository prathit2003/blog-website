import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Post from './pages/post';
import Blogs from './pages/blogs';
import Trending from "./pages/trending";
import MyBlogs from './pages/my-blogs';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
