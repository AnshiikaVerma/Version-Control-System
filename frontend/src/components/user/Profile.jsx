import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon,RepoIcon } from "@primer/octicons-react";
import HeatMap from "./HeatMap";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile=()=>{
  const {setCurrentUser}=useAuth();
const navigate=useNavigate();
const [userDetails,setUserdetails]=useState({
    name:"username"
});
//use effect so that when profile page renders backend se data fetch ho jae
useEffect(()=>{
const fetchUserDetails=async()=>{
    const userId=localStorage.getItem("userId");
    if(userId){ //if user id not avialable then nsvigate to login ->login in projectRouter
   try{
  const response=await axios.get(`http://localhost:3002/userProfile/${userId}`);
  setUserdetails(response.data);
   }catch(err){
console.error("Cannot fetch user details : ",err);
   }} 
};
fetchUserDetails();
},[]);

return (
    <>
    <Navbar/>
    
    <UnderlineNav aria-label="Repository" >
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <button className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/auth";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
      
          <div
  className="profile-image"
  style={{
    backgroundImage: `url(${
      userDetails.avatar ||
 "https://avatars.githubusercontent.com/u/49699333?v=4"
    })`,
  }}
></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile/>
        </div>
      </div>
    </>
)
}
// const Profile=()=>{

// const [starredRepos,setStarredRepos]=useState([]);

// useEffect(()=>{

//     const fetchProfile=async()=>{

//         const userId=localStorage.getItem("userId");

//         const res=await axios.get(
//             `http://localhost:3002/user/userProfile/${userId}`
//         );

//         setStarredRepos(
//             res.data.starRepos || []
//         );
//     }

//     fetchProfile();

// },[]);

// return(
// <div>

// <h2>Starred Repositories</h2>

// <ul>
// {
// starredRepos.map((repoId,index)=>(
// <li key={index}>
// {repoId}
// </li>
// ))
// }
// </ul>

// </div>
// )

// }

export default Profile;