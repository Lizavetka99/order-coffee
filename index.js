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