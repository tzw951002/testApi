const fs = require('fs');
const csv = require('csv-parser');


const orderBook = new Map();

function loadCSV() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('./csv/order_books.csv')
            .pipe(csv(['time', 'code', 'price']))
            .on('data', (row) => {
                const code = row.code;
                const time = new Date(row.time.substring(0, 19));
                const price = parseInt(row.price, 10);

                if (!orderBook.has(code)) {
                    orderBook.set(code, []);
                }

                orderBook.get(code).push({ time, price });
            })
            .on('end', () => {
                for (const list of orderBook.values()) {
                    list.sort((a, b) => a.time - b.time);
                }
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

module.exports = {
    orderBook,
    loadCSV
};
