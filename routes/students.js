const { Router } = require("express");
const { check, body, param } = require("express-validator");
const {
  deleteStudentById,
  getStudentById,
  getStudents,
  postStudent,
  putStudentById,
} = require("../controllers/students");
const { checkValidator } = require("../middlewares/checkValidator");
const lowerCaseValues = require("../middlewares/lowerCase");
const router = Router();

router.get("/", getStudents);

router.get("/:id", [
  // id
  check("id").isMongoId(),
  checkValidator
], getStudentById);

router.post("/", [

  // lower case name and lastName
  lowerCaseValues,

  // name validations
  body("name", "name is required").not().isEmpty(),

  // lastName validations
  body("lastName", "lastName is required").notEmpty(),

  // age
  body("age", "age is required").notEmpty(),
  body("age", "age must be greater or equal than 15").isFloat({
    min: 15,
  }),

  checkValidator,
], postStudent);

router.put("/:id", [
  // id
  param("id", "id is not valid").isMongoId(),
  checkValidator,
], putStudentById);

router.delete("/:id",[
  
  // id
  check("id","id is not valid").isMongoId(),
  
  checkValidator
],deleteStudentById);

module.exports = router;
