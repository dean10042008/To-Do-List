const inputField = document.getElementById('task');
const plusButton = document.getElementById('addButton');
const itemContainer = document.querySelector('.items-container');
let initial = document.getElementById('initial-item');

let i = 1;

function addTask() {

    let text = inputField.value;

    if (text !== "" && text) {
        initial.style.display = 'none';

        let div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
            <p>${text}</p>
                        
            <div class="button-wrapper">
                <button id="done-${i}" class="doneButton" type="button"><i class="fa-solid fa-check"></i></button>
                <button id="edit-${i}" class="editButton" type="button"><i class="fa-solid fa-pen"></i></button>
                <button id="delete-${i}" class="deleteButton" type="button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        if (localStorage.getItem('item') === null) {
            localStorage.setItem('item', '[]');
        }

        let old = JSON.parse(localStorage.getItem('item'));
        old.push(text);
        localStorage.setItem('item', JSON.stringify(old));
        

        inputField.value = '';

        itemContainer.appendChild(div);

        document.getElementById(`done-${i}`).addEventListener("click", () => setTaskAsDone(div));
        document.getElementById(`delete-${i}`).addEventListener("click", () => deleteTask(div));
        document.getElementById(`edit-${i}`).addEventListener("click", () => editTask(div));


        i++;
    }
}

plusButton.addEventListener('click', addTask);

function setTaskAsDone(div) {
    let button = div.querySelector('.doneButton');
    let p = div.querySelector('p');
    let old = p.textContent;
    
    
    p.innerHTML = `
        <s>
            ${old}
        </s>
    `;

    let localStorageArr = JSON.parse(localStorage.getItem('item'));
    let index = localStorageArr.indexOf(old);
    localStorageArr[index] = `${old}-done`;
    localStorage.setItem('item', JSON.stringify(localStorageArr));

    button.style.border = '1px solid gray';
    button.style.scale = '1';
    button.disabled = true;
    button.style.color = 'gray';
}

function editTask(div) {
    const buttons = div.querySelector('.button-wrapper');
    let id = buttons.children[0].id.split("-")[1];
    
    let previousText = div.querySelector('p').textContent.trim();

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', previousText);
    input.className = 'input';
    input.id = `input-${id}`;

    let button = document.createElement('button');
    button.className = 'finishEditing';
    button.id = `edit-${id}`;

    let icon = document.createElement('i');
    icon.className = 'ri-check-double-line';

    button.appendChild(icon);

    div.innerHTML = `
        ${input.outerHTML}

        ${button.outerHTML}
    `;

    document.getElementById(`edit-${id}`).addEventListener('click', () => {
        finishEdit(div, document.getElementById(`input-${id}`).value, buttons, previousText, id);
    });
}

function finishEdit(div, newText, buttons, prevText, i) {
    let localStorageArr = JSON.parse(localStorage.getItem('item'));
    const indexText = localStorageArr.indexOf(prevText);
    
    if (indexText !== -1) {
        localStorageArr.splice(indexText, 1, newText);


        div.innerHTML = `
            <p>${newText}</p>

            ${buttons.outerHTML}
        `;
    }
    else {
        const indexDoneText = localStorageArr.indexOf(`${newText}-done`);
        localStorageArr.splice(indexDoneText - 1, 1, `${newText}-done`);

        div.innerHTML = `
            <p>
                <s>${newText}</s>
            </p>

            ${buttons.outerHTML}
        `;
    }
    
    localStorage.setItem('item', JSON.stringify(localStorageArr));

    document.getElementById(`done-${i}`).addEventListener("click", () => setTaskAsDone(div));
    document.getElementById(`delete-${i}`).addEventListener("click", () => deleteTask(div));
    document.getElementById(`edit-${i}`).addEventListener("click", () => editTask(div));
}

function deleteTask(div) {
    let text = div.querySelector('p').textContent;

    let localStorageArr = JSON.parse(localStorage.getItem('item'));
    const indexText = localStorageArr.indexOf(text);
    
    if (indexText !== -1) {
        localStorageArr.splice(indexText, 1);
    }
    else {
        const indexDoneText = localStorageArr.indexOf(`${text}-done`);
        localStorageArr.splice(indexDoneText, 1);
    }
    
    localStorage.setItem('item', JSON.stringify(localStorageArr));

    div.remove();
    
    if (itemContainer.children.length === 1) {
        initial.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    let arr = JSON.parse(localStorage.getItem('item'));

    arr.forEach((item) => {
        initial.style.display = 'none';

        if (item.includes('-done')) {
            let text = item.split('-done')[0];

            let div = document.createElement('div');
            div.className = 'item';

            div.innerHTML = `
                <p><s>${text}</s></p>
                            
                <div class="button-wrapper">
                    <button id="done-${i}" class="doneButton" type="button" disabled style="border: 1px solid gray; scale: 1; color: gray"><i class="fa-solid fa-check"></i></button>
                    <button id="edit-${i}" class="editButton" type="button"><i class="fa-solid fa-pen"></i></button>
                    <button id="delete-${i}" class="deleteButton" type="button"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            itemContainer.appendChild(div);

            document.getElementById(`done-${i}`).addEventListener("click", () => setTaskAsDone(div));
            document.getElementById(`delete-${i}`).addEventListener("click", () => deleteTask(div));
            document.getElementById(`edit-${i}`).addEventListener("click", () => editTask(div));
        }
        else {
            let div = document.createElement('div');
            div.className = 'item';

            div.innerHTML = `
                <p>${item}</p>
                            
                <div class="button-wrapper">
                    <button id="done-${i}" class="doneButton" type="button"><i class="fa-solid fa-check"></i></button>
                    <button id="edit-${i}" class="editButton" type="button"><i class="fa-solid fa-pen"></i></button>
                    <button id="delete-${i}" class="deleteButton" type="button"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            itemContainer.appendChild(div);

            document.getElementById(`done-${i}`).addEventListener("click", () => setTaskAsDone(div));
            document.getElementById(`delete-${i}`).addEventListener("click", () => deleteTask(div));
            document.getElementById(`edit-${i}`).addEventListener("click", () => editTask(div));
        }

        i++;
    })
})