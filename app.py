from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import csv

app = Flask(__name__,static_url_path='/static')

# MongoDB connection details
host = "ocdb.app"
port = "5050"
database = "db_42uk28rg8"
username = "user_42uk28rg8"
password = "p42uk28rg8"
connection_string = f"mongodb://{username}:{password}@{host}:{port}/{database}"

# Connect to MongoDB
my_client = MongoClient(connection_string)
my_db = my_client[database]
results_collection = my_db["results"]
crime_collection = my_db['crime']  # Collection for crime uploads

# Function to read CSV file
def read_csv():
    crime_data = []
    try:
        with open('crime_data1.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                crime_data.append({
                    'city': row['city'].strip(),
                    'crimeType': row['crimeType'].strip(),
                    'date': row['date'].strip()
                })
    except Exception as e:
        print(f"Error reading CSV file: {e}")
    return crime_data

# API endpoint to analyze crime data
@app.route('/analyze', methods=['GET'])
def analyze_crime():
    city_name = request.args.get('city', '').strip().lower()
    crime_type = request.args.get('crimeType', 'all').strip().lower()

    crime_data = read_csv()

    # Filter data based on city and crime type
    filtered_data = [crime for crime in crime_data if crime['city'].lower() == city_name]

    if crime_type != 'all':
        filtered_data = [crime for crime in filtered_data if crime['crimeType'].lower() == crime_type]

    if not filtered_data:
        return jsonify({"message": "No crime data available for this query"})

    # Analyze the most frequent crime in the city
    crime_count = {}
    for crime in filtered_data:
        if crime['crimeType'] in crime_count:
            crime_count[crime['crimeType']] += 1
        else:
            crime_count[crime['crimeType']] = 1

    most_frequent_crime = max(crime_count, key=crime_count.get)

    # Return the analysis result
    return jsonify({
        'city': city_name.capitalize(),
        'mostFrequentCrime': most_frequent_crime.capitalize()
    })

# Serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')  # Assumes 'index.html' is in a 'templates' folder

# API endpoint to handle form submission for uploading crime data
@app.route('/upload', methods=['POST'])
def upload_crime():
    try:
        # Get form data from request
        crime_data = {
            'crimeType': request.form['crimeType'].strip(),
            'incidentDate': request.form['incidentDate'].strip(),
            'incidentTime': request.form['incidentTime'].strip(),
            'location': request.form['location'].strip()
        }

        # Insert the crime data into MongoDB
        crime_collection.insert_one(crime_data)
        return jsonify({"message": "Crime data uploaded and saved successfully"}), 200
    except Exception as e:
        print(f"Error saving crime data: {e}")
        return jsonify({"error": "Error saving crime data"}), 500

# Start the server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
