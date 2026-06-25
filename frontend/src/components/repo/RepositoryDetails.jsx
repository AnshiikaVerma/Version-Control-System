// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Navbar from "../Navbar";

// import { useNavigate } from "react-router-dom";




// const RepositoryDetails = () => {

  
// const navigate = useNavigate();

//   const { id } = useParams();

//   const [repo, setRepo] = useState(null);
//   //issue states
//   const [issues, setIssues] = useState([]);
// const [title, setTitle] = useState("");
// const [description, setDescription] = useState("");

// //delete update Repository
// const [editName,setEditName] = useState("");
// const [editDescription,setEditDescription] = useState("");
// const [editing,setEditing] = useState(false);

//   useEffect(() => {
//     const fetchRepo = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3002/repo/${id}`
//         );

//         setRepo(res.data);
        
//           //fetching issues too
//           const issueRes = await axios.get(
//       `http://localhost:3002/issue/all/${id}`
//     );

//     setIssues(issueRes.data);

//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchRepo();
// //     setEditName(repo.name);
// // setEditDescription(repo.description);
//   }, [id]);


//   const createIssue = async () => {
//   try {
//     await axios.post(
//       `http://localhost:3002/issue/create/${id}`,
//       {
//         title,
//         description,
//       }
//     );

//     const issueRes = await axios.get(
//       `http://localhost:3002/issue/all/${id}`
//     );

//     setIssues(issueRes.data);

//     setTitle("");
//     setDescription("");

//   } catch (err) {
//     console.error(err);
//   }
// };
// //update repo
// //   const updateRepository=async()=>{
// //     try{
   
// //     }catch(err){
// //         console.error(err);
// //     }
// //   };




// //update issue
// const toggleIssueStatus = async (issue) => {
//   try {

//     const newStatus =
//       issue.status === "open"
//         ? "closed"
//         : "open";

//     await axios.put(
//       `http://localhost:3002/issue/update/${issue._id}`,
//       {
//         title: issue.title,
//         description: issue.description,
//         status: newStatus,
//       }
//     );

//     const issueRes = await axios.get(
//       `http://localhost:3002/issue/all/${id}`
//     );

//     setIssues(issueRes.data);

//   } catch (err) {
//     console.error(err);
//   }
// };

// //delete issue

// const deleteIssue = async (issueId) => {
//   try {

//     await axios.delete(
//       `http://localhost:3002/issue/delete/${issueId}`
//     );

//     const issueRes = await axios.get(
//       `http://localhost:3002/issue/all/${id}`
//     );

//     setIssues(issueRes.data);

//   } catch (err) {
//     console.error(err);
//   }
// };

//   if (!repo) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="repo-details">
//         <h1>{repo.name}</h1>

//         <p>{repo.description}</p>

//         <h3>
//           Visibility :
//           {" "}
//           {repo.visibility ? "Public" : "Private"}
//         </h3>

//         <h3>
//           Owner :
//           {" "}
//           {repo.owner?.username}
//         </h3>

//         <h3>
//           Issues :
//           {" "}
//           {issues.length}
//         </h3>

//         <button
//   onClick={() => navigate(`/repo/edit/${repo._id}`)}
// >
//   Edit Repository
// </button>



//          <hr/>


//   <h2>Issues ({issues.length})</h2>
// {
//   issues.map((issue) => (
//     <div key={issue._id}>
//       <h4>{issue.title}</h4>

//       <p>{issue.description}</p>

//       <p>Status: 
//        <span
//     style={{
//       fontWeight: "bold",
//       marginLeft: "8px",
//       color:
//         issue.status === "open"
//           ? "green"
//           : "red",
//     }}  
//   >  {issue.status}</span>

//         </p>
//       <button
//   onClick={() => toggleIssueStatus(issue)}
// >
//   {issue.status === "open"
//     ? "Close Issue"
//     : "Reopen Issue"}
// </button>

// <button
//   onClick={() => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this issue?"
//       )
//     ) {
//       deleteIssue(issue._id);
//     }
//   }}
// >
//   Delete Issue
// </button>


//       <hr />
//     </div>
//   ))
// }

// <h2>Create Issue</h2>

// <input
//   type="text"
//   placeholder="Issue Title"
//   value={title}
//   onChange={(e) => setTitle(e.target.value)}
// />

// <br /><br />

// <textarea
//   placeholder="Issue Description"
//   value={description}
//   onChange={(e) => setDescription(e.target.value)}
// />

// <br /><br />

// <button onClick={createIssue}>
//   Create Issue
// </button>

//       </div>
//     </>
//   );
// };

// export default RepositoryDetails;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Navbar from "../Navbar";

// const RepositoryDetails = () => {
//   const { id } = useParams();

//   const [repo, setRepo] = useState(null);

//   useEffect(() => {
//     const fetchRepo = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3002/repo/${id}`
//         );

//         setRepo(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchRepo();
//   }, [id]);

//   if (!repo) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="repo-details">
//         <h1>{repo.name}</h1>

//         <p>{repo.description}</p>

//         <h3>
//           Visibility :
//           {" "}
//           {repo.visibility ? "Public" : "Private"}
//         </h3>

//         <h3>
//           Owner :
//           {" "}
//           {repo.owner?.username}
//         </h3>

//         <h3>
//           Issues :
//           {" "}
//           {repo.issues?.length || 0}
//         </h3>
//       </div>
//     </>
//   );
// };

// export default RepositoryDetails;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Navbar from "../Navbar";

// const RepositoryDetails = () => {
//   const { id } = useParams();

//   const [repo, setRepo] = useState(null);

//   useEffect(() => {
//     const fetchRepo = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3002/repo/${id}`
//         );

