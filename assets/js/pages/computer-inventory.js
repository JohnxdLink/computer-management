export const computerInventory = () => {
  console.log("Welcome!");

  const addComputerBtn = document.getElementById("addComputerBtn");
  const closeComputerBtn = document.getElementById("closeComputerBtn");

  const toolbar = document.getElementById("toolbar");
  const inventoryTable = document.getElementById("inventoryTable");
  const computerForm = document.getElementById("computerForm");

  const showForm = () => {
    toolbar.classList.replace("d-flex", "d-none");
    inventoryTable.classList.replace("d-flex", "d-none");
    computerForm.classList.replace("d-none", "d-flex");
  };

  const hideForm = () => {
    toolbar.classList.replace("d-none", "d-flex");
    inventoryTable.classList.replace("d-none", "d-flex");
    computerForm.classList.replace("d-flex", "d-none");
  };

  addComputerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    showForm();
  });

  closeComputerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    hideForm();
  });
};

computerInventory();
