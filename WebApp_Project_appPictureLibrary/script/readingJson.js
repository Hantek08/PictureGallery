
export function readJs(){

    const testJson = require('../app-data/library/picture-library.json');
    console.log(testJson.albums[0].id);
}

export default readJs;