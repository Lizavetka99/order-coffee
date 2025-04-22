document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector('.submit-button');
    const lightboxBlock = document.querySelector('.lightbox_block');
    const lightboxBackdrop = document.querySelector('.lightbox_backdrop');
    const lightboxClose = document.querySelector('.lightbox_close');

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxBlock.style.display = 'flex';
        lightboxBackdrop.style.display = 'block';
    });

    lightboxClose.addEventListener('click', () => {
        lightboxBlock.style.display = 'none';
        lightboxBackdrop.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const addButton = document.querySelector('.add-button');
    let beverageCounter = 1;

    function addDeleteButton(fieldset) {
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '×';

        deleteButton.addEventListener('click', function() {
            const allBeverages = document.querySelectorAll('.beverage');
            if (allBeverages.length > 1) {
                fieldset.remove();
                updateBeverageNumbers();
            }
        });

        fieldset.style.position = 'relative';
        fieldset.appendChild(deleteButton);
    }

    function updateBeverageNumbers() {
        const allBeverages = document.querySelectorAll('.beverage');
        allBeverages.forEach((beverage, index) => {
            beverage.querySelector('.beverage-count').textContent = `Напиток №${index + 1}`;
        });
        beverageCounter = allBeverages.length + 1;
    }

    const initialBeverage = document.querySelector('.beverage');
    addDeleteButton(initialBeverage);

    addButton.addEventListener('click', function() {
        const newBeverage = initialBeverage.cloneNode(true);

        newBeverage.querySelector('.beverage-count').textContent = `Напиток №${beverageCounter}`;
        beverageCounter++;

        const select = newBeverage.querySelector('select');
        select.selectedIndex = 1;

        const radios = newBeverage.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = radio.value === 'usual';
        });

        const checkboxes = newBeverage.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        addDeleteButton(newBeverage);

        form.insertBefore(newBeverage, addButton.parentElement);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');

    let beverageCounter = 1;

    addButton.addEventListener('click', () => {
        beverageCounter++;

        const newBeverageForm = document.querySelector('.beverage').cloneNode(true);

        newBeverageForm.querySelector('.beverage-count').textContent = `Напиток №${beverageCounter}`;

        const radioButtons = newBeverageForm.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(button => {
            button.name = `milk-${beverageCounter}`;
        });

        const checkboxes = newBeverageForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.name = `options-${beverageCounter}`;
        });

        const form = document.querySelector('form');
        form.insertBefore(newBeverageForm, addButton.parentElement);
    });
});
