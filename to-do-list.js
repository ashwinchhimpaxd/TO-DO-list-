
const todoLists = document.querySelector('.to-do-list');
const inputvalue = document.querySelector('.input');
const addtodobtn = document.querySelector('.btn');


let tododataArray = [];
function gettododata() {
    return JSON.parse(localStorage.getItem('ToDoListValue')) || [];
}
function todoLocalStorage(todovalues) {
    return localStorage.setItem("ToDoListValue", JSON.stringify(todovalues));
}
// check the value is present already in loacl storage then not add twise in loacl storage
function Existstodo() {
    let postdata = JSON.parse(localStorage.getItem('ToDoListValue')) || [];
    let INPUTDATA = inputvalue.value.trim();
    let boolenvalue = true;
    postdata.forEach((data) => {
        if (data === INPUTDATA) {
            boolenvalue = false;
        }
    })
    return boolenvalue;
}

// events functions 
const addToDolists = (e) => {
    e.preventDefault();
    let tododataArray = gettododata();
    const INPUTDATA = inputvalue.value.trim();      //  const whitespaceRegex = /^\s+$/;
    if (!INPUTDATA) {
        return alert('Please Enter Your To-Do List');
    }
    if (Existstodo()) {
        tododataArray.push(INPUTDATA)
        todoLocalStorage(tododataArray);
        const liElemets = document.createElement('li');
        liElemets.innerHTML = INPUTDATA;
        todoLists.appendChild(liElemets);
        inputvalue.value = ''; // to clear the input filed after the click add list or press enter
    }
}
const FirstLocaldata = () => {
    let postdata = JSON.parse(localStorage.getItem('ToDoListValue'));
    if (!postdata) {
        return;
    }
    postdata.forEach((element) => {
        const liElemets = document.createElement('li');
        liElemets.innerHTML = element;
        todoLists.appendChild(liElemets);

    });
}
const removetodoelements = (e) => {
    const livalue = e.target.textContent
    let todoitems = JSON.parse(localStorage.getItem('ToDoListValue'));
    let newtodoarray = todoitems.filter((data) => data !== livalue)
    todoLocalStorage(newtodoarray);
    e.target.remove(livalue);
}

addtodobtn.addEventListener('click', (e) => { addToDolists(e) });
window.addEventListener('onload', FirstLocaldata());
todoLists.addEventListener('click', (e) => removetodoelements(e));