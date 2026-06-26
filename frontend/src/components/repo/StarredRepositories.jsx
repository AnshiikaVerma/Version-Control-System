
import React, { useEffect, useState } from "react";
// import api from "api";
import api from "../../api/axios";
import Navbar from "../Navbar";

const StarredRepositories = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchStarredRepos();
  }, []);

  const fetchStarredRepos = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const userRes = await api.get(
        `http://localhost:3002/userProfile/${userId}`
      );

      const starredIds = userRes.data.starRepos || [];

      const repoPromises = starredIds.map((repoId) =>
        api.get(`http://localhost:3002/repo/${repoId}`)
      );

      const repoResponses = await Promise.all(repoPromises);

      const repoData = repoResponses.map((res) => res.data);

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
            <div key={repo._id}>
              <h3>{repo.name}</h3>

              <p>{repo.description}</p>

              <p>
                {repo.visibility ? "Public" : "Private"}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default StarredRepositories;