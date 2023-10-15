console.log("Starting fetch request...");
document.getElementById('wiki-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var startPage = document.getElementById('start-page').value;
    var finishPage = document.getElementById('finish-page').value;

    var logsElement = document.getElementById('logs');
    logsElement.innerHTML = ''; // clear previous logs

    var eventSource = new EventSource('/logs');
    eventSource.onmessage = function(event) {
        logsElement.innerHTML += event.data + '\n';
    };

    console.log("Sending fetch request...");
    fetch('/find_path', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            start: startPage,
            finish: finishPage
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var pathElement = document.getElementById('path');
        pathElement.innerHTML = ''; // clear previous path
        var pathHtml = '<ul>';
        data.path.forEach(function(page) {
            pathHtml += '<li><a href="' + page + '">' + decodeURIComponent(page) + '</a></li>';
        });
        pathHtml += '</ul>';
        pathElement.innerHTML = pathHtml;

        eventSource.close();
    });
});
console.log("Finished fetch request...");
