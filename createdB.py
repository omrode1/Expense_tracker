import sqlite3

conn = sqlite3.connect('expenses.db')
c = conn.cursor()

# Create table
c.execute('''CREATE TABLE expenses
             (id INTEGER PRIMARY KEY, 
              amount REAL, 
              category TEXT, 
              date TEXT)''')

conn.commit()
conn.close()
