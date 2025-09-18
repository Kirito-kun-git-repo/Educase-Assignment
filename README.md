# 🏫 School API

A simple REST API built with **Node.js**, **Express**, **Sequelize**, and **MySQL** to manage schools and list them based on proximity (latitude/longitude).  

---

## 🚀 Features
- Add a new school with validation
- List all schools sorted by distance from a given location
- MySQL + Sequelize ORM integration
- Dockerized setup for easy development and deployment
- Request logging with Winston

---


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/school-api.git
```



## API Endpoints
➕ Add School

POST /addSchool
```json
Request body:

{
  "name": "Oxford Public School",
  "latitude": 28.7041,
  "longitude": 77.1025
}


Response:

{
  "message": "School added successfully",
  "school": {
    "id": 1,
    "name": "Oxford Public School",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

📍 List Schools by Proximity

GET /listSchools?latitude=28.7041&longitude=77.1025


```json
Response:

[
  {
    "id": 1,
    "name": "Oxford Public School",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 0
  },
  {
    "id": 2,
    "name": "Delhi Public School",
    "latitude": 28.5355,
    "longitude": 77.3910,
    "distance": 40.2
  }
]
```



























