// function readCSV(callback) {
//     fetch('crime_data.csv')
//         .then(response => response.text())
//         .then(text => {
//             const rows = text.split('\n').slice(1); // Assuming first row contains headers
//             const data = rows.map(row => {
//                 const cols = row.split(',');
//                 return {
//                     city: cols[0].trim(),
//                     crimeType: cols[1].trim(),
//                     date: cols[2].trim()
//                 };
//             });
//             callback(data);
//         })
//         .catch(err => console.log('Error reading CSV file:', err));
// }
 
// function analyzeCrime() {
//     const cityName = document.getElementById('city-name').value.trim().toLowerCase();
//     const crimeType = document.getElementById('crime-type').value;

//     readCSV(data => {
//         const filteredData = data.filter(crime => {
//             return crime.city.toLowerCase() === cityName &&
//                 (crimeType === 'all' || crime.crimeType.toLowerCase() === crimeType.toLowerCase());
//         });

//         if (filteredData.length === 0) {
//             document.getElementById('crime-output').innerHTML = 'No data available for the selected city and crime type.';
//             return;
//         }

//         const crimeCounts = {};
//         filteredData.forEach(crime => {
//             const type = crime.crimeType.toLowerCase();
//             crimeCounts[type] = (crimeCounts[type] || 0) + 1;
//         });

//         const mostFrequentCrime = Object.keys(crimeCounts).reduce((a, b) => crimeCounts[a] > crimeCounts[b] ? a : b);

//         document.getElementById('crime-output').innerHTML = `
//             <h3>Crime Analysis Result:</h3>
//             <p>City Name: ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}</p>
//             <p>Most Frequent Crime: ${mostFrequentCrime.charAt(0).toUpperCase() + mostFrequentCrime.slice(1)}</p>
//         `;
//     });
// }
