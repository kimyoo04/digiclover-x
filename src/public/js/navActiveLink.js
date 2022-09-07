const links = document.querySelectorAll(".nav-link");
const nowUrl = window.location.href;
// console.log("현재url = ", nowUrl);

links.forEach((link) => {
  // console.log("link = ", link.href);
  if (nowUrl === link.href + "/") {
    link.className += " selected-url";
  }
});
