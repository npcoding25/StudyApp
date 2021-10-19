const questionController = require("../controllers/questionController")

function router(app) {
    app.post("/api/question", async function (req, res) {
        console.log(`[posting]....................`, req.body);
        const data = await questionController.createQuestion(req.body);
        res.send(data);
    });
    app.get("/api/subject", async function (req, res) {
        console.log('IN ROUTER')
        const data = await questionController.getSubjects()
        res.send(data)
    });
    app.get("/api/question", async function (req, res) {
        console.log("req=============================================", req._parsedUrl.query)
        // console.log("res", res)
        const data = await questionController.getQuestions(req._parsedUrl.query)
        res.send(data)
    })
}

module.exports = router;