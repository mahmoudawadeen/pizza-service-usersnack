import os

from flask import Flask, flash
from flask import json
from flask import jsonify
from flask import render_template
from flask import request

from flask_mail import Mail
from flask_mail import Message

app = Flask(__name__)

# for testing using maildump
# app.config['MAIL_SERVER'] = 'localhost'
# app.config['MAIL_PORT'] = 1025

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'no.reply.usersnack@gmail.com'
app.config['MAIL_PASSWORD'] = 'usersnack'
app.config['SECRET_KEY'] = 'random_string_so_random'

mail = Mail(app)


@app.route('/pizza/<int:pizza_id>')
def pizza(pizza_id):
    return render_template('index.html')


@app.route('/pizza')
@app.route('/')
def home():
    return render_template('index.html')



@app.route('/api/pizza')
def list_pizzas():
    filename = os.path.join(app.static_folder, 'data.json')
    with open(filename) as data_json:
        data = json.load(data_json)
        return jsonify(data['Pizza'])


@app.route('/api/pizza/<int:pizza_id>')
def show_pizza(pizza_id):
    filename = os.path.join(app.static_folder, 'data.json')
    with open(filename) as data_json:
        data = json.load(data_json)
        return jsonify(data['Pizza'][pizza_id - 1])


@app.route('/api/extras')
def extras():
    filename = os.path.join(app.static_folder, 'data.json')
    with open(filename) as data_json:
        data = json.load(data_json)
        return jsonify(data['Extras'])


@app.route('/api/order', methods=['POST'])
def order():
    data = json.loads(request.data)
    print data
    msg = Message("Your pizza order",
                  sender="no.reply.usersnack@gmail.com",
                  recipients=[data['email']], body="Dear " + data['name'] + ",\n you have ordered a " + data['pizza'] +
                                                   " pizza" + (" with extra(s): " + ", ".join(data['extras']) if len(
            data['extras']) > 0 else '') + " to the address: " + data['address'] + ".\n your order total is " + str(
            data['total']))
    mail.send(msg)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run()
