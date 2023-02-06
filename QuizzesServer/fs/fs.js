const fs = require('fs');

const readFile = (path) => {
    const content = fs.readFileSync(path, 'utf8');
    let json = JSON.parse(content);
    if (!Array.isArray(json)) {
        json = [json];
    }
    return json;
}

const insertItem = (path, item) => {
    const json = readFile(path);
    json.push(item);

    saveFile(path, json);
}

const saveFile = (path, content) => {
    fs.writeFileSync(path, JSON.stringify(content));
}

const removeItem = (path, id) => {
    const json = readFile(path);

    const updatedList = json.filter(i => i.id !== id);

    saveFile(path, updatedList);
}

const updateItem = (path, id, content) => {
    const json = readFile(path);

    const index = json.findIndex(i => i.id === id);

    json[index] = { id: id, ...content };
    console.log(json[index])

    saveFile(path, json);
    return json[index];
}


module.exports = {
    readFile,
    updateItem,
    removeItem,
    insertItem,
    saveFile,
}