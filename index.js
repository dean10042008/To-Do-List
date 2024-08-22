const inputField = document.getElementById('task');
const plusButton = document.getElementById('addButton');
const itemContainer = document.querySelector('.items-container');
let initial = document.getElementById('initial-item');

let id = 0;

function addTask() {

    id++;

    let text = inputField.value;

    if (text !== "" && text) {
        initial.style.display = 'none';

        let div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
            <p>${text}</p>
                        
            <div class="button-wrapper">
                <button id="done-${id}" class="doneButton" type="button"><i class="fa-solid fa-check"></i></button>
                <button id="delete-${id}" class="deleteButton" type="button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        inputField.value = '';

        itemContainer.appendChild(div);

        document.getElementById(`done-${id}`).addEventListener("click", () => setTaskAsDone(div));
        document.getElementById(`delete-${id}`).addEventListener("click", () => deleteTask(div));
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

    button.style.border = '1px solid gray';
    button.style.scale = '1';
    button.disabled = true;
    button.style.color = 'gray';
}

function deleteTask(div) {
    div.remove();
    
    if (itemContainer.children.length === 1) {
        initial.style.display = 'block';
    }
}