import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

const RepositoryDetails = () => {
  const { id } = useParams();

  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/repo/${id}`
        );

        setRepo(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepo();
  }, [id]);

  if (!repo) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="repo-details">
        <h1>{repo.name}</h1>

        <p>{repo.description}</p>

        <h3>
          Visibility :
          {" "}
          {repo.visibility ? "Public" : "Private"}
        </h3>

        <h3>
          Owner :
          {" "}
          {repo.owner?.username}
        </h3>

        <h3>
          Issues :
          {" "}
          {repo.issues?.length || 0}
        </h3>
      </div>
    </>
  );
};

export default RepositoryDetails;