//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("CONNECT WITH ME!");

const checkboxes = document.querySelectorAll("#myTable input[type='checkbox']");
document.addEventListener("DOMContentLoaded", function () {
  const fullName = "Your Full Name";
  const nuid = "Your NUID";

  document.getElementById("fullName").textContent = "Name - Ronak Shah";
  document.getElementById("nuid").textContent = "NUID - 002813456";

  const dropDownRows = document.querySelectorAll(".dropDownTextArea");
  dropDownRows.forEach((row) => {
    row.style.display = "none";
  });

  const submitMe = document.getElementById("button");
  submitMe.disabled = true;
  submitMe.style.backgroundColor = "gray";

  let stu = 4;
  document.getElementById("add").addEventListener("click", () => {
    const table = document.getElementById("myTable");
    const newRow = table.insertRow(-1);

    const check = newRow.insertCell(0);
    const studentCell = newRow.insertCell(1);
    const advisorCell = newRow.insertCell(2);
    const awardStatusCell = newRow.insertCell(3);
    const semesterCell = newRow.insertCell(4);
    const typeCell = newRow.insertCell(5);
    const budgetCell = newRow.insertCell(6);
    const percentageCell = newRow.insertCell(7);
    const deleteCell = newRow.insertCell(8);
    const editCell = newRow.insertCell(9);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    check.appendChild(checkbox);

    const img = document.createElement("img");
    img.src = "down.png";
    img.width = "25";
    check.appendChild(document.createElement("br"));
    check.appendChild(document.createElement("br"));
    check.appendChild(img);

    studentCell.textContent = `Student ${stu}`;
    advisorCell.textContent = `Teacher ${stu}`;
    awardStatusCell.textContent = "Approved";
    semesterCell.textContent = "Fall";
    typeCell.textContent = "TA";
    budgetCell.textContent = `1234${stu}`;
    percentageCell.textContent = "100%";
    deleteCell.innerHTML = "";
    editCell.innerHTML = "";

    const dropdownRow = table.insertRow(-1);
    dropdownRow.classList.add("dropDownTextArea");
    dropdownRow.style.display = "none";
    const dropdownCell = dropdownRow.insertCell(0);
    dropdownCell.colSpan = 8;
    dropdownCell.innerHTML = `
    Advisor:<br /><br />
    Award Details<br />
    Summer 1-2014(TA)<br />
    Budget Number: <br />
    Tuition Number: <br />
    Comments:<br /><br /><br />
    Award Status:<br /><br /><br />
  `;

    hideDeleteEditColumns();
    alert(`Student ${stu} Record added successfully`);
    stu++;
  });

  document.getElementById("myTable").addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
      const checkbox = event.target;
      const row = checkbox.parentElement.parentElement;

      if (checkbox.checked) {
        row.classList.add("yellow");
        const deleteCell = row.cells[8];
        deleteCell.innerHTML = "<button>Delete</button>";
        deleteCell.querySelector("button").addEventListener("click", () => {
          const studentName = row.cells[1].textContent;
          row.remove();
          alert(`${studentName} Record deleted successfully`);
          hideDeleteEditColumns();
        });

        const editCell = row.cells[9];
        editCell.innerHTML = "<button>Edit</button>";
        editCell.querySelector("button").addEventListener("click", () => {
          const studentName = row.cells[1].textContent;
          const userInput = prompt(`Edit details of ${studentName}:`, ""); // Use prompt to get user input
          if (userInput !== null) {
            // Check if user clicked OK
            alert(`Edited details of ${studentName}: ${userInput}`);
          }
        });
      } else {
        row.classList.remove("yellow");
        const deleteCell = row.cells[8];
        deleteCell.innerHTML = "";
        const editCell = row.cells[9];
        editCell.innerHTML = "";
      }
    }
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (![...checkboxes].some((cb) => cb.checked)) {
        submitMe.disabled = true;
        submitMe.style.backgroundColor = "gray";
      }
    });
  });

  document.getElementById("myTable").addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
      const icon = event.target;
      const row = icon.parentElement.parentElement.nextElementSibling;
      if (row.style.display === "none") {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    }
  });

  function hideDeleteEditColumns() {
    const checkboxes = document.querySelectorAll(
      "#myTable input[type='checkbox']"
    );
    const submitMe = document.getElementById("button");
    let isAnyCheckboxChecked = false;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        isAnyCheckboxChecked = true;
      }
    });

    checkboxes.forEach((checkbox) => {
      const row = checkbox.parentElement.parentElement;
      const deleteCell = row.cells[8];
      const editCell = row.cells[9];

      if (isAnyCheckboxChecked) {
        deleteCell.style.display = "table-cell";
        editCell.style.display = "table-cell";
      } else {
        deleteCell.style.display = "none";
        editCell.style.display = "none";
      }
    });

    const headerRow = document.querySelector("#myTable tr:first-child");
    const deleteHeader = headerRow.cells[8];
    const editHeader = headerRow.cells[9];

    if (isAnyCheckboxChecked) {
      deleteHeader.style.display = "table-cell";
      editHeader.style.display = "table-cell";
    } else {
      deleteHeader.style.display = "none";
      editHeader.style.display = "none";
    }

    submitMe.disabled = !isAnyCheckboxChecked;
    if (isAnyCheckboxChecked) {
      submitMe.style.backgroundColor = "orange";
    } else {
      submitMe.style.backgroundColor = "gray";
    }
  }

  document.getElementById("myTable").addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
      hideDeleteEditColumns();
    }
  });

  hideDeleteEditColumns();
});
