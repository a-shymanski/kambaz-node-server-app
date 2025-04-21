import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as quizzesDao from "../Quizzes/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quizzes = quizzesDao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = quizzesDao.createQuiz(quiz);
    res.send(newQuiz);
  });

    // find all user enrollments
    app.get("/api/courses/enrollments", (req, res) => {
      const enrollments = enrollmentsDao.findAllEnrollments();
      res.send(enrollments);
    });
  
    // set all user enrollments
    app.post("/api/courses/enrollments", (req, res) => {
      const enrollments = req.body;
      enrollmentsDao.setEnrollments(enrollments);
      res.send(enrollments);
    });
    // enroll by userid and courseid
    app.post("/api/courses/:courseId/:userId/enrollments", (req, res) => {
      const { courseId, userId } = req.params;
      const status = enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.send(status);
    }
    );
    // unenroll by userid and courseid
    app.delete("/api/courses/:courseId/:userId/enrollments", (req, res) => {
      const { courseId, userId } = req.params;
      const status = enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.send(status);
    });
}