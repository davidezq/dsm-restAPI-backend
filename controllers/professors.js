const { request, response } = require("express");
const Professor = require("../models/professor");

const getProfessors = async (req = request, res = response) => {
  const [total, professors] = await Promise.all([
    Professor.count(),
    Professor.find({}),
  ]);

  res.status(200).json({
    total,
    professors,
  });
};

const getProfessorById = async (req = request, res = response) => {
  const { id } = req.params;

  const professor = await Professor.findById(id);

  res.status(200).json({
    professor,
  });
};

const postProfessors = async (req = request, res = response) => {
  const { name, lastName, age } = req.body;

  const professorDB = await Professor.findOne({
    $and: [{ name }, { lastName }],
  });

  if (professorDB) {
    return res.status(400).json({
      errors: [
        {
          msg: "The professor already exist!",
        },
      ],
    });
  }

  const data = { name, lastName, age };

  const professor = new Professor(data);
  await professor.save();

  res.status(200).json({
    professor,
  });
};

const putProfessorById = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, lastName, age } = req.body;

  try {
    const professor = await Professor.findByIdAndUpdate(
      id,
      {
        name,
        lastName,
        age,
      },
      { new: true },
    );
    res.status(200).json({ professor });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      errors: [
        {
          msg: `Error to update the professor, contact to support`,
        },
      ],
    });
  }
};

const deleteProfessorById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Professor.findByIdAndDelete(id);

    res.status(204);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      errors: [
        {
          msg: `Error to delete the professor, contact to support`,
        },
      ],
    });
  }
  res.json("delete professors");
};

module.exports = {
  getProfessors,
  getProfessorById,
  postProfessors,
  putProfessorById,
  deleteProfessorById,
};
