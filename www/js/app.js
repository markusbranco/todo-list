//Author: Markus Santos - 6020

// Get elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHEK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough"

//Variables
let LIST, id;

//Get item from localstorage
let data = localStorage.getItem("TODO");

//Check if data is not empty
if(data) {
    LIST = JSON.parse(data); 
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
} else {
    // If data isn't empty
    LIST = [];
    id = 0;
}

//load itens to user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Show todays date
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {

    if(trash) {return;}

    const DONE = done ? CHECK : UNCHEK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                 </li>              
                 `;
            
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

//Add item to the list
document.addEventListener("keyup", function(even) {
    if(event.keyCode == 13) {
        const toDo = input.value;

        //if the input isn't empty
        if(toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //ADD item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

//Check ToDo as complete
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHEK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove Todo
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; //return clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete") {
        completeToDo(element);
    } else if(elementJob == "delete") {
        removeToDo(element);
    }

    //ADD item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

