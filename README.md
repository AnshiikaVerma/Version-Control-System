# Version Control System

>A full-stack Git-inspired Version Control System built from scratch using the MERN stack, featuring a custom CLI for repository initialization, staging, committing, pushing and pulling files using AWS S3 as cloud storage.

![License](https://img.shields.io/badge/Status-Completed-success)
![Node](https://img.shields.io/badge/Node.js-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![AWS](https://img.shields.io/badge/AWS-S3%20%7C%20EC2%20%7C%20Amplify-orange)

> Built to understand how Git works internally by implementing a custom Version Control System with its own CLI and cloud-based commit storage.
---

# 🌐 Live Demo

### Frontend
https://main.d26746428ekhx8.amplifyapp.com

### Backend
> Hosted on AWS EC2 (Instance is currently stopped to avoid AWS charges.)

---

# 📖 About The Project

This is a Git-inspired Version Control System developed from scratch.

Instead of using Git internally, this project implements its own repository management, commit storage and push/pull workflow.

The web application allows users to create repositories, manage issues, view commit history and interact with repositories, while the custom CLI performs operations like initialization, staging, committing, pushing and pulling.

All committed files are stored on AWS S3 and repository metadata is maintained in MongoDB.

---

# 🎬 Project Demo

## 📹 Full Project Walkthrough

> **Replace the image below with your GIF**

![PROJECT_DEMO_GIF](./assets/demo.gif)

---

# 📸 Screenshots

## Dashboard





---

## Repository Details

> Replace with screenshot

![Repository Details](./assets/repository-details.png)

---

## Commit History

> Replace with screenshot

![Commit History](./assets/commit-history.png)

---

## Profile

> Replace with screenshot

![Profile](./assets/profile.png)

---

# ✨ Features

## Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes

---

## Repository Management

- Create Repository
- Update Repository (Owner Only)
- Delete Repository (Owner Only)
- Repository Details Page
- Copy Repository ID
- Star Repository
- Unstar Repository

---

## Commit System

Custom CLI supports:

```bash
node index.js init <repoId>
```

Creates a local `.myGit` folder connected to a repository.

```bash
node index.js add <filename>
```

Stages a file.

```bash
node index.js commit "Commit Message"
```

Creates a new commit.

```bash
node index.js push
```

Uploads commit data to AWS S3.

```bash
node index.js pull
```

Downloads repository commits from AWS S3.

---

## Commit Storage

Each commit is stored in AWS S3 using the following structure.

```
repositories/
    repoId/
        commits/
            commitId/
                commit.json
                committed-files...
```

Each commit stores

- Commit ID
- Commit Message
- Commit Timestamp
- Committed Files

---

## Commit History

Repository Details page displays

- Commit ID
- Commit Message
- Commit Date
- Commit Time

Users can also view the files included inside every commit.

---

## Issue Management

Any logged-in user can

- Create Issues

Repository Owner can

- Change Issue Status
- Delete Issues

---

## Profile

- User Information
- Contribution Heatmap
- Repository Overview

---

# 🏗️ Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS
- Primer React
- uiw/react-heat-map

---

## Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Multer

---

## Cloud

- AWS S3
- AWS EC2
- AWS Amplify

---

# 📂 Project Architecture

> Replace this image with architecture diagram.

![Architecture](./assets/architecture.png)

---

# ⚙️ Installation

Clone the project

```bash
git clone <repository-url>
```

Frontend

```bash
cd frontend
npm install
npm start
```

Backend

```bash
cd backend
npm install
npm run dev
```

CLI

```bash
node index.js init <repoId>

node index.js add file.txt

node index.js commit "Initial Commit"

node index.js push

node index.js pull
```

---

# 📦 AWS Deployment

Frontend

- AWS Amplify

Backend

- AWS EC2

Commit Storage

- AWS S3

---

# 📁 Folder Structure

```
project
│
├── frontend
│
├── backend
│
├── CLI
│      ├── commands
│      ├── config
│      ├── utils
│      └── index.js
│
└── README.md
```

---

# 🚀 Future Improvements

- Branch Support
- Repository Clone
- Commit File Preview
- Repository Permission Validation
- Merge Support
- Conflict Resolution

---

# ⚠️ Current Limitations

- Repository ID ownership is not validated during CLI operations.
- Anyone having a valid Repository ID can currently push commits.
- Branching is not implemented.
- Clone functionality is not implemented.
- Committed files are listed in UI but cannot yet be opened for preview.

---

# 👩‍💻 Developed By

**Anshika Verma**

Full Stack Developer

LinkedIn: **(Add your LinkedIn URL)**

GitHub: **(Add your GitHub URL)**

---
