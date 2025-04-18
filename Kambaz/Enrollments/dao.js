import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllEnrollments() {
  const { enrollments } = Database;
  return enrollments;
}

export function setEnrollments(enrollments) {
  const { enrollments: dbEnrollments } = Database;
  Database.enrollments = [...dbEnrollments, ...enrollments];
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}
