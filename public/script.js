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
                <button class="subject-button">${subject._id}</button>
            `)
            console.log("subject=", subject, " subject._id=", subject._id )
        })
    })
}

$('#title').on('click', showSubjects)
$('#post-btn').on('click', newQuestion);
