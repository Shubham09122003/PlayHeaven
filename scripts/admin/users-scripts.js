let users = JSON.parse(localStorage.getItem('users')) || [];

renderUsersTable();
renderAdminInfo();

function deleteUser(username) {
  const confirmDeleteButton = document.getElementById('confirmDeleteUser');
  var modalDeleteConfirm = new bootstrap.Modal(
    document.getElementById('deleteUserModal')
  );
  modalDeleteConfirm.show();
  confirmDeleteButton.onclick = () => {
    users.forEach((user) => {
      if (user.username == username) {
        const usersFiltered = users.filter((user) => user.username != username);
        localStorage.setItem('users', JSON.stringify(usersFiltered));
      }
    });
    renderUsersTable();
  };
}

function modifyUser(username) {
  // loadModifyInputs(code);
  const modifyUserForm = document.getElementById('modifyUserForm');
  var modifyUserModal = new bootstrap.Modal(
    document.getElementById('modifyUserModal')
  );
  modifyUserModal.show();
  modifyUserForm.onsubmit = function (e) {
    e.preventDefault();
    users.forEach((user) => {
      if (user.username.toLowerCase() == username.toLowerCase()) {
        const userElements = e.target.elements;
        user.role = userElements.roleModify.value;
        user.status = userElements.statusModify.value;
        users[user.username] = user;
        localStorage.setItem('users', JSON.stringify(users));
      }
    });
    renderUsersTable();
    modifyUserModal.hide();
  };
}

function renderUsersTable() {
  const usersTableBody = document.getElementById('users-table-body');
  usersTableBody.innerHTML = '';
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach((user) => {
    renderUser(user);
  });
  changeUsersListInfo(`${users.length} registered users.`);
}

function renderUser(user) {
  const usersTableBody = document.getElementById('users-table-body');
  usersTableBody.innerHTML += `
      <tr>
        <td><img src='${user.avatar}' alt='user avatar' class='img-fluid rounded-circle bg-dark w-25' /></td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td>
        <div class='d-flex justify-content-evenly'>
          <button class='btn p-0' onclick='modifyUser('${user.username.toLowerCase()}')'><i class='bi bi-pencil text-warning'></i></button>
          <button class='btn p-0' onclick='deleteUser('${user.username.toLowerCase()}')'><i class='bi bi-trash text-danger'></i></button>
        </div>
      </td>
      </tr>
      `;
}

function changeUsersListInfo(text) {
  let tableInfoText = document.getElementById('users-table-info-text');
  tableInfoText.innerHTML = text;
}

function renderAdminInfo() {
  const adminAvatar = document.getElementById('admin-avatar');
  const adminInfoText = document.getElementById('admin-info-text');

  adminAvatar.setAttribute('src', "https://gravatar.com/userimage/242366140/9e958c251962b55fd5f453a246b7e41e.jpeg?size=124");
  adminInfoText.innerHTML = `User <span class='text-success'>${"Shubh"}</span>`;
}



