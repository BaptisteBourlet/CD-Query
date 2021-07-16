
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


// (() => {
//    let deleteBtn = document.getElementsByClassName('delete');
//    Array.from(deleteBtn).forEach(btn => {
//       btn.addEventListener('click', () => {
//          let submitData = {};
//          let dataArray = btn.parentElement.getAttribute('data').split('-');

//          submitData.UserID = dataArray[0];
//          submitData.UserGroup = dataArray[1];
//          submitData.MainTheme = dataArray[2];
//          submitData.WelcomeScreen = dataArray[3];

//          fetch('/api/deleteUserGroup', {
//             headers: {
//                'Content-Type': 'application/json'
//             },
//             method: "POST",
//             body: JSON.stringify(submitData)
//          }).then(response => {
//             location.reload();
//          }).catch(err => { console.error(err) })
//       })
//    })
// })();


(() => {
   let editBtn = document.getElementsByClassName('edit');

   Array.from(editBtn).forEach(btn => {
      btn.addEventListener('click', () => {
         let dataArray = btn.parentElement.getAttribute('data').split('-');

         btn.href = `/view/user-group-edit?UserID=${dataArray[0]}&UserGroup=${dataArray[1]}&MainTheme=${dataArray[2]}&WelcomeScreen=${dataArray[3]}`;
      })
   })
})();



(() => {
   let deleteBtn = document.getElementsByClassName('delete');
   Array.from(deleteBtn).forEach(btn => {
      btn.addEventListener('click', () => {
         document.getElementById('modal').style.display = 'flex';

         let dataStr = btn.parentElement.getAttribute('data');

         localStorage.setItem('data', dataStr);
      })
   })
})();

(() => {
   let cancelBtn = document.getElementsByClassName('btn-cancel')[0];

   cancelBtn.addEventListener('click', () => {
      document.getElementById('modal').style.display = 'none';

      localStorage.removeItem('ReportName');
   })
})();


(() => {
   let yesBtn = document.getElementsByClassName('btn-yes')[0];
   yesBtn.addEventListener('click', () => {
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
   })
})();


(() => {
   let editBtn = document.getElementsByClassName('edit');

   Array.from(editBtn).forEach(btn => {
      btn.addEventListener('click', () => {
         let dataArray = btn.parentElement.getAttribute('data').split('-');

         btn.href = `/view/report-edit?ReportName=${dataArray[0]}`;
      })
   })
})();

