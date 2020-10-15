import os
import psycopg2
import time
from flask import Flask, request, jsonify
app = Flask(__name__, static_folder='build/', static_url_path='')

@app.route('/getmsg/', methods=['GET'])
def respond():
    # Retrieve the name from url parameter
    name = request.args.get("name", None)

    # For debugging
    print(f"got name {name}")

    response = {}

    # Check if user sent a name at all
    if not name:
        response["ERROR"] = "no name found, please send a name."
    # Check if the user entered a number not a name
    elif str(name).isdigit():
        response["ERROR"] = "name can't be numeric."
    # Now the user entered a valid name
    else:
        response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"

    # Return the response in json format
    return jsonify(response)

@app.route('/post/', methods=['POST'])
def post_something():
    param = request.form.get('name')
    print(param)
    # You can add the test cases you made in the previous function, but in our case here you are just testing the POST functionality
    if param:
        return jsonify({
            "Message": f"Welcome {param} to our awesome platform!!",
            # Add this option to distinct the POST request
            "METHOD" : "POST"
        })
    else:
        return jsonify({
            "ERROR": "no name found, please send a name."
        })

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/db')
def get_db_version():
    try:
        connection = psycopg2.connect(os.environ.get("DATABASE_URL"))
        cursor = connection.cursor()

        # Print PostgreSQL version
        cursor.execute("SELECT version();")
        record = cursor.fetchone()

    except (Exception, psycopg2.Error) as error :
        print ("Error while connecting to PostgreSQL", error)
    finally:
        #closing database connection.
            if(connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")

    return {'db': record}

@app.route('/', defaults={'path': ''})
@app.errorhandler(404)
def index(path):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
