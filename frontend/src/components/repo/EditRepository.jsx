import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditRepository = () => {
    const navigate = useNavigate();
    const { id } = useParams();
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [visibility, setVisibility] = useState(true);

useEffect(() => {

  const fetchRepo = async () => {

    try {

      const res = await axios.get(
        `http://localhost:3002/repo/${id}`
      );

      setName(res.data.name);
      setDescription(res.data.description);
      setVisibility(res.data.visibility);

    } catch (err) {
      console.error(err);
    }
  };

  fetchRepo();

}, [id]);

const updateRepository = async () => {
  try {

    await axios.put(
      `http://localhost:3002/repo/update/${id}`,
      {
        name,
        description,
        visibility
      }
    );

    alert("Repository Updated Successfully");

    navigate(`/repo/${id}`);

  } catch (err) {
    console.error(err);
    alert("Update Failed");
  }
};
  return (
  <div>

    <h1>Edit Repository</h1>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <br /><br />

    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <br /><br />

    <select
      value={visibility}
      onChange={(e) =>
        setVisibility(e.target.value === "true")
      }
    >
      <option value="true">Public</option>
      <option value="false">Private</option>
    </select>
<br /><br />

<button onClick={updateRepository}>
  Save Changes
</button>
  </div>
);
};

export default EditRepository;

