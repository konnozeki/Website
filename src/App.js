
import Home from "./User/components/Home/Home";
import List from "./User/components/Home/List";
import Card from "./User/components/Home/Card";
import Actor from "./User/components/Actor/Actor"
import Movies from "./User/components/Movies/Movies"
// import TVSeries from "./User/components/TVSeries/TVSeries";
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
import MovieDetail from "./Admin/components/ManageMovie/MovieDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./User/components/Nav/Nav";
import "./App.scss"
import { Layout } from "antd";

function App() {
  //fetch du lieu
  return (
    <>
      <BrowserRouter>

        <div>
          <Nav></Nav>
          <Routes>
            <Route path="/Login" exact element={<Login />}></Route>
            <Route path="/Register" exact element={<Register />}></Route>
            <Route path="/ForgotPassword" exact element={<ForgotPassWord />}></Route>
            <Route path='/Home' exact element={<Home />}></Route>
            <Route path='/Watch/:slug' exact element={<Watch />}></Route>
            <Route path='/Movies' exact element={<Movies />}></Route>
            {/* <Route path='/TvSeries' exact element={<TVSeries />}></Route> */}
            <Route path='/Search' exact element={<Search />}></Route>
            <Route path="/Actor/:slug" exact element={<Actor />}></Route>
            <Route path="/User/Profile" exact element={<UserProfile />}></Route>
            <Route path="/User/Favourite" exact element={<UserFavourite />}></Route>
            <Route path="/Admin" exact element={<AdminHome />}></Route>
            <Route path="/Admin/AddMovie" exact element={<AddMovie />}></Route>
            <Route path="/Admin/AddEspisode" exact element={<AddEspisode />}></Route>
            <Route path="/Admin/ManageMovie" exact element={<ManageMovie />}></Route>
            <Route path="/Admin/ManageUser" exact element={<ManageUser />}></Route>
            <Route path="/Admin/Profile" exact element={<AdminProfile />}></Route>
            <Route path="/Admin/ManageMovie/Detail/:title" exact element={<MovieDetail />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

      <Layout>
        <Layout.Footer
          style={{
            textAlign: 'center',
            backgroundColor: "black",
            color: "white"
          }}
        >        <p>
            Your Movie Website ©{new Date().getFullYear()} Created with{' '}
            <span role="img" aria-label="heart">
              ❤️
            </span> by Your Name
          </p>
          <p style={{ color: "red", fontSize: 20 }}>
            Let's NetFLex and Chill!
          </p>
        </Layout.Footer>
      </Layout>

    </>
  );
}

export default App;
