const inputField = document.getElementById('task');
const plusButton = document.getElementById('addButton');
const itemContainer = document.querySelector('.items-container');
let initial = document.getElementById('initial-item');

let i = 0;

function addTask() {

    i++;

    let text = inputField.value;

    if (text !== "" && text) {
        initial.style.display = 'none';

        let div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
            <p>${text}</p>
                        
            <div class="button-wrapper">
                <button id="done-${i}" class="doneButton" type="button"><i class="fa-solid fa-check"></i></button>
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
    let i = 0;

    arr.forEach((item) => {
        initial.style.display = 'none';

        i++;

        if (item.includes('-done')) {
            let text = item.split('-done')[0];

            let div = document.createElement('div');
            div.className = 'item';

            div.innerHTML = `
                <p><s>${text}</s></p>
                            
                <div class="button-wrapper">
                    <button id="done-${i}" class="doneButton" type="button" disabled style="border: 1px solid gray; scale: 1; color: gray"><i class="fa-solid fa-check"></i></button>
                    <button id="delete-${i}" class="deleteButton" type="button"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            itemContainer.appendChild(div);

            document.getElementById(`done-${i}`).addEventListener("click", () => setTaskAsDone(div));
            document.getElementById(`delete-${i}`).addEventListener("click", () => deleteTask(div));
        }
        else {
            let div = document.createElement('div');
            div.className = 'item';

            div.innerHTML = `
                <p>${item}</p>
                            
                <div class="button-wrapper">
                    <button id="done-${i}" class="doneButton" type="button"><i class="fa-solid fa-check"></i></button>
                    <button id="delete-${i}" class="deleteButton" type="button"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            itemContainer.appendChild(div);

            document.getElementById(`done-${i}`).addEventListener("click", () => setTaskAsDone(div));
            document.getElementById(`delete-${i}`).addEventListener("click", () => deleteTask(div));
        }
    })
})