
import Home from "./User/components/Home/Home";
import Movies from "./User/components/Movies/Movies"
import TVSeries from "./User/components/TVSeries/TVSeries";
import Watch from "./User/components/WatchMovie/Watch"
import Search from "./User/components/Search/Search"
import Login from "./User/components/LoginRegister/Login";
import Register from "./User/components/LoginRegister/Register";
import UserFavourite from "./User/components/UserManagement/UserFavourite";
import UserProfile from "./User/components/UserManagement/UserProfile";
import AdminHome from "./Admin/components/AdminHome/AdminHome";
import AddMovie from "./Admin/components/AddMovie/AddMovie";
import AddEspisode from "./Admin/components/AddEspisode/AddEspisode";
import ManageMovie from "./Admin/components/ManageMovie/ManageMovie";
import ManageUser from "./Admin/components/ManageUser/ManageUser";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Nav from "./User/components/Nav/Nav";
import "./App.scss"

function App() {
  return (
    <>
        <BrowserRouter>
          <Nav></Nav>
          <div>
            <Routes>
              <Route path='/Home' element={<Home />}></Route>
              <Route path='/Watch' element={<Watch />}></Route>
              <Route path='/Movies' element={<Movies />}></Route>
              <Route path='/TvSeries' element={<TVSeries />}></Route>
              <Route path='/Search' element={<Search />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="/User/Profile" element={<UserProfile />}></Route>
              <Route path="/User/Favourite" element={<UserFavourite />}></Route>
              <Route path="/Admin" element={<AdminHome />}></Route>
              <Route path="/Admin/AddMovie" element={<AddMovie />}></Route>
              <Route path="/Admin/AddEspisode" element={<AddEspisode />}></Route>
              <Route path="/Admin/ManageMovie" element={<ManageMovie />}></Route>
              <Route path="/Admin/ManageUser" element={<ManageUser />}></Route>
            </Routes>
          </div>
          
        </BrowserRouter>
    </>
  );
}

export default App;