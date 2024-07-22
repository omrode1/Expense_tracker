// static/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const categoryForm = document.getElementById('category-form');
    const summaryButton = document.getElementById('summary-button');

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        fetch('/add_expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, category, date }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Expense added successfully') {
                alert('Expense added successfully');
            } else {
                alert('Failed to add expense');
            }
        });
    });

    categoryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const category = document.getElementById('category-query').value;

        fetch(`/expenses/${category}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const expensesList = document.getElementById('expenses-list');
            expensesList.innerHTML = '';
            data.forEach(expense => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `Amount: ${expense.amount}, Date: ${expense.date}`;
                expensesList.appendChild(li);
            });
        });
    });

    summaryButton.addEventListener('click', function() {
        fetch('/summary', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const summaryList = document.getElementById('summary-list');
            summaryList.innerHTML = '';
            data.forEach(summary => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `Category: ${summary.category}, Total: ${summary.total}`;
                summaryList.appendChild(li);
            });

            // Displaying the data in a chart using Chart.js
            const ctx = document.getElementById('expense-chart').getContext('2d');
            const categories = data.map(item => item.category);
            const totals = data.map(item => item.total);
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: categories,
                    datasets: [{
                        data: totals,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66FF66', '#FF9933'],
                    }]
                },
                options: {
                    responsive: true
                }
            });
        });
    });
});
