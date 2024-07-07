const express = require("express");
const {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent
} = require("./handlers/students");

const app = express();
app.use(express.json());

app.get("/students", getStudents);
app.post("/students", createStudent);
app.put("/students/:index", updateStudent); // added put method
app.delete("/students/:index", deleteStudent);

app.listen(3000, () => console.log("Server running at port 3000!"));