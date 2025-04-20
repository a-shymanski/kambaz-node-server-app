import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllQuestions() {
    const { questions } = Database;
    return questions;
}

export function findQuestionsForQuizAndUser(quizId, userId) {
    const { questions } = Database;
    return questions.filter((question) => (question.quiz === quizId && question.user === userId));
}

export function findQuestionsForQuiz(quizId) {
    const { questions } = Database;
    return questions.filter((question) => question.quiz === quizId);
}

export function createQuestion(question, userId) {
    const newQuestion = { ...question, _id: uuidv4(), user: userId };
    Database.questions = [...Database.questions, newQuestion];
    return newQuestion;
}

export function deleteQuestion(questionId) {
    const { questions } = Database;
    Database.questions = questions.filter((question) => question._id !== questionId);
}

export function updateQuestion(questionId, userId, questionUpdates) {
    const { questions } = Database;
    const question = questions.find((question) => question._id === questionId && question.user === userId);
    if (question) {
        Object.assign(question, questionUpdates);
    }
    return question;
}
