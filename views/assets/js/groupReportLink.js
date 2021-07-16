const handleChange = (event) => {
   document.getElementById('response-message').textContent = '';
   document.getElementById('response-message').classList.remove('success');
   document.getElementById('response-message').classList.remove('error');
}


const handleSubmit = async (event) => {
   event.preventDefault();
   let UserGroup = document.getElementById('UserGroup').value;
   let ReportID = document.getElementById('ReportID').value;

   if (UserGroup && ReportID) {
      try {
         let response = await fetch('/api/addGroupReport', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
               UserGroup,
               ReportID
            })
         })

         document.getElementById('form').classList.remove("was-validated");

         console.log(response)

         if (response.status === 200) {
            document.getElementById('UserGroup').value = '';
            document.getElementById('ReportID').value = '';

            document.getElementById('response-message').classList.remove('error');
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').textContent = `Report Link has been added successfully`;

            setTimeout(() => {
               location.href = "/view/user-group-link";
            }, 500)

         } else if (response.status === 404) {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Report Link  already exists`;
         } else {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Attempt to add Report Link failed, please contact your IT team`;
         }
      } catch (err) {
         document.getElementById('response-message').classList.remove('success');
         document.getElementById('response-message').classList.add('error');
         document.getElementById('response-message').textContent = `Attempt to add Report Link failed, please contact your IT team`;
      }
   } else {
      window.scrollTo(0, 0);
      document.getElementById('response-message').textContent = '';
      document.getElementById('response-message').classList.remove('success');
      document.getElementById('response-message').classList.remove('error');
      document.getElementById('form').classList.add("was-validated");
   }
}



const handleEditSubmit = async (event) => {
   event.preventDefault();
   let UserGroup = document.getElementById('UserGroup').value;
   let ReportID = document.getElementById('ReportID').value;
   let oldReportID = sessionStorage.getItem('oldReportID');

   if (UserGroup && ReportID) {
      try {
         let response = await fetch('/api/editGroupReport', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
               UserGroup,
               ReportID,
               oldReportID
            })
         })

         document.getElementById('form').classList.remove("was-validated");

         if (response.status === 200) {
            document.getElementById('ReportID').value = '';

            document.getElementById('response-message').classList.remove('error');
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').textContent = `Report Link has been edited successfully`;

            setTimeout(() => {
               location.href = "/view/user-group-link";
            }, 500)


         } else if (response.status === 404) {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Report Link already exists`;
         } else {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Attempt to edit Report Link failed, please contact your IT team`;
         }
      } catch (err) {
         document.getElementById('response-message').classList.remove('success');
         document.getElementById('response-message').classList.add('error');
         document.getElementById('response-message').textContent = `Attempt to add Report Link failed, please contact your IT team`;
      }
   } else {
      window.scrollTo(0, 0);
      document.getElementById('response-message').textContent = '';
      document.getElementById('response-message').classList.remove('success');
      document.getElementById('response-message').classList.remove('error');
      document.getElementById('form').classList.add("was-validated");
   }
}


// (() => {
//    let deleteBtn = document.getElementsByClassName('delete');
//    Array.from(deleteBtn).forEach(btn => {
//       btn.addEventListener('click', () => {
//          let submitData = {};
//          let dataArray = btn.parentElement.getAttribute('data').split('-');

//          submitData.UserGroup = dataArray[0];
//          submitData.ReportID = dataArray[1];

//          fetch('/api/deleteGroupReport', {
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
         sessionStorage.setItem('oldReportID', dataArray[1]);
         btn.href = `/view/user-group-link-edit?UserGroup=${dataArray[0]}&ReportID=${dataArray[1]}`;
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

      localStorage.removeItem('data');
   })
})();


(() => {
   let yesBtn = document.getElementsByClassName('btn-yes')[0];
   yesBtn.addEventListener('click', () => {
      let dataArray = localStorage.getItem('data').split('-');
      let submitData = {};
      submitData.UserGroup = dataArray[0];
      submitData.ReportID = dataArray[1];


      fetch('/api/deleteGroupReport', {
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