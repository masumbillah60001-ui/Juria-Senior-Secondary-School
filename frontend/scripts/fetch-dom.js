const http = require('http');
const fs = require('fs');

const url = 'http://localhost:3000';
const dest = 'homepage_dom.html';

console.log(`Fetching ${url}...`);

http.get(url, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            fs.writeFileSync(dest, data);
            console.log(`DOM saved to ${dest}`);
        } else {
            console.error(`Failed with status ${res.statusCode}`);
            process.exit(1);
        }
    });

}).on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
});
