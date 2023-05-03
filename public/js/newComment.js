async function newCommentHandler(event) {
    event.preventDefault();
    const text = document.querySelector('textarea[name="commentBody"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                text
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('#comment').addEventListener('click', newCommentHandler);

async function deleteFormHandler(event) {
    event.preventDefault();
    const id = this.getAttribute("data-id");
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

const deleteComment = document.querySelectorAll('.delete');

for (let i = 0; i < deleteComment.length; i++ ) {
    deleteComment[i].addEventListener('click', deleteFormHandler);
}