
const handleChange = (event) => {
   document.getElementById('response-message').textContent = '';
   document.getElementById('response-message').classList.remove('success');
   document.getElementById('response-message').classList.remove('error');
}

const handleSubmit = async (event) => {
   event.preventDefault();
   const userID = document.getElementById('userID').value;
   const userGroup = document.getElementById('userGroup').value;
   const mainTheme = document.getElementById('mainTheme').value;
   const welcomeScreen = document.getElementById('welcomeScreen').value;

   if (userID && userGroup && mainTheme && welcomeScreen) {
      try {
         let response = await fetch('/api/addUserGroup', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
               userID,
               userGroup,
               mainTheme,
               welcomeScreen
            })
         })

         document.getElementById('form').classList.remove("was-validated");
         if (response.status === 200) {
            document.getElementById('userID').value = '';
            document.getElementById('userGroup').value = '';
            document.getElementById('mainTheme').value = '';
            document.getElementById('welcomeScreen').value = '';

            document.getElementById('response-message').classList.remove('error');
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').textContent = `User ID ${userID} has been added successfully`;

            setTimeout(() => {
               location.href = "/view/user-group";
            }, 500)

         } else if (response.status === 404) {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `User ID ${userID} already exists!`;
         } else {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Attempt to add User ID ${userID} failed, please contact your IT team`;
         }
      } catch (err) {
         document.getElementById('response-message').classList.remove('success');
         document.getElementById('response-message').classList.add('error');
         document.getElementById('response-message').textContent = `Attempt to add User ID ${userID} failed, please contact your IT team`;
         console.log(err)
      }
   } else {
      document.getElementById('form').classList.add("was-validated");
   }
}

const handleEditSubmit = async (event) => {
   event.preventDefault();
   const userID = document.getElementById('userID').value;
   const userGroup = document.getElementById('userGroup').value;
   const mainTheme = document.getElementById('mainTheme').value;
   const welcomeScreen = document.getElementById('welcomeScreen').value;

   if (userID && userGroup && mainTheme && welcomeScreen) {
      try {
         let response = await fetch('/api/editUserGroup', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
               userID,
               userGroup,
               mainTheme,
               welcomeScreen
            })
         })

         document.getElementById('form').classList.remove("was-validated");
         if (response.status === 200) {
            document.getElementById('userID').value = '';
            document.getElementById('userGroup').value = '';
            document.getElementById('mainTheme').value = '';
            document.getElementById('welcomeScreen').value = '';

            document.getElementById('response-message').classList.remove('error');
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').textContent = `User ID ${userID} has been edited successfully`;

            setTimeout(() => {
               location.href = "/view/user-group";
            }, 500)

         } else if (response.status === 404) {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Attempt to edit User ID ${userID} failed, please contact your IT team`;
         } else {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Attempt to edit User ID ${userID} failed, please contact your IT team`;
         }
      } catch (err) {
         document.getElementById('response-message').classList.remove('success');
         document.getElementById('response-message').classList.add('error');
         document.getElementById('response-message').textContent = `Attempt to edit User ID ${userID} failed, please contact your IT team`;
         console.log(err)
      }
   } else {
      document.getElementById('form').classList.add("was-validated");
   }
}


const handleEdit = (event) => {
   let dataArray = event.target.parentElement.parentElement.getAttribute('data').split('-');

   location.href = `/view/user-group-edit?UserID=${dataArray[0]}&UserGroup=${dataArray[1]}&MainTheme=${dataArray[2]}&WelcomeScreen=${dataArray[3]}`;
}


const handleDelete = (event) => {
   document.getElementById('modal').style.display = 'flex';

   let dataStr = event.target.parentElement.parentElement.getAttribute('data');

   localStorage.setItem('data', dataStr);
}


const handleSearch = async (event) => {
   if (event.key === "Enter") {
      let html = '';
      let UserGroup = event.target.value;
      let response = await fetch('/api/searchUserGroup', {
         headers: {
            'Content-Type': 'application/json'
         },
         method: "POST",
         body: JSON.stringify({ UserGroup })
      });

      let data = await response.json()

      data.finalResults.forEach(res => {
         html += `<div class="item row">
         <div data="${res.UserID}-${res.UserGroup}-${res.MainTheme}-${res.WelcomeScreen}"
            class="row col-1 pt-2 pb-2">
            <a onclick="handleEdit(event)" class="edit col-6 text-center edit"><i class="fas fa-edit"></i></a>
            <div onclick="handleDelete(event)" class="delete col-6 text-center delete"><i class="far fa-trash-alt"></i></div>
         </div>
         <div class="col-1 pt-2 pb-2 text-center">
         ${res.UserID}
         </div>
         <div class="col-1 pt-2 pb-2 text-center">
         ${res.UserGroup}
         </div>
         <div class="col-3 pt-2 pb-2 text-center">
         ${res.MainTheme}
         </div>
         <div class="col-3 pt-2 pb-2 text-center">
         ${res.WelcomeScreen}
         </div>
      </div>`
      })

      document.getElementById('res').remove();
      document.getElementById('results').insertAdjacentHTML('beforeend', `<div id="res">${html}</div>`);
   }
}


const handleCancel = () => {
   document.getElementById('modal').style.display = 'none';

   localStorage.removeItem('data');
}

const handleYes = () => {
   let dataArray = localStorage.getItem('data').split('-');
   let submitData = {};
   submitData.UserID = dataArray[0];
   submitData.UserGroup = dataArray[1];
   submitData.MainTheme = dataArray[2];
   submitData.WelcomeScreen = dataArray[3];

   fetch('/api/deleteUserGroup', {
      headers: {
         'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(submitData)
   }).then(response => {
      location.reload();
   }).catch(err => { console.error(err) })
}
