const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#comment").value.trim();
  const blog_id = document.querySelector("#blog-id").value.trim();

  // Send a POST request to create a new comment
  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ comment_text, blog_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // If the request is successful, redirect to the comment page
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

const updateHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const blog = document.querySelector("#blog").value.trim();

  // Send a PUT request to Upadate a blog
  const response = await fetch("/api/blogs", {
    method: "PUT",
    body: JSON.stringify({ comment_text, blog_id, date_created, user_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // If the request is successful, redirect to the comment page
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);

document.querySelector("#btn-update").addEventListener("submit", updateHandler);