//         setRepo(res.data);

//        //fetching issues too
//           const issueRes = await axios.get(
//       `http://localhost:3002/issue/all/${id}`
//     );

//     setIssues(issueRes.data);



//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchRepo();
//   }, [id]);



//   const createIssue = async () => {
//   try {
//     await axios.post(
//       `http://localhost:3002/issue/create/${id}`,
//       {
//         title,
//         description,
//       }
//     );

//     const issueRes = await axios.get(
//       `http://localhost:3002/issue/all/${id}`
//     );

//     setIssues(issueRes.data);

//     setTitle("");
//     setDescription("");

//   } catch (err) {
//     console.error(err);
//   }
// };


//   if (!repo) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="repo-details">
//         <h1>{repo.name}</h1>

//         <p>{repo.description}</p>

//         <h3>
//           Visibility :
//           {" "}
//           {repo.visibility ? "Public" : "Private"}
//         </h3>

//         <h3>
//           Owner :
//           {" "}
//           {repo.owner?.username}
//         </h3>

//         <h3>
//           Issues :
//           {" "}
//             {issues.length}
//         </h3>
//    <hr/>

//   <h2>Issues ({issues.length})</h2>
// {
//   issues.map((issue) => (
//     <div key={issue._id}>
//       <h4>{issue.title}</h4>

//       <p>{issue.description}</p>

//       <p>Status: {issue.status}</p>

//       <hr />
//     </div>
//   ))
// }

// <h2>Create Issue</h2>

// <input
//   type="text"
//   placeholder="Issue Title"
//   value={title}
//   onChange={(e) => setTitle(e.target.value)}
// />

// <br /><br />

// <textarea
//   placeholder="Issue Description"
//   value={description}
//   onChange={(e) => setDescription(e.target.value)}
// />

// <br /><br />

// <button onClick={createIssue}>
//   Create Issue
// </button>



//       </div>
//     </>
//   );
// };

// export default RepositoryDetails;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

import { useNavigate } from "react-router-dom";


const RepositoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [repo, setRepo] = useState(null);

   //issue states
  const [issues, setIssues] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

//delete update Repository
const [editName,setEditName] = useState("");
const [editDescription,setEditDescription] = useState("");
const [editing,setEditing] = useState(false);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/repo/${id}`
        );

        setRepo(res.data);
       setEditName(res.data.name);
setEditDescription(res.data.description);

           //fetching issues too
          const issueRes = await axios.get(
      `http://localhost:3002/issue/all/${id}`
    );

    setIssues(issueRes.data);


      } catch (err) {
        console.error(err);
      }
    };

    fetchRepo();
  }, [id]);

  const createIssue = async () => {
  try {
    await axios.post(
      `http://localhost:3002/issue/create/${id}`,
      {
        title,
        description,
      }
    );

    const issueRes = await axios.get(
      `http://localhost:3002/issue/all/${id}`
    );

    setIssues(issueRes.data);

    setTitle("");
    setDescription("");

  } catch (err) {
    console.error(err);
  }
};

//curr add
const deleteRepository = async () => {
  try {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this repository?"
    );

    if (!confirmDelete) return;

    await axios.delete(
      `http://localhost:3002/repo/delete/${id}`
    );

    window.location.href = "/";

  } catch (err) {
    console.error(err);
  }
};

//star and unstar
const toggleIssueStatus = async (issue) => {
  try {

    const newStatus =
      issue.status === "open"
        ? "closed"
        : "open";

    await axios.put(
      `http://localhost:3002/issue/update/${issue._id}`,
      {
        title: issue.title,
        description: issue.description,
        status: newStatus,
      }
    );

    const issueRes = await axios.get(
      `http://localhost:3002/issue/all/${id}`
    );

    setIssues(issueRes.data);

  } catch (err) {
    console.error(err);
  }
};
//delete issue

const deleteIssue = async (issueId) => {
  try {

    await axios.delete(
      `http://localhost:3002/issue/delete/${issueId}`
    );

    const issueRes = await axios.get(
      `http://localhost:3002/issue/all/${id}`
    );

    setIssues(issueRes.data);

  } catch (err) {
    console.error(err);
  }
};

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
          {/* {repo.issues?.length || 0} */}
          {issues.length}
        </h3>
    <button
  onClick={() => navigate(`/repo/edit/${repo._id}`)}
>
  Edit Repository
</button>

<button onClick={deleteRepository}>
  Delete Repository
</button>
         <hr/>

  <h2>Issues ({issues.length})</h2>
{
  issues.map((issue) => (
    <div key={issue._id}>
      <h4>{issue.title}</h4>

      <p>{issue.description}</p>

      {/* <p>Status: {issue.status}</p> */}
       <p>Status: 
       <span
    style={{
      fontWeight: "bold",
      marginLeft: "8px",
      color:
        issue.status === "open"
          ? "green"
          : "red",
    }}  
  >  {issue.status}</span>

        </p>
 <button
  onClick={() => toggleIssueStatus(issue)}
>
  {issue.status === "open"
    ? "Close Issue"
    : "Reopen Issue"}
</button>

<button
  onClick={() => {
    if (
      window.confirm(
        "Are you sure you want to delete this issue?"
      )
    ) {
      deleteIssue(issue._id);
    }
  }}
>
  Delete Issue
</button>

      <hr />
    </div>
  ))
}

<h2>Create Issue</h2>

<input
  type="text"
  placeholder="Issue Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<br /><br />

<textarea
  placeholder="Issue Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

<br /><br />

<button onClick={createIssue}>
  Create Issue
</button>


      </div>
    </>
  );
};

export default RepositoryDetails;