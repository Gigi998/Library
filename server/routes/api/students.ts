import express from "../../server";
const router = express.Router();
const {
  getAllStudents,
  addNewStudent,
  deleteStudent,
  getSingleStudent,
  addBookToStudent,
  removeBookFromStud,
  updateStudent,
} = require("../../controllers/studentsController");

router
  .route("/")
  .get(getAllStudents)
  .post(addNewStudent)
  .delete(deleteStudent)
  .patch(addBookToStudent);

router.route("/:id").get(getSingleStudent).patch(removeBookFromStud);

router.route("/:id/update").patch(updateStudent);

module.exports = router;
