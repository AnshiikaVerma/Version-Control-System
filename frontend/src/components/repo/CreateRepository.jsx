import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const CreateRepository = () => {
  const navigate = useNavigate();

  const [repoData, setRepoData] = useState({
    name: "",
    description: "",
    visibility: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRepoData({
      ...repoData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const owner = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost:3002/repo/create",
        {
          owner,
          name: repoData.name,
          description: repoData.description,
          visibility: repoData.visibility,
          content: [],
          issues: [],
        }
      );

      alert("Repository Created Successfully");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create repository");
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-repo-container">
        <h2>Create a New Repository</h2>

        <form onSubmit={handleSubmit}>
          <label>Repository Name</label>

          <input
            type="text"
            name="name"
            value={repoData.name}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            value={repoData.description}
            onChange={handleChange}
          />

          <label>Visibility</label>

          <select
            value={repoData.visibility}
            onChange={(e) =>
              setRepoData({
                ...repoData,
                visibility: e.target.value === "true",
              })
            }
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>

          <button type="submit">
            Create Repository
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRepository;