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



const handleEdit = (event) => {
   let dataArray = event.target.parentElement.parentElement.getAttribute('data').split('-');

   sessionStorage.setItem('oldReportID', dataArray[1]);

   location.href = `/view/user-group-link-edit?UserGroup=${dataArray[0]}&ReportID=${dataArray[1]}`;
}


const handleDelete = (event) => {
   document.getElementById('modal').style.display = 'flex';

   let dataStr = event.target.parentElement.parentElement.getAttribute('data');

   localStorage.setItem('data', dataStr);
}


const handleCancel = () => {
   document.getElementById('modal').style.display = 'none';

   localStorage.removeItem('ReportName');
}


const handleYes = () => {
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
}


const handleSearch = async (event) => {
   if (event.key === "Enter") {
      let html = '';
      let UserGroup = event.target.value;

      let response = await fetch('/api/searchUserGroupLink', {
         headers: {
            'Content-Type': 'application/json'
         },
         method: "POST",
         body: JSON.stringify({ UserGroup })
      });

      let data = await response.json()

      data.finalResults.forEach(res => {
         html += ` <div class="item row">
         <div data="${res.UserGroup}-${res.Report}" class="row col-1 pt-2 pb-2">
            <a onclick="handleEdit(event)" class="edit col-6 text-center edit"><i class="fas fa-edit"></i></a>
            <div onclick="handleDelete(event)" class="delete col-6 text-center delete"><i class="far fa-trash-alt"></i></div>
         </div>
         <div class="col-1 pt-2 pb-2 text-center">
         ${res.UserGroup}
         </div>
         <div class="col-3 pt-2 pb-2 text-center">
         ${res.Report}
         </div>
      </div>`
      })

      document.getElementById('res').remove();
      document.getElementById('results').insertAdjacentHTML('beforeend', `<div id="res">${html}</div>`);
   }
}