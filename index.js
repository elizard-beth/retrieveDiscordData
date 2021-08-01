// constants
const fs = require('fs');
const csvParse = require('csv-string').parse;
// variables
let dir = fs.opendirSync('./messages');
let dirent = null; 

console.warn("| WARNING: ANY ERRORS IN JSON DATA WILL HAVE TO BE MANUALLY FIXED\n| THEY ARE MOST LIKELY TO HOW DISORGANISED DISCORD IS WITH YOUR DATA");
console.log("\nCreating JSON files...");

// create json files
if (!fs.existsSync('./messages.json')) {
  fs.appendFile('messages.json', '', function (err) { if (err) console.log(err); });
}
if (!fs.existsSync('./servers.json')) {
  fs.appendFile('servers.json', '', function (err) { if (err) console.log(err); });
}
if (!fs.existsSync('./applications.json')) {
  fs.appendFile('applications.json', '', function (err) { if (err) console.log(err); });
}

console.log("'Filling in' messages.json");

// messages
while ((dirent = dir.readSync()) !== null) {
  if (dirent.name === "index.json") break; 
  fs.readFile(`./messages/${dirent.name}/messages.csv`, 'utf8', function (err,data) {
    let data2;
    if (err) console.log(err);
    data.replace(/"/g, '“'); 
    data2 = csvParse(data);
    data2 = data2.map(array => array.filter((_, index) => (index + 1) % 3 === 0)); 

    fs.writeFile('./messages.json', JSON.stringify(data2), function (err) {
       if (err) console.log(err);
    });
  });
}
dir.closeSync();

console.log("'Filling in' servers.json");

// servers
dir = fs.opendirSync('./servers');
let i = 1;

while ((dirent = dir.readSync()) !== null) {
  i+=1;
  if (dirent.name === "index.json") break; 
  fs.readFile(`./servers/${dirent.name}/guild.json` , 'utf8', function (err,data) {
    if (err) console.log(err);
    data = `""${i}": ${data}`;

    fs.writeFile('./servers.json', data, function (err) {
      if (err) console.log(err);
   });
  });
}


console.log("'Filling in' applications.json\n");

//other soon
