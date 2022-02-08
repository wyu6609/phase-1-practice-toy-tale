let addToy = false;
const insertToyCollection = document.querySelector("#toy-collection");
const toyNameInput = document.querySelector("#input-toyName");
const toyImageInput = document.querySelector("#input-toyImage");
const form = document.querySelector(".add-toy-form");
document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//create TOY button
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //take toyName input and toyImage input create object
  let newToyObj = {
    name: toyNameInput.value,
    image: toyImageInput.value,
    likes: 0,
  };
  //console.log(newToyObj);
  //pass new obj to POST request
  addNewToyObj(newToyObj);
});

//render toy
function renderToy(toyObj) {
  //create card div
  const toyCard = document.createElement("div");
  toyCard.classList.add("card");
  toyCard.innerHTML = `
  <h2>${toyObj.name}</h2>
  <img src="${toyObj.image}" class="toy-avatar" />
  <p>${toyObj.likes}</p>
  <button class="like-btn" id="${toyObj.id}">Like ❤️</button>
  `;
  insertToyCollection.appendChild(toyCard);
  document.getElementById(toyObj.id).addEventListener("click", () => {
    //console.log("clicked");
    toyObj.likes++;

    updateLikes(toyObj, toyCard);
  });
}

//fetch toy api
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      //console.log("Success:");
      initialize(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//update Likes with PATCH request
function updateLikes(toyObj, toyCard) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toyObj),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Success:", data)//;
      //console.log(toyCard.getElementsByTagName("p")[0]);
      toyCard.getElementsByTagName("p")[0].innerHTML = toyObj.likes;
      //location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//add new Obj with POST request
function addNewToyObj(newToy) {
  fetch(`http://localhost:3000/toys/`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Success:", data);
      //location.reload();

      renderToy(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//initiate function
function initialize(toys) {
  toys.forEach((toy) => {
    //console.log(toy);
    renderToy(toy);
  });
}
