import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const courses = dao.findAllEnrollments();
        res.send(courses);
    });
  // unenroll by userid and courseid
    app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.unenrollUserFromCourse(userId, courseId);
        res.send(status);
    }
    );
    // enroll by userid and courseid
    app.post("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.enrollUserInCourse(userId, courseId);
        res.send(status);
    });

    // set enrollments
    app.post("/api/enrollments", (req, res) => {
        const enrollments = req.body;
        dao.setEnrollments(enrollments);
        res.send(enrollments);
    });
}
