let listDom = document.querySelector('#list');
let LocalTask = {id: "", task: "", check: false};
let ArrayTask = [];
let i = 0;

// Localstorage İşlemi

if (localStorage.getItem('load')) {
    ArrayTask = JSON.parse(localStorage.getItem('load'));
    ArrayTask.forEach(element => {
        i++;
        element.id = `id${i}`;
        localStorage.setItem('load', JSON.stringify(ArrayTask));
        let liDom = document.createElement('li');
        liDom.setAttribute('id', `id${i}`);
        liDom.innerHTML = 
        `
            ${element.task}
            <i 
            class = "fa-solid fa-trash"
            onclick = "RemoveFunc(${i})">
            </i>
        `
        listDom.append(liDom);
        if (ArrayTask[i - 1].check) {
            let changeLi = document.querySelector(`#id${i}`)
            changeLi.classList.add("checked")
        }
    });
};

// Bilgi Ekleme Buton Çalıştırma

function newElement() {
    const TASK = document.querySelector('#task')
    if (TASK.value.trim() == "") {
        $(".error").toast("show");
    }
    else {
        addItem(TASK.value);
        TASK.value = "";
        $(".success").toast("show");
    }
}

// Bilgi Ekleme Fonksiyonu

const addItem = (task) => {
    i++;
    LocalTask.task = task;
    LocalTask.id = `id${i}`;
    ArrayTask.push(LocalTask);
    localStorage.setItem('load', JSON.stringify(ArrayTask));
    ArrayTask = JSON.parse(localStorage.getItem('load'));

    let liDom = document.createElement('li');
    liDom.setAttribute('id', `id${i}`)
    liDom.innerHTML = 
    `
    ${task}<i class = "fa-solid fa-trash" onclick = "RemoveFunc(${i})"></i>
    `
    listDom.append(liDom);
}

// Silme Fonksiyonu

function RemoveFunc(j) {
    const element = document.querySelector(`#id${j}`);
    let index = ArrayTask.findIndex(Atask => {
       return JSON.stringify(Atask).indexOf(`id${j}`) >= 0 
    });
    ArrayTask.splice(index,1);
    localStorage.setItem('load', JSON.stringify(ArrayTask));
    ArrayTask = JSON.parse(localStorage.getItem('load'));
    element.remove();
}

// Checked İşlemi

document.addEventListener('click', (element) => {
    if (element.target.matches('li')) {
        let elementId = element.target.id;
        let index = ArrayTask.findIndex(function (Atask) {
            return JSON.stringify(Atask).indexOf(`${elementId}`) >= 0
        }); 
        ArrayTask[index].check = !(ArrayTask[index].check);
        localStorage.setItem('load', JSON.stringify(ArrayTask));
        ArrayTask = JSON.parse( localStorage.getItem('load') );
        let changeLi = document.querySelector(`#${elementId}`);
        changeLi.classList.toggle('checked');
    }
});