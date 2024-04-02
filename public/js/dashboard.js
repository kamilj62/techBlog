// Event handler for submitting a new blog post
const newFormHandler = async (event) => {
  event.preventDefault();

  // Get input values from the form
  const name = document.querySelector("#blog-name").value;
  const title = document.querySelector("#blog-title").value;
  const blog = document.querySelector("#blog").value;

  // Check if all required fields are filled
  if (name && title && blog) {
    // Send a POST request to create a new blog post
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ name, title, blog }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the request is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog post");
    }
  }
};

// Event handler for submitting a new comment

// Event handler for deleting a blog post
const delButtonHandler = async (event) => {
  console.log(event);

  // Check if the delete button was clicked
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    // Send a DELETE request to delete the specified blog post
    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    // If the request is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete blog post");
    }
  }
};

// Add event listeners to the respective elements
document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".btn-delete")
  .addEventListener("click", delButtonHandler);
