const questionController = require("../controllers/questionController")

function router(app) {
    app.post("/api/question", async function (req, res) {
        console.log(`[posting]....................`, req.body);
        const data = await questionController.createQuestion(req.body);
        res.send(data);
      });

}

module.exports = router;