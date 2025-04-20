import * as questionsDao from "./dao.js";
import * as usersDao from "../Users/dao.js"

export default function QuestionsRoutes(app) {
    app.put("/api/questions/:quesId", async (req, res) => {
        const { quesId } = req.params;
        const quesUpdates = req.body;
        const users = usersDao.findAllUsers();
        const status = (await users).forEach((user) => questionsDao.updateQuestion(quesId, user._id, quesUpdates));
        res.send(status);
    });

    app.delete("/api/questions/:quesId", async (req, res) => {
        const { quesId } = req.params;
        const status = await questionsDao.deleteQuestion(quesId);
        res.send(status);
    });
    
    app.get("/api/quizzes/:qid/questions", async (req, res) => {
        const { qid } = req.params;
        const questions = await questionsDao.findQuestionsForQuiz(qid);
        res.send(questions);
    });
}

