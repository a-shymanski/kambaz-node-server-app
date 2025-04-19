import * as quizzesDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js";
import * as usersDao from "../Users/dao.js"

export default function QuizRoutes(app) {
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizzesDao.deleteQuiz(quizId);
        res.send(status);
    });

    app.get("/api/quizzes/:quizId/questions/:userId", async (req, res) => {
        const { quizId, userId } = req.params;
        const questions = questionsDao.findQuestionsForQuizAndUser(quizId, userId);
        res.send(questions);
    });

    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const question = {
            ...req.body,
            quiz: quizId,
        };
        const users = usersDao.findAllUsers();
        const newQuestion = (await users).forEach((user) => questionsDao.createQuestion(question, user._id));
        res.send(newQuestion);
    });
}

