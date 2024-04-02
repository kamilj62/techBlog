const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#blog-name").value.trim();
  const blog_title = document.querySelector("#blog-title").value.trim();
  const blog = document.querySelector("#blog").value.trim();

  if (name && blog_title && blog) {
    const response = await fetch(`/api/blog`, {
      method: "POST",
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create project");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete blog");
    }
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".blog-list")
  .addEventListener("click", delButtonHandler);
