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
            document.getElementById('response-message').textContent = `Report ${reportName} has been edited successfully`;

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


const handleEdit = (event) => {
   let data = event.target.parentElement.parentElement.getAttribute('deleteData');
   location.href = `/view/report-edit?ReportName=${data}`;
}

const handleDelete = (event) => {
   document.getElementById('modal').style.display = 'flex';

   let dataStr = event.target.parentElement.parentElement.getAttribute('deleteData');

   localStorage.setItem('ReportName', dataStr);
}


const handleSearch = async (event) => {
   if (event.key === "Enter") {
      let html = '';
      let searchText = event.target.value;
      let response = await fetch('/api/searchReport', {
         headers: {
            'Content-Type': 'application/json'
         },
         method: "POST",
         body: JSON.stringify({ searchText })
      });
      let data = await response.json()

      data.finalResults.forEach(res => {
         html += ` <div class="item row">
         <div data="${res.ReportName}" class="col-1 row pt-2 pb-2">
            <a onclick="handleEdit(event)" class="edit col-6 text-center edit"><i class="fas fa-edit"></i></a>
            <div onclick="handleDelete(event)" class="delete col-6 text-center delete"><i class="far fa-trash-alt"></i></div>
         </div>
         <div class="col-2 pt-2 pb-2 text-center">
            ${res.ReportName}
         </div>
         <div class="col-6 pt-2 pb-2 text-center">
            ${res.description === null ? "No description" : res.description}
         </div>
      </div>`
      })

      document.getElementById('res').remove();
      document.getElementById('results').insertAdjacentHTML('beforeend', `<div id="res">${html}</div>`);
   }
}


const handleCancel = () => {
   document.getElementById('modal').style.display = 'none';
   localStorage.removeItem('ReportName');
}


const handleYes = () => {
   let ReportName = localStorage.getItem('ReportName');

   fetch('/api/deleteReport', {
      headers: {
         'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ ReportName })
   }).then(response => {
      ReportName = '';
      location.reload();
   }).catch(err => { console.error(err) })
}




const handleDropdown2 = (event) => {
   let dropdown2value = document.getElementById('dropdown2value');
   if (event.target.value !== "") {
      dropdown2value.required = true;
   }
}
const handleDropdown3 = (event) => {
   let dropdown3value = document.getElementById('dropdown3value');
   if (event.target.value !== "") {
      dropdown3value.required = true;
   }
}

const handleQuery2 = (event) => {
   let uniquelevel2 = document.getElementById('uniquelevel2');
   let drillcolumnlevel1 = document.getElementById('drillcolumnlevel1');

   if (event.target.value !== "") {
      uniquelevel2.required = true;
      drillcolumnlevel1.required = true;
   }
}

const handleQuery3 = (event) => {
   let uniquelevel3 = document.getElementById('uniquelevel3');
   let drillcolumnlevel2 = document.getElementById('drillcolumnlevel2');

   if (event.target.value !== "") {
      uniquelevel3.required = true;
      drillcolumnlevel2.required = true;
   }
}
const handleQuery4 = (event) => {
   let uniquelevel4 = document.getElementById('uniquelevel4');
   let drillcolumnlevel3 = document.getElementById('drillcolumnlevel3');

   if (event.target.value !== "") {
      uniquelevel4.required = true;
      drillcolumnlevel3.required = true;
   }
}
const handleQuery5 = (event) => {
   let uniquelevel5 = document.getElementById('uniquelevel5');
   let drillcolumnlevel4 = document.getElementById('drillcolumnlevel4');

   if (event.target.value !== "") {
      uniquelevel5.required = true;
      drillcolumnlevel4.required = true;
   }
}
