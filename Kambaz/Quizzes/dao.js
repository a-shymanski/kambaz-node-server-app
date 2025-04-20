import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findQuizzesForCourse(courseId) {
  const { quizzes } = Database;
  return quizzes.filter((quiz) => quiz.course === courseId);
}
export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}

export function deleteQuiz(quizId) {
  const { quizzes } = Database;
  Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
}

export function updateQuiz(quizId, quizUpdates) {
  const { quizzes } = Database;
  const quiz = quizzes.find((quiz) => quiz._id === quizId);
  Object.assign(quiz, quizUpdates);
  return quiz;
}

export function getQuiz(quizId) {
  const { quizzes } = Database;
  return quizzes.filter((quiz) => quiz._id === quizId)[0];
}

export function saveQuiz(quizId, quizAnswers) {
  const {submissions} = Database;
  const newSubmission = {_id: uuidv4(), joe: "yuh", quizId: quizId, quizAnswers: quizAnswers};
  Database.submissions = [...submissions, newSubmission];
  return newSubmission;
}

export function getSubmissions(quizId) {
  const {submissions} = Database;
  return submissions.filter((submission) => submission.quizId === quizId)[0];
}
