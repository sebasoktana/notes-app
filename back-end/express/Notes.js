const fs = require("fs");
const { promisify } = require("util");
const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

async function readFile(path) {
    let text = await read(path);
    return text.toString();
}

async function writeFile(path, text) {
    try {
        await write(path, text);
    } catch (err) {
        return console.log(err);
    }

}

function getMax(notes) {
    let max = -1;
    notes.forEach(element => {
        if (element.id > max) {
            max = element.id;
        }
    });
    return max;
}

module.exports = {
    read: async () => {
        let notes = await readFile("Text.txt");
        console.log(notes);
        return JSON.parse(notes);
    },
    get: async (id) => {
        let text = await readFile("Text.txt");
        let notes = JSON.parse(text);
        if (notes === null) {
            return;
        }
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                return notes[i];
            }
        }
    },
    insert: async (note) => {
        let text = await readFile("Text.txt");
        let notes = JSON.parse(text);
        if (notes === null) {
            notes = []
        }
        let maxId = getMax(notes);
        note.id = parseInt(maxId) + 1;
        note.fecha = new Date();
        notes.push(note);
        await writeFile("Text.txt", JSON.stringify(notes));
        return note;
    },
    update: async (note, id) => {
        let text = await readFile("Text.txt");
        let notes = JSON.parse(text);
        if (notes === null) {
            return;
        }
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                notes[i].id = id;
                notes[i].text = note.text;
                break;
            }
        }
        await writeFile("Text.txt", JSON.stringify(notes));
    },
    clear: () => {
        localStorage.setItem('Notes', []);
    },
    delete: async (id) => {
        let text = await readFile("Text.txt");
        let notes = JSON.parse(text);
        if (notes === null) {
            return;
        }
        let i;
        for (i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                break;
            }
        }
        if(i < notes.length) {
            notes.splice(i, 1);
            await writeFile("Text.txt", JSON.stringify(notes));
        }
    }
}

