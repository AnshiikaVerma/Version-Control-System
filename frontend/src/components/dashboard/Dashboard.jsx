import React,{useState,useEffect} from 'react';
import axios from "axios";


const Dashboard=()=>{
const [repositories,setRepositories]=useState([]);
const [searchQuery,setSearchQuery]=useState("");
const[suggestedRepositories,setSuggestedRepositories]=useState([]); //all public repo from database will be fetch there
const [searchResults,setSearchResults]=useState([]);

useEffect(()=>{
const userId=localStorage.getItem("userId");
const fetchRepositories=async()=>{
    try{   //-----------can use fetch logic instead of using axios------------
        // const response=await fetch(`http://localhost:3002/repo/user/${userId}`);
        // const data= await response.json();
        // setRepositories(data.repositories);
const res=await axios.get(`http://localhost:3002/repo/user/${userId}`);
setRepositories(res.data.repositories);
    }catch(err){
        console.error("Error while fetching repositories: ",err)
    }
   
};
const fetchSuggestedRepositories=async()=>{
    try{ 
const res=await axios.get("http://localhost:3002/repo/all");
setSuggestedRepositories(res.data);

    }catch(err){
        console.error("Error while fetching repositories: ",err)
    }
   
};
fetchRepositories();
fetchSuggestedRepositories();
},[]);

return <h1>DashBoard</h1>
}

export default Dashboard;