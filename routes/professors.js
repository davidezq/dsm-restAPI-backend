const { Router } = require("express");
const { check, param } = require("express-validator");

const {
  getProfessors,
  getProfessorById,
  postProfessors,
  putProfessorById,
  deleteProfessorById,
} = require("../controllers/professors");

const lowerCaseValues = require("../middlewares/lowerCase");
const { checkValidator } = require("../middlewares/checkValidator");
const router = Router();

router.get("/", getProfessors);

router.get("/:id", [
  // id validations
  check("id", "id is not valid").isMongoId(),

  checkValidator,
], getProfessorById);

router.post("/", [
  lowerCaseValues,

  // name validations
  check("name", "name is required").notEmpty(),

  // lastName validations
  check("lastName", "lastName is required").notEmpty(),

  // age validations
  check("age", "age is required").notEmpty(),
  check("age", "age must be greater or equal than 15").isFloat({ min: 15 }),

  checkValidator,
], postProfessors);

router.put("/:id", [
  lowerCaseValues,
  
  // id validations
  param("id", "id is not valid").isMongoId(),

  checkValidator,
], putProfessorById);

router.delete("/:id", [
  // id validations
  check("id", "id is not valid").isMongoId(),
  checkValidator,
], deleteProfessorById);

module.exports = router;
