const db = require("../models")

module.exports = {
    createQuestion: async function (postData) {
        console.log("questionController-----", postData.subject)
        const data = await db.Question.create({
            subject: postData.subject,
            question: postData.question,
            answer: postData.answer
        })
        console.log("[creating post] w/", data)
        return data
    }
}