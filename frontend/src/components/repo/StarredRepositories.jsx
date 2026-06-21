import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const StarredRepositories = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchStarredRepos();
  }, []);

  const fetchStarredRepos = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const userRes = await axios.get(
        `http://localhost:3002/userProfile/${userId}`
      );

      const starredIds = userRes.data.starRepos || [];

      const repoPromises = starredIds.map((repoId) =>
        axios.get(`http://localhost:3002/repo/${repoId}`)
      );

      const repoResponses = await Promise.all(repoPromises);

    //   const repoData = repoResponses.map((res) => res.data);
    const repoData = repoResponses.map((res) => res.data[0]);

      setRepos(repoData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div>
        <h2>Starred Repositories</h2>

        {repos.length === 0 ? (
          <p>No starred repositories yet.</p>
        ) : (
         repos.map((repo) => (
    <div className="repo-card" key={repo._id}>
      <h3>{repo.name}</h3>

      <p>{repo.description}</p>

      <span>
        {repo.visibility ? "Public" : "Private"}
      </span>
    </div>
          ))
        )}
      </div>
    </>
  );
};

export default StarredRepositories;