from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Redirect to login page if not authenticated

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
            return redirect(url_for('login'))
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        flash('Account created successfully', 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/')
@login_required
def index():
    print(f'Current user: {current_user.username}')
    return render_template('index.html')

@app.route('/add_expense', methods=['POST'])
@login_required
def add_expense_route():
    data = request.get_json()
    amount = data['amount']
    category = data['category']
    date = data['date']
    user_id = current_user.id
    expense = Expense(amount=amount, category=category, date=date, user_id=user_id)
    db.session.add(expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully'})

@app.route('/expenses/<category>', methods=['GET'])
@login_required
def get_expenses_by_category(category):
    user_id = current_user.id
    expenses = Expense.query.filter_by(category=category, user_id=user_id).all()
    result = [{'id': e.id, 'amount': e.amount, 'category': e.category, 'date': e.date} for e in expenses]
    return jsonify(result)

@app.route('/summary', methods=['GET'])
@login_required
def get_summary():
    user_id = current_user.id
    expenses = db.session.query(Expense.category, db.func.sum(Expense.amount)).filter_by(user_id=user_id).group_by(Expense.category).all()
    result = [{'category': e[0], 'total': e[1]} for e in expenses]
    return jsonify(result)

@app.route('/update_expense/<int:id>', methods=['PUT'])
@login_required
def update_expense(id):
    data = request.get_json()
    expense = Expense.query.get_or_404(id)
    if expense.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
    expense.amount = data['amount']
    expense.category = data['category']
    expense.date = data['date']
    db.session.commit()
    return jsonify({'message': 'Expense updated successfully'})

@app.route('/delete_expense/<int:id>', methods=['DELETE'])
@login_required
def delete_expense(id):
    expense = Expense.query.get_or_404(id)
    if expense.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'Expense deleted successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # This creates the tables if they don't exist
    app.run(debug=True)

