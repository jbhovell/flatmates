import os
import json
import flask
from flask import jsonify, request, render_template, send_from_directory

app = flask.Flask(__name__)
app.config["DEBUG"] = True

with open('users.json', 'r+') as f:
    database = json.load(f)

db_users = database['users']


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/api/users', methods=['GET'])
def users():
    return jsonify(db_users)


@app.route('/api/user', methods=['GET'])
def user():
    if request.args:
        user = next(
            item for item in db_users if item["name"] == request.args['name'].lower())
        if user:
            return jsonify(user)
        else:
            return f"no user found for name {request.args['name']}",  404
    else:
        return "ERROR: please provide a user name to search",  400


@app.route('/api/add', methods=['POST'])
def add():
    if request.json:
        user = {"name": request.json['user'].lower(),
                "owes": {}, "owed_by": {}, "balance": 0.0}
        db_users.append(user)
        json.dump(database, f)
        return jsonify(user)
    else:
        return "ERROR: please provide a user name to add ",  400


@app.route('/api/borrow', methods=['POST'])
def borrow():
    lender = request.json['lender'].lower()
    borrower = request.json['borrower'].lower()
    amount = float(request.json['amount'])
    update(lender, borrower, amount)
    json.dump(database, f)

    return users()


def update(lender, borrower, amount):
    lu = next(item for item in db_users if item["name"] == lender)
    bu = next(item for item in db_users if item["name"] == borrower)

    l_debtors = lu['owed_by']
    l_creditors = lu['owes']
    if borrower in l_debtors:
        l_debtors[borrower] += amount
    elif borrower in l_creditors:
        owes_value = l_creditors[borrower]
        total = amount - owes_value
        if total < 0:
            l_creditors[borrower] = abs(total)
        elif total > 0:
            del l_creditors[borrower]
            l_debtors[borrower] = total
        else:
            del l_creditors[borrower]
    else:
        l_debtors[borrower] = amount
    lu['balance'] = round(lu['balance'] + amount, 2)

    b_creditors = bu['owes']
    b_debtors = bu['owed_by']
    if lender in b_creditors:
        b_creditors[lender] += amount
    elif lender in b_debtors:
        owed_by_value = b_debtors[lender]
        total = amount - owed_by_value
        if total < 0:
            b_debtors[lender] = abs(total)
        elif total > 0:
            del b_debtors[lender]
            b_creditors[lender] = total
        else:
            del b_debtors[lender]
    else:
        b_creditors[lender] = amount
    bu['balance'] = round(bu['balance'] - amount, 2)


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
