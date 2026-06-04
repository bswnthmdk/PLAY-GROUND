const usersContainer = document.getElementById("usersContainer");

async function getUsers() {
  const response = await fetch("/getUsers");

  const users = await response.json();
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    const div = document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
      <h3>${user.username}</h2>
      <p>Email: ${user.email} || Password: ${user.password}</p>
    `;

    usersContainer.appendChild(div);
  });
}

getUsers();
