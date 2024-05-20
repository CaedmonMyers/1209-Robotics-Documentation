const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
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

app.get('/documentation-list', (req, res) => {
    const fileList = getFiles(path.join(__dirname, 'public/documentation'));
    res.json(fileList);
});


// Serve search.js from the root directory
app.get('/search.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'search.js'));
});

// New search endpoint
app.get('/api/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const documentationDir = path.join(__dirname, 'public', 'documentation');
    const allFiles = getFiles(documentationDir);

    const results = allFiles
        .filter(file => file.name.toLowerCase().includes(query) && !file.isDir)
        .map(file => ({
            name: file.name,
            path: `/documentation/${file.name}`
        }));

    res.json(results);
});


module.exports = app;
