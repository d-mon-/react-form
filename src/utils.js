function setValue(store, path, value) {
    const newStore = {...store};
    let previousMap = newStore;
    let lastIndex = path.length - 1;
    
    // Immutability of Map
    for (let i = 0; i < lastIndex; i++) {
        const key = path[i];
        const currentMap = previousMap[key];
        const updatedMap = (typeof currentMap === 'object') ? {...currentMap} : {}; // overwrite
        previousMap[key] = updatedMap
        previousMap = updatedMap; // assign the next map in line before looping
    }
    previousMap[path[lastIndex]] = value;
    return newStore;
}

function recursiveDelete(store, path, depth) {

}

export function unsetValue(store, path) {
    const newStore = {...store};
    let previousMap = newStore;
    let lastIndex = path.length - 1;
}
