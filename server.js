// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Function to read directory and return structured file list
// function getFiles(dir, baseDir = dir) {
//     let fileList = [];
//     const files = fs.readdirSync(dir);

//     files.forEach(file => {
//         const filePath = path.join(dir, file);
//         const stat = fs.statSync(filePath);
//         const relativePath = path.relative(baseDir, filePath);

//         if (stat.isDirectory()) {
//             fileList.push({ name: relativePath, isDir: true });
//             const nestedFiles = getFiles(filePath, baseDir);
//             fileList = fileList.concat(nestedFiles);
//         } else {
//             fileList.push({ name: relativePath, isDir: false });
//         }
//     });

//     console.log(fileList);

//     return fileList;
// }


const app = express();


// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });



// // Export the Express API
// // module.exports = app;


  
const express = require("express"); 
const app = express(); 
const path = require('path');
  
app.use(express.static(path.join(__dirname, 'public')));

// Function to read directory and return structured file list
function getFiles(dir, baseDir = dir) {
    let fileList = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const relativePath = path.relative(baseDir, filePath);

        if (stat.isDirectory()) {
            fileList.push({ name: relativePath, isDir: true });
            const nestedFiles = getFiles(filePath, baseDir);
            fileList = fileList.concat(nestedFiles);
        } else {
            fileList.push({ name: relativePath, isDir: false });
        }
    });

    return fileList;
}

app.get('public/documentation', (req, res) => {
    const fileList = getFiles(path.join(__dirname, 'public/documentation'));
    res.json(fileList);
});


module.exports = app;

