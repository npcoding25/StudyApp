let results = []

function newQuestion() {
    console.log('New Question')
    const inputSubject = $('#subject').val().toUpperCase()
    const inputQuestion = $('#question').val()
    const inputAnswer = $('#answer').val()

    data = {
        subject: `${inputSubject}`,
        question: `${inputQuestion}`,
        answer: `${inputAnswer}`
    }
    console.log(data)
    $.post('/api/question', data, function (result) {
        window.location.href = '/'
    })
}

function showSubjects() {
    console.log('showSubjects()')

    $.get('/api/subject', function (result) {
        $('#subject-choices').html('')
        console.log("results", result)
        result.forEach(subject => {
            $('#subject-choices').prepend(`
                <button onClick="chooseSubject(event)" class="subject-button">${subject._id}</button>
            `)
            console.log("subject=", subject, " subject._id=", subject._id )
        })
    })
}

function chooseSubject(event) {
    event = event.target.textContent
    
    $.get('/api/question', event, function (result) {
    
        
        for (var i=0; i<result.length; i++) {
            results.push(result[i])
        }
        $('#study-card').html('')
        $('#study-card').prepend(`
            <button onClick="getAnswer(event)" class="flashcard">${result[0].question}</button>

        `)
    })
}

function getAnswer(event) {
    event = event.target.textContent

    console.log("Getting answer", event)
    $('#study-card').html('') 
    for (var i=0; i<results.length; i++) {
        if (event === results[i].question) {

            $('#study-card').prepend(`
                <button onClick="nextQuestion(event)" class="flashcard">${results[i].answer}</button>
            `)

            break
        }
        
    }

}  

function nextQuestion(event) {
    event = event.target.textContent

    $('#study-card').html('')
    for (var i=0; i<results.length; i++) {
        console.log(event, results)
        if (results.length === 1) {
        
            goToMenu()
        } else {

            $('#study-card').prepend(`
                <button onClick="getAnswer(event)" class="flashcard">${results[i+1].question}</button>
            `)
            results.splice(i, 1)
            break
        }
    }
}

function goToMenu() {
    window.location.href = '/'
}


$('#post-btn').on('click', newQuestion)