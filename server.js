// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const app = express();
// const port = 3000;

// // Middleware to handle form data
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public')); // To serve static files (e.g., CSS, images)

// // Connect to MongoDB (make sure MongoDB is running and replace '<dbname>' with your database name)
// mongoose.connect('mongodb://localhost:27017/crimeDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Define a schema for the crime data
// const crimeSchema = new mongoose.Schema({
//   crimeType: { type: String, required: true },
//   incidentDate: { type: String, required: true },
//   incidentTime: { type: String, required: true },
//   location: { type: String, required: true }
// });

// // Create a model based on the schema
// const Crime = mongoose.model('Crime', crimeSchema);

// // Endpoint to serve the HTML page
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // API endpoint to handle form submission
// app.post('/upload', (req, res) => {
//   const { crimeType, incidentDate, incidentTime, location } = req.body;

//   // Create a new Crime document
//   const newCrime = new Crime({
//     crimeType,
//     incidentDate,
//     incidentTime,
//     location
//   });

//   // Save the crime data to the database
//   newCrime.save((err) => {
//     if (err) {
//       console.error('Error saving crime data:', err);
//       res.status(500).send('Error saving crime data');
//     } else {
//       res.send('Crime data uploaded and saved successfully');
//     }
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
