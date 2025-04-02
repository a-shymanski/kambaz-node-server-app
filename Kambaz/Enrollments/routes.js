import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send(status);
  });

  app.delete("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  });
}
