

    // const testJson = require('../app-data/library/picture-library.json');
    // console.log(testJson.albums[0].id);


//READS ENTIRE JSONSTRING
// const fs = require('fs');
// fs.readFile('./app-data/library/picture-library.json', 'utf-8', (err, jsonString) => {
//     if (err){
//         console.log(err);
//     }else {
//         console.log(jsonString);

//     }
    
// })

//READS ENTIRE JSON STRING AND ENABLES SPECIFICITY
// const fs = require('fs');
// fs.readFile('./app-data/library/picture-library.json', 'utf-8', (err, jsonString) => {
//     if (err){
//         console.log(err);
//     }
//     else {
//     try{
//         const data = JSON.parse(jsonString);
//         console.log(data.albums[0].title);
//     }
//     catch(err) {
//         console.log('Error parsing JSON', err)
//     }
// }
    
// })


//HELPER FUNCTION
const fs = require('fs');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if(err){
            return cb && cb(err);
        }

        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        }
        catch (err) {
            return cb && cb(err);
        }
    });
}

// TESTING ABOVE HELPER FUNCTION
jsonReader('./app-data/library/picture-library.json', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data.albums[2].pictures[0].title);
    }
})

const newObject = {
    id: '12939',
    title: 'Teos Testalbum',
    comment: 'Teo testar att lägga in ett objekt genom JSON Strinigfy',
    path: 'testDirectory/bilder/',
    headerImage: 'ettNamnPå-En-Bild.jpg',
    pictures:  [
                {
                    id: "123",
                    title: "titel på testbild 1",
                    comment: "kommentar bild 1",
                    imgLoRes: "lowresimg1~small.jpg",
                    imgHiRes: "highresim1~orig.jpg"
                },
                {
                    id: "3456",
                    title: "titel på testbild 2",
                    comment: "kommentar bild 2",
                    imgLoRes: "lowresimg2~small.jpg",
                    imgHiRes: "highresimg2~orig.jpg"
                },
            ]
}
//CHECKING ABOVE CREATED OBJECT (CREATED AS JAVASCRIPT VALUES) NOW CONVERTED TO A JSON OBJECT
// const jsonString = JSON.stringify(newObject);
// console.log(jsonString);


//WRITING OBJECT TO NEW JSONFILE
//(.., null, 2) prettifes json string in new file
// fs.writeFile('./app-data/library/teos-testJson.json', JSON.stringify(newObject, null, 2), err => {
//     if (err) {
//         console.log(err);
//     }
//     else{
//         console.log("File Succesfully written. Check app-data folder");
//     }
// })

//NEW JSONREADER FUNCTION TO READ FROM EXISTING JSON FILE, MODIFY IT AND THEN SAVE IT
jsonReader('./app-data/library/picture-library.json', (err, data) => {
    if (err){
        console.log(err);
    }
    else {
        data.albums[1].pictures[1].comment = "Teos kommentar skriven via json writefile + stringify-metod";
        fs.writeFile('./app-data/library/picture-library.json', JSON.stringify(data, null, 2), err=> {
            if (err){
                console.log(err);
            }
        })
    }
})

