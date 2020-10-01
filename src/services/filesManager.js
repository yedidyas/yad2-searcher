const fs = require('fs');

async function write(context, fileName) {
    try {
        await fs.writeFileSync(fileName, context);
        console.log(`File ${fileName} written successfully`);
    } catch (ex) {
        console.log(`Failed write to file ${fileName} with error: ${ex}`);
    }
}

async function read(fileName) {
    try {
        const data = await fs.readFileSync(fileName, 'binary');
        console.log(`File ${fileName} read successfully`);

        return data;
    } catch (ex) {
        console.log(`Failed read from file ${fileName} with error: ${ex}`);
    }
}


module.exports = {
    write: write,
    read: read
}