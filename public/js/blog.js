const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#blog-name").value;
  const blog = document.querySelector("#blog").value;

  if (name && blog) {
    const response = await fetch("/api/blogs", {
      method: "PUT",
      body: JSON.stringify({ name, blog }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/comment");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#btn-update")
  .addEventListener("submit", newFormHandler);
