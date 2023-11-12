
import Home from "./User/components/Home/Home";
import Movies from "./User/components/Movies/Movies"
import TVSeries from "./User/components/TVSeries/TVSeries";
import Watch from "./User/components/WatchMovie/Watch"
import Search from "./User/components/Search/Search"
import Login from "./User/components/LoginRegister/Login";
import Register from "./User/components/LoginRegister/Register";
import ForgotPassWord from "./User/components/LoginRegister/ForgotPassword";
import UserFavourite from "./User/components/UserManagement/UserFavourite";
import UserProfile from "./User/components/UserManagement/UserProfile";
import AdminHome from "./Admin/components/AdminHome/AdminHome";
import AddMovie from "./Admin/components/AddMovie/AddMovie";
import AddEspisode from "./Admin/components/AddEspisode/AddEspisode";
import ManageMovie from "./Admin/components/ManageMovie/ManageMovie";
import ManageUser from "./Admin/components/ManageUser/ManageUser";
import AdminProfile from "./Admin/components/AdminProfile/AdminProfile";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Nav from "./User/components/Nav/Nav";
import "./App.scss"

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
            <Route path="/Login" exact element={<Login />}></Route>
            <Route path="/Register" exact element={<Register />}></Route>
            <Route path="/ForgotPassword" exact element={<ForgotPassWord />}></Route>
        </Routes>

        <div>
          <Nav></Nav>
            <Routes>
              <Route path='/Home' exact element={<Home />}></Route>
              <Route path='/Watch' exact element={<Watch />}></Route>
              <Route path='/Movies' exact element={<Movies />}></Route>
              <Route path='/TvSeries' exact element={<TVSeries />}></Route>
              <Route path='/Search' exact element={<Search />}></Route>   
              <Route path="/User/Profile" exact element={<UserProfile />}></Route>
              <Route path="/User/Favourite" exact element={<UserFavourite />}></Route>
              <Route path="/Admin" exact element={<AdminHome />}></Route>
              <Route path="/Admin/AddMovie" exact element={<AddMovie />}></Route>
              <Route path="/Admin/AddEspisode" exact element={<AddEspisode />}></Route>
              <Route path="/Admin/ManageMovie" exact element={<ManageMovie />}></Route>
              <Route path="/Admin/ManageUser" exact element={<ManageUser />}></Route>
              <Route path="/Admin/Profile" exact element={<AdminProfile />}></Route>
            </Routes>
        </div>          
      </BrowserRouter>
    </>
  );
}

export default App;