import React,{useState,useEffect} from 'react';
import axios from "axios";
import "./dashboard.css";

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

useEffect(()=>{
if(searchQuery==''){
    setSearchResults(repositories); //sb kuch deikhana h
}else{
    const filteredRepos=repositories.filter((repo)=>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())  //if search qurey is the part of repo name
    );
    setSearchResults(filteredRepos);
}
},[repositories,searchQuery]);

return (
<section id="dashboard">
    <aside>
         <h3>Suggested Repositories </h3>
         {suggestedRepositories.map((repo)=>
            <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
            </div>
         )}
    </aside>
    <main>
<h3>Your Repositories </h3>
<div id="search"><input type="text" value={searchQuery} placeholder='Search Your Repositories' onChange={(e)=>setSearchQuery(e.target.value)} /></div>
         {searchResults.map((repo)=>
            <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
            </div>
         )}

    </main>
    <aside>
        <h3>Upcoming  Events</h3>
        <ul>
         <li><p>Tech Conference - Dec 15</p></li>
         <li><p>Developers Meetup - Dec 25</p></li>
         <li><p>React Summit - Jan 05</p></li>
        </ul>
    </aside>
</section>
)
}

export default Dashboard;