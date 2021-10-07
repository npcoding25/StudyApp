function newQuestion() {
    console.log('New Question')
    const inputSubject = $('#subject').val()
    const inputQuestion = $('#question').val()
    const inputAnswer = $('#answer').val()

    data = {
        subject: `${inputSubject}`,
        question: `${inputQuestion}`,
        answer: `${inputAnswer}`
    }
    console.log(data)
    $.post('/api/question', data, function (result) {
        window.location.href = '/';
    })
}


$('#post-btn').on('click', newQuestion);
