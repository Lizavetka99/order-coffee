let count = 1;
document.querySelector(".add-button").addEventListener("click", () => {
    count++;
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    resetFormFields(newForm);

    let newTextarea = newForm.querySelector('.user-text');
    let newOutput = newForm.querySelector('.user-output');

    newTextarea.addEventListener('input', function () {
        const userInput = this.value;
        newOutput.innerHTML = highlightKeywords(userInput);
    });

    for (let radio of newForm.querySelectorAll("input[type=radio]")) {
        radio.name = "milk" + count;
    }

    let removeButton = newForm.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
        if (count > 1) {
            newForm.remove();
            count--;
        }
    });
    forms[forms.length - 1].after(newForm);
});

document.querySelectorAll('.user-text').forEach(textarea => {
    textarea.addEventListener('input', function () {
        const userInput = this.value;
        const outputElement = this.parentElement.querySelector('.user-output');
        outputElement.innerHTML = highlightKeywords(userInput);
    });
});

document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
    updateModalTable();
});

document.querySelector('.close-model').addEventListener('click', () => {
    closeModal();
});

document.querySelector('.confirm-button').addEventListener('click', () => {
    const timeInput = document.querySelector('#order-time');
    const value = timeInput.value;
    const now = new Date();

    if (!value) {
        timeInput.classList.add('error');
        alert('Выберите время заказа');
        return;
    }

    const [hours, minutes] = value.split(':').map(Number);
    const orderTime = new Date(now);
    orderTime.setHours(hours, minutes, 0, 0);

    if (orderTime <= now) {
        timeInput.classList.add('error');
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее  🤦‍♀️ 🤦‍♀️ 🤦‍♀️');
    } else {
        closeModal();
    }
});


function openModal() {
    const overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'visible';
    document.querySelector('.status-order').textContent = updateBeverageCount();
}

function resetFormFields(form) {
    form.querySelector("h4").innerHTML = `Напиток №${count}`;
    form.querySelector('select').selectedIndex = 1;
    form.querySelector('input[type="radio"][value="usual"]').checked = true;
    form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    form.querySelector('.user-text').value = '';
    form.querySelector('.user-output').textContent = '';
}

function updateBeverageCount() {
    const num = document.querySelectorAll('fieldset').length;
    const mod = num % 10;
    return `Заказ принят! Вы заказали ${num} ${num !== 11 && mod === 1 ?
        'напиток'
        : (num > 20 && (mod === 2 || mod === 3 || mod === 4)) || (num >= 2 && num <= 4) ?
            'напитка'
            : 'напитков'}`;
}

function closeModal() {
    const overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'hidden';
}

let dict = {
    'espresso': 'Эспрессо',
    'capuccino': 'Капучино',
    'cacao': 'Какао',
    'usual': 'Обычное',
    'no-fat': 'Обезжиренное',
    'soy': 'Соевое',
    'coconut': 'Кокосовое',
}

function highlightKeywords(text) {
    const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
    const regex = new RegExp(keywords.join('|'), 'gi');
    return text.replace(regex, match => `<b>${match}</b>`);
}

function updateModalTable() {
    const beverages = [];
    const fields = document.querySelectorAll('.beverage');

    fields.forEach((field, index) => {
        const beverageName = field.querySelector('select').value;
        const milkType = field.querySelector('input[type="radio"]:checked').value;
        const extras = [];
        field.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            extras.push(checkbox.nextElementSibling.textContent);
        });
        const userText = field.querySelector('.user-text').value;
        beverages.push({
            beverage: dict[beverageName],
            milk: dict[milkType],
            extras: extras.join(', '),
            wishes: userText
        });
    });

    const modalTableBody = document.querySelector('.modal-table tbody');
    modalTableBody.innerHTML = '';

    beverages.forEach(beverage => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${beverage.beverage}</td>
            <td>${beverage.milk}</td>
            <td>${beverage.extras}</td>
            <td>${beverage.wishes}</td>
        `;
        modalTableBody.appendChild(row);
    });
}