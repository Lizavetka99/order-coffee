document.addEventListener('DOMContentLoaded', function() {
    function addDeleteButton(fieldset) {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '×';

        deleteButton.addEventListener('click', function() {
            const allBeverages = document.querySelectorAll('.beverage');
            if (allBeverages.length > 1) {
                fieldset.remove();
                updateBeverageNumbers();
            }
        });

        fieldset.appendChild(deleteButton);
    }

    function updateBeverageNumbers() {
        const allBeverages = document.querySelectorAll('.beverage');
        allBeverages.forEach((beverage, index) => {
            beverage.querySelector('.beverage-count').textContent = `Напиток №${index + 1}`;
        });
    }

    const initialBeverage = document.querySelector('.beverage');
    addDeleteButton(initialBeverage);
});