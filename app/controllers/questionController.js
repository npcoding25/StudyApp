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
    },
    getSubjects: async function(subject) {
        console.log('questionController----getSubjects()', subject)
        let results = await db.Question.aggregate(
            [
                {$match: {} },
                {$group: { _id: "$subject" } }
            ]
        );
        console.log("results._id", results._id)
        
        
        console.log("results", results)
        return results
    },
    getQuestions: async function(subjectData) {
        console.log('questionController---- getQuestions()', subjectData)
        let results = await db.Question.find({subject: subjectData})
        console.log("results=======================", results)
        return results
    }
}