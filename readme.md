# Expense Tracker

## Overview

Expense Tracker is a web application built with Flask, designed to help users manage their expenses. Users can add, view, update, and delete expenses, categorized by type, and view expense summaries. This application uses Flask for the backend, SQLAlchemy for ORM, and Flask-Login for user authentication.

## Features

- User registration and authentication
- Add, view, update, and delete expenses
- Filter expenses by category
- View expense summary by category
- Secure password storage using hashing

## Requirements

- Python 3.8 or higher
- Flask
- Flask-SQLAlchemy
- Flask-Login
- Werkzeug
- Bootstrap (for frontend styling)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Create and Activate a Virtual Environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Create the Database:**

   ```bash
   python -c "from your_app import db; db.create_all()"
   ```

## Configuration

1. **Set Up Environment Variables:**

   Update the `SECRET_KEY` in `app.config` with a secure key. 

   ```python
   app.config['SECRET_KEY'] = 'your_secret_key'
   ```

2. **Update Database URI (if needed):**

   By default, the database is configured to use SQLite. If you want to use a different database, update the `SQLALCHEMY_DATABASE_URI` configuration.

   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
   ```

## Usage

1. **Run the Application:**

   ```bash
   python app.py
   ```

   The application will be available at `http://127.0.0.1:5000`.

2. **Accessing the Application:**

   - **Register:** Go to `/register` to create a new account.
   - **Login:** Go to `/login` to log in to your account.
   - **Dashboard:** After logging in, you'll be redirected to `/` where you can add, view, and manage expenses.
   - **Add Expense:** Use the form to add a new expense.
   - **View Expenses:** Filter expenses by category.
   - **Get Summary:** View the summary of expenses by category.

## API Endpoints

- **Add Expense**

  ```http
  POST /add_expense
  ```

  **Request Body:**

  ```json
  {
    "amount": 100.0,
    "category": "Food",
    "date": "2024-07-22"
  }
  ```

- **Get Expenses by Category**

  ```http
  GET /expenses/<category>
  ```

- **Get Summary**

  ```http
  GET /summary
  ```

- **Update Expense**

  ```http
  PUT /update_expense/<id>
  ```

  **Request Body:**

  ```json
  {
    "amount": 120.0,
    "category": "Transport",
    "date": "2024-07-23"
  }
  ```

- **Delete Expense**

  ```http
  DELETE /delete_expense/<id>
  ```

## Contributing

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make Your Changes**

4. **Commit Your Changes**

   ```bash
   git commit -am 'Add some feature'
   ```

5. **Push to the Branch**

   ```bash
   git push origin feature/your-feature
   ```

6. **Create a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Flask-Login Documentation](https://flask-login.readthedocs.io/)
- [Werkzeug Documentation](https://werkzeug.palletsprojects.com/)
- [Bootstrap](https://getbootstrap.com/)
