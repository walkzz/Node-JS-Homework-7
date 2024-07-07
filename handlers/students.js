const { read, write } = require("../read-write");

// Create student
const createStudent = async (req, res) => {
  const students = await read();
  students.push(req.body);
  await write(students);
  res.status(201).send("Student created!");
};

// Update student -------------------------------------------->
const updateStudent = async (req, res) => {
  const studentIndex = req.params.index;
  const studentData = req.body;

  let students = await read();
  students = students.map((student, index) => {
    if (index === Number(studentIndex)) {
      return {
        ...student,
        ...studentData,
      };
    } else {
      return student;
    }
  });

  await write(students);
  res.status(200).send("Student updated!");
};

// Read students
const getStudents = async (req, res) => {
  const data = await read();
  res.status(200).send(data);
};

// Delete student
const deleteStudent = async (req, res) => {
  const studentIndex = req.params.index;

  let students = await read();
  students = students.filter(
    (student, index) => index !== Number(studentIndex)
  );

  await write(students);
  res.status(200).send("Student deleted!");
};

module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
};