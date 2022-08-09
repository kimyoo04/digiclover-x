const links = document.querySelectorAll(".nav-link");
const nowUrl = location.href;

links.forEach((link) => {
  if (link.href === nowUrl) {
    link.className += " selected-url";
  }
});
