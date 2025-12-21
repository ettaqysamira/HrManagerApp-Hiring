const http = require('http');

http.get('http://localhost:5076/api/OffresEmploi', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Raw Data:', data);
        try {
            const json = JSON.parse(data);
            console.log('Is array:', Array.isArray(json));
            if (Array.isArray(json)) {
                console.log('Sample item:', json[0]);
            } else {
                console.log('Properties:', Object.keys(json));
            }
        } catch (e) {
            console.error('Parse error:', e.message);
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
