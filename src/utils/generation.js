function generateUUID() {
    let uuid = '';

    for (let i = 0; i < 32; i++) {
        uuid += Math.floor(Math.random() * 16).toString(16);
    }

    return uuid;
}

let generation = {
    uuid: generateUUID
};

module.exports = generation;