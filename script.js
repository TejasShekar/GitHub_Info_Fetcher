const output = document.querySelector("#output");
const userName = document.querySelector("#username");
const checkBtn = document.querySelector("#check-btn");
const avatar = document.querySelector("#avatar");
const repoHeading = document.querySelector("#repo-heading");

avatar.style.display = "none";
repoHeading.style.display = "none";

var url = "https://api.github.com/users/";
function getInfo() {
  let x = userName.value;
  let urlx = url + x;
  output.innerHTML = " ";
  fetch(urlx)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        avatar.style.display = "none";
        avatar.src = "";
        repoHeading.style.display = "none";
        output.innerHTML = `<h2>Invalid UserName</h2>`;
      }
    })
    .then((data) => {
      avatar.style.display = "block";
      avatar.src = data.avatar_url;
      fetch(data.repos_url)
        .then((res) => res.json())
        .then((data) => {
          repoHeading.style.display = "block";
          for (let i = 0; i < data.length; i++) {
            let reposURL = data[i].homepage;
            let reposName = data[i].name;
            if (reposURL && reposName !== "") {
              output.innerHTML += `<li><a href="${reposURL}" target="_blank">${reposName}</a></li></ol>`;
            }
          }
        });
    });
}

checkBtn.addEventListener("click", getInfo);
