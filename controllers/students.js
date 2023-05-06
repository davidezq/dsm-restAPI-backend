const Student = require("../models/student");

const getStudents = async (req, res) => {
  try {
    const [total, students] = await Promise.all([
      Student.countDocuments(),
      Student.find({}),
    ]);
    res.json(
      {
        total,
        results: students,
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          msg: `Error to list students, contact to support`,
        },
      ],
    });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;

  const student = await Student.findById(id);

  res.json(student);
};

const postStudent = async (req, res) => {
  try {
    const { name, lastName, age } = req.body;

    const studentDB = await Student.findOne({
      $and: [{ name }, { lastName }],
    });

    if (studentDB) {
      return res.status(400).json({
        errors: [
          {
            msg: "The student already exist!",
          },
        ],
      });
    }

    const studentToSave = { name, lastName, age };

    const student = new Student(studentToSave);

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      errors: [
        {
          msg: `Error to create a new student, contact to support`,
        },
      ],
    });
  }
};

const putStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, lastName, age } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      { name, lastName, age },
      { new: true },
    );

    res.status(201).json(student);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      errors: [
        {
          msg: `Error to create a new student, contact to support`,
        },
      ],
    });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndRemove(id);

    res.status(204).json();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      errors: [
        {
          msg: `Error to create a new student, contact to support`,
        },
      ],
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  postStudent,
  putStudentById,
  deleteStudentById,
};
