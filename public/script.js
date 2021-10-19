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
        $('#subject-choices').html('')
        $('#subject-choices').prepend(`
            <p onClick="getAnswer(event)">${result[0].question}</p>
        `)

        
        // for (var i=0; i<result.length; i++) {
            
        //     console.log("in loop", event, result[i])
        //     // $('#subject-choices').html('')
        //     // $('#subject-choices').prepend(`<p>${result[i].answer}</p>`)
        // }
    })
    // console.log("results----------", results)
}

function getAnswer(event) {
    event = event.target.textContent

    console.log("Getting answer", event)
    $('#subject-choices').html('') 
    for (var i=0; i<results.length; i++) {
        if (event === results[i].question) {

            $('#subject-choices').prepend(`
                <p onClick="nextQuestion(event)">${results[i].answer}</p>
            `)
        }
    }

}  

function nextQuestion(event) {
    event = event.target.textContent

    console.log("getting next question", event)
    $('#subject-choices').html('')
    for (var i=0; i<results.length; i++) {

        if (event === results[i].answer && results[i+1].answer) {
            $('#subject-choices').prepend(`
                <p onClick="getAnswer(event)">${results[i+1].question}</p>
            `)
        } else {
            
        }

    }
}

function goToMenu() {
    window.location.href = '/'
}


$('#post-btn').on('click', newQuestion);
