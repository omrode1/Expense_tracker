$(document).ready(function() {
    $('#expense-form').on('submit', function(event) {
        event.preventDefault();
        const amount = $('#amount').val();
        const category = $('#category').val();
        const date = $('#date').val();
        $.ajax({
            url: '/add_expense',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amount, category, date }),
            success: function(response) {
                alert(response.message);
                $('#expense-form')[0].reset();
            }
        });
    });

    $('#expenses-list').on('click', '.edit-button', function() {
        const id = $(this).data('id');
        // Populate form with current data and handle update
    });


    $('#expenses-list').on('click', '.delete-button', function() {
        const id = $(this).data('id');
        $.ajax({
            url: `/delete_expense/${id}`,
            method: 'DELETE',
            success: function(response) {
                alert(response.message);
                // Refresh the list
            }
        });
    });

    $('#category-form').on('submit', function(event) {
        event.preventDefault();
        const category = $('#category-query').val();
        $.ajax({
            url: `/expenses/${category}`,
            method: 'GET',
            success: function(response) {
                $('#expenses-list').empty();
                response.forEach(expense => {
                    $('#expenses-list').append(`<li class="list-group-item">${expense[1]} - ${expense[2]} - ${expense[3]}</li>`);
                });
            }
        });
    });

    $('#summary-button').on('click', function() {
        $.ajax({
            url: '/summary',
            method: 'GET',
            success: function(response) {
                $('#summary-list').empty();
                response.forEach(summary => {
                    $('#summary-list').append(`<li class="list-group-item">${summary[0]}: ${summary[1]}</li>`);
                });
            }
        });
    });

    $('#summary-button').on('click', function() {
        $.ajax({
            url: '/summary',
            method: 'GET',
            success: function(response) {
                $('#summary-list').empty();
                let categories = [];
                let totals = [];
                response.forEach(summary => {
                    categories.push(summary.category);
                    totals.push(summary.total);
                    $('#summary-list').append(`<li class="list-group-item">${summary.category}: ${summary.total}</li>`);
                });
                var ctx = document.getElementById('expense-chart').getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: 'Expenses',
                            data: totals,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        });
    });
});
