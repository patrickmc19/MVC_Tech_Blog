async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value;
    const postContent = document.querySelector('textarea[name="postContent"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        postContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/profile');
    } else {
      alert(response.statusText);
    }
  }

document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);