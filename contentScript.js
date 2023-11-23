document.addEventListener("keydown", function (event) {
  console.log(window.getSelection());
  console.log(window.getSelection().toString());
  if (event.key === "a") {
    document.body.style.backgroundColor = "red";
  } else {
    document.body.style.backgroundColor = "green";
  }
});
