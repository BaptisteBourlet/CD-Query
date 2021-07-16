const handleChange = (event) => {
   document.getElementById('response-message').textContent = '';
   document.getElementById('response-message').classList.remove('success');
   document.getElementById('response-message').classList.remove('error');
}


const handleSubmit = async (event) => {
   event.preventDefault();
   let reportName = document.getElementById('ReportName').value;
   let reportForm = document.getElementById('reportForm');
   let formData = new FormData(reportForm);
   let submitData = {};
   for (let [key, value] of formData) {
      submitData[key] = value;
   }

   if (reportName) {
      try {
         let response = await fetch('/api/addReport', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(submitData)
         })

         document.getElementById('reportForm').classList.remove("was-validated");

         if (response.status === 200) {
            Object.keys(submitData).forEach(key => {
               document.getElementById(key).value = '';
            })

            document.getElementById('response-message').classList.remove('error');
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').textContent = `Report ${reportName} has been added successfully`;

            setTimeout(() => {
               location.href = "/view/report";
            }, 500)

         } else if (response.status === 404) {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Report Name: ${reportName} already exists`;
         } else {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Attempt to add report failed, please contact your IT team`;
         }
      } catch (err) {
         document.getElementById('response-message').classList.remove('success');
         document.getElementById('response-message').classList.add('error');
         document.getElementById('response-message').textContent = `Attempt to add report failed, please contact your IT team`;
      }
   } else {
      window.scrollTo(0, 0);
      document.getElementById('response-message').textContent = '';
      document.getElementById('response-message').classList.remove('success');
      document.getElementById('response-message').classList.remove('error');
      document.getElementById('reportForm').classList.add("was-validated");
   }
}


const handleEditSubmit = async (event) => {
   event.preventDefault();
   let reportName = document.getElementById('ReportName').value;
   let reportForm = document.getElementById('reportForm');
   let formData = new FormData(reportForm);
   let submitData = {};
   for (let [key, value] of formData) {
      submitData[key] = value;
   }

   if (reportName) {
      try {
         let response = await fetch('/api/editReport', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(submitData)
         })

         document.getElementById('reportForm').classList.remove("was-validated");

         if (response.status === 200) {
            Object.keys(submitData).forEach(key => {
               document.getElementById(key).value = '';
            })

            document.getElementById('response-message').classList.remove('error');
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').textContent = `Report ${reportName} has been added successfully`;

            setTimeout(() => {
               location.href = "/view/report";
            }, 500)

         } else if (response.status === 404) {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Report Name: ${reportName} already exists`;
         } else {
            document.getElementById('response-message').classList.remove('success');
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').textContent = `Attempt to add report failed, please contact your IT team`;
         }
      } catch (err) {
         document.getElementById('response-message').classList.remove('success');
         document.getElementById('response-message').classList.add('error');
         document.getElementById('response-message').textContent = `Attempt to add report failed, please contact your IT team`;
      }
   } else {
      window.scrollTo(0, 0);
      document.getElementById('response-message').textContent = '';
      document.getElementById('response-message').classList.remove('success');
      document.getElementById('response-message').classList.remove('error');
      document.getElementById('reportForm').classList.add("was-validated");
   }
}


(() => {
   let deleteBtn = document.getElementsByClassName('delete');
   Array.from(deleteBtn).forEach(btn => {
      btn.addEventListener('click', () => {

         document.getElementById('modal').style.display = 'flex';

         let dataStr = btn.parentElement.getAttribute('data');

         localStorage.setItem('ReportName', dataStr);

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
      let ReportName = localStorage.getItem('ReportName');

      fetch('/api/deleteReport', {
         headers: {
            'Content-Type': 'application/json'
         },
         method: "POST",
         body: JSON.stringify({ ReportName })
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


