import Home from "./User/components/Home/Home";
import Actor from "./User/components/Actor/Actor";
import Movies from "./User/components/Movies/Movies";
// import TVSeries from "./User/components/TVSeries/TVSeries";
import Watch from "./User/components/WatchMovie/Watch";
import Search from "./User/components/Search/Search";
import Login from "./User/components/LoginRegister/Login";
import Register from "./User/components/LoginRegister/Register";
// import ForgotPassWord from "./User/components/LoginRegister/ForgotPassword";
import UserFavourite from "./User/components/UserManagement/UserFavourite";
import UserProfile from "./User/components/UserManagement/UserProfile";
import AdminHome from "./Admin/components/AdminHome/AdminHome";
import AddMovie from "./Admin/components/ManageMovie/AddMovie";
// import AddEspisode from "./Admin/components/AddEspisode/AddEspisode";
import ManageMovie from "./Admin/components/ManageMovie/ManageMovie";
import ManageUser from "./Admin/components/ManageUser/ManageUser";
import ManageUserDetail from "./Admin/components/ManageUser/ManageUserDetail"
import AdminProfile from "./Admin/components/AdminProfile/AdminProfile";
import MovieDetail from "./Admin/components/ManageMovie/MovieDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./User/components/Nav/Nav";
import "./App.scss";
import { Layout } from "antd";
import PlaylistDetail from "./User/components/UserManagement/PlaylistDetail";
import History from "./User/components/UserManagement/History";
import ChangeMovie from "./Admin/components/ManageMovie/ChangeMovie";
import AddEpisode from "./Admin/components/ManageMovie/AddEpisode";
import ChangeEpisode from "./Admin/components/ManageMovie/ChangeEpisode";
import ManageActor from "./Admin/components/ManageActor/ManageActor";
import AddActor from "./Admin/components/ManageActor/AddActor";
import ChangeActor from "./Admin/components/ManageActor/ChangeActor";
import ManageCategory from "./Admin/components/ManageCategory/ManageCategory";

function App() {
  //fetch du lieu
  return (
    <>
      <BrowserRouter>
        <div>
          <Nav></Nav>
          <Routes>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" exact element={<Register />}></Route>
            <Route path="/home" exact element={<Home />}></Route>
            <Route path="/watch/:slug" exact element={<Watch />}></Route>
            <Route path="/movies" exact element={<Movies />}></Route>
            <Route path="/search" exact element={<Search />}></Route>
            <Route path="/actor/:slug" exact element={<Actor />}></Route>
            <Route path="/user/profile" exact element={<UserProfile />}></Route>
            <Route
              path="/user/playlist"
              exact
              element={<UserFavourite />}
            ></Route>
            <Route path="/admin/movie/:film_id/episodes/:episode_id" exact element={<ChangeEpisode />}></Route>
            <Route path="/admin" exact element={<AdminHome />}></Route>
            <Route path="/admin/movie/add" exact element={<AddMovie />}></Route>
            <Route
              path="/playlist/:slug"
              exact
              element={<PlaylistDetail />}
            ></Route>{" "}
            <Route path="/history" exact element={<History />}></Route>
            <Route path="/admin/movie" exact element={<ManageMovie />}></Route>
            <Route
              path="/admin/user"
              exact
              element={<ManageUser />}
            ></Route>
            <Route
              path="/admin/user/detail/:username"
              exact
              element={<ManageUserDetail />}
            ></Route>
            <Route
              path="/admin/profile"
              exact
              element={<AdminProfile />}
            ></Route>
            <Route
              path="/admin/movie/:id"
              exact
              element={<MovieDetail />}
            ></Route>
            <Route
              path="/admin/movie/:id/change"
              exact
              element={<ChangeMovie />}
            ></Route>
            <Route
              path="/admin/movie/:id/add_episode"
              exact
              element={<AddEpisode />}
            ></Route>
            <Route path="/admin/actor" exact element={<ManageActor />}></Route>
            <Route path="/admin/actor/add" exact element={<AddActor />}></Route>
            <Route path="/admin/actor/:actor_id" exact element={<ChangeActor />}></Route>
            <Route path="/admin/category" exact element={<ManageCategory />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

      <Layout>
        <Layout.Footer
          style={{
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            marginTop: "auto",
          }}
        >
          {" "}
          <p>
            Your Movie Website ©{new Date().getFullYear()} Created with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Your Name
          </p>
          <p style={{ color: "red", fontSize: 20 }}>Let's NetFLex and Chill!</p>
        </Layout.Footer>
      </Layout>
    </>
  );
}

export default App;
