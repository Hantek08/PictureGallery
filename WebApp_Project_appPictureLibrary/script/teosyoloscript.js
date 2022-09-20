//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON ="picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load even
//use the DOMContentLoaded, or window load event to read the library async and render the images

let albumCollection = [];
let testAlbumCollection = [];
let currentImg = 0;

document.addEventListener('DOMContentLoaded', async () => {
  
  library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server 
  
if (localStorage.getItem("pictureLibrary") == null) {
    localStorage.setItem("pictureLibrary", JSON.stringify(library));
  }
  const libraryFromLocalStorage = localStorage.getItem("pictureLibrary");
  const parsedLibrary = JSON.parse(libraryFromLocalStorage);
  const albums = parsedLibrary.albums;

  //library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON
  for (
    let albumIndex = 0;
    albumIndex < albums.length;
    albumIndex++
  ) // for (const album of library.albums)
  {
    renderAlbumHeader(
      albums[albumIndex].headerImage,
      albums[albumIndex].path,
      albums[albumIndex].comment,
      albums[albumIndex].title,
      albums[albumIndex].id,
      true,
      albumIndex
    );
    let elements = document.querySelectorAll(".FlexItem");
    let FlexTwoElements = document.querySelectorAll(".Flex-two");

    for (const element of elements) {
      element.addEventListener("click", function () {
        if (this.dataset.albumId == albums[albumIndex].id) {
          const pictures = albums[albumIndex].pictures;
          for (
            let pictureIndex = 0;
            pictureIndex < pictures.length;
            pictureIndex++
          ) {
            const albumPicIndex = `${albumIndex}_${pictureIndex}`;
            renderAlbumGallery(
              `${this.dataset.albumPath}/${pictures[pictureIndex].imgLoRes}`,
              pictures[pictureIndex].comment,
              `${this.dataset.albumPath}/${pictures[pictureIndex].imgHiRes}`,
              `${this.dataset.albumPath}/${pictures[pictureIndex].imgLoRes}`,
              pictures[pictureIndex].title,
              pictures[pictureIndex].id,
              false,
              albumPicIndex
            );
          }
        }
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = "none";
        }
         for (var i = 0; i < FlexTwoElements.length; i++){
          FlexTwoElements[i].style.display = "flex";
        }
        let h2 = document.querySelector(".Gallery-Title");
        h2.textContent = this.dataset.title;
        var btn = document.createElement("button");
        btn.setAttribute("id", "backToMainButton")
        btn.onclick = function() {
          backToMainPageClicked();
        }
        btn.textContent = "Back";
        h2.appendChild(btn);
      });
    }   
  }

          var modal = document.getElementById("myModal");
          var modalImg = document.getElementById("img01");
          var pictureComment = document.getElementById("caption");
          var picTitle = document.createElement("h2");
          var nextButton = document.createElement("button");

          pictureComment.setAttribute("contenteditable", "true");
          picTitle.setAttribute("contenteditable", "true");



          nextButton.setAttribute("value", "next");
          nextButton.setAttribute("class", "nextButton")
          picTitle.setAttribute("class", "pictureTitle");
          modal.appendChild(picTitle);
          modal.appendChild(nextButton);

       let images = document.querySelectorAll(".FlexItem");

       images.forEach(function(img) {

         img.onclick = function() {
          albumCollection = {};  
          testAlbumCollection = []; 

          const container = document.querySelector('.Flex-two');
          removeAllChildNodes(container);
          for (const album of library.albums) {
            for (const picture of album.pictures){
              if (album.path === this.dataset.albumPath){
                renderAlbumGallery(`${this.dataset.albumPath}/${picture.imgLoRes}`, picture.comment, `${this.dataset.albumPath}/${picture.imgHiRes}`, `${this.dataset.albumPath}/${picture.imgLoRes}`, picture.title, picture.id); 
              }
            }
          }
          
          let galleryImg = document.querySelectorAll(".FlexItem-two");
   
          //Open image modal
          galleryImg.forEach(function(img) {
            img.onclick = function(){
              modal.style.display = "inline-block";
            //   pictureComment.innerHTML = this.dataset.imgComment;
            //   picTitle.innerHTML = this.dataset.pictureTitle;
              modalImg.src = this.dataset.imgResPath;
              

              //   for (let i = 0; i < albums.length; i++){
              //   for (let k = 0; k < albums[i].pictures.length; k++){
              //      if (albums[i].pictures[k].id === this.dataset.picId){
              //       //  let x = albums.indexOf(key);
              //       // let y = albums[x].pictures.indexOf(pic);
              //       modal.onclick = function() {
              //         albums[i].pictures[k].comment = pictureComment.textContent;
              //         localStorage.setItem("pictureLibrary",JSON.stringify(albums));
              //         let ls = localStorage.getItem("pictureLibrary");
              //         console.log(ls[i].pictures[k]);
              //       }
              //   }
              // }}

              // let testLocalStorage = JSON.parse(localStorage.getItem("pictureLibrary"));
              // for (const key of testLocalStorage.albums){
              //   for (const pic of key.pictures){
              //     if (pic.id === this.dataset.picId){
              //       modal.onclick = function() {
              //         // console.log("pictureComment.innerhtml == " + pictureComment.innerHTML);
              //         // console.log("pic.comment == " + pic.comment);
              //         // console.log(testLocalStorage.albums[1].pictures[1].title);


              //         console.log(pic.id);
              //         console.log(key.id);
              //         console.log(key);
              //         console.log(pic);
                      
              //         let x = testLocalStorage.albums.indexOf(key);
              //         let y = testLocalStorage.albums[x].pictures.indexOf(pic);
              //         console.log(testLocalStorage.albums.indexOf(key));
              //         testLocalStorage.albums[x].pictures[y].comment = pictureComment.textContent;
              //          console.log(testLocalStorage.albums[x].pictures.indexOf(pic));

              //          console.log(testLocalStorage.albums[x].pictures[y].comment);
                       
                       
              //         // localStorage.setItem("pictureLibrary", )
              //         // let albumIdx = testLocalStorage.albums.indexOf(key);
              //         // let picIdx =  testLocalStorage.albums[albumIdx].indexOf(pic.id);
              //         // console.log(albumIdx);
              //         // console.log(picIdx);                    
              //       }
              //     }
              //   }
              // }

              // modal.onclick = function() {
              //   for (let i = 0; i < albums.length; i++){
              //     for (let k = 0; k < albums[i].pictures.length; k++){
              //       if (albums[i].pictures[k].id === this.dataset.picId){
              //         console.log(this.dataset.picId);
              //       }
              //     }
              //   }
              // }


                // let testLocalStorage = JSON.parse(localStorage.getItem("pictureLibrary"));
                // for (let i = 0; i < testLocalStorage.albums.length; i++){
                //   for (let k = 0; k < testLocalStorage.albums[i].pictures.length; k++){
                //     if (testLocalStorage.albums[i].pictures[k].id === this.dataset.picId){
                //       modal.onclick = function() {
                //         // console.log(testLocalStorage.albums[i].pictures[k].title);
                //         testLocalStorage.albums[i].pictures[k].title = picTitle.innerHTML;
                //        localStorage.setItem("pictureLibrary", JSON.stringify(testLocalStorage));
                //       }
                //     }
                //   }
                // }
              

            }


            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              modal.style.display = "none";
              currentImg = 2;
            }
          })


          //NEXT IMAGE ON BTN CLICK
          nextButton.onclick = function() {
            if (currentImg < testAlbumCollection.length){

              modalImg.src = testAlbumCollection[currentImg].hiResPath;
              pictureComment.innerHTML  = testAlbumCollection[currentImg].comment;
              picTitle.innerHTML = testAlbumCollection[currentImg].title;
              currentImg++;
              
              if (currentImg === testAlbumCollection.length){
                modalImg.src = testAlbumCollection[testAlbumCollection.length -1].hiResPath;
                currentImg = 0;
              }
            }
            }
         }
       })

      });


function backToMainPageClicked(){
     let FlexTwoElements = document.querySelectorAll(".Flex-two");
     for (var i = 0; i < FlexTwoElements.length; i++) {
          FlexTwoElements[i].style.display = "none";
        }
      document.querySelector("#backToMainButton").remove();
      document.querySelector(".Gallery-Title").textContent = "";

      let FlexWrapElements = document.querySelectorAll(".FlexItem");
       for (var i = 0; i < FlexWrapElements.length; i++) {
          FlexWrapElements[i].style.display = "block";
        }

}


//Render the images
function renderAlbumHeader(src, tag, comment, title, id) {
  
  const div = document.createElement('div');
  div.className = `FlexItem`;
  div.dataset.albumPath = tag;
  div.dataset.albumId = id;
  div.dataset.title = title;
  
  const img = document.createElement('img');
  img.src = src;
  div.appendChild(img);

  const titleDiv = document.createElement('div');
  
  const text = document.createElement('p');
  text.textContent = title;
  titleDiv.appendChild(text);
  div.appendChild(titleDiv);

  const p = document.createElement('p');
  p.className = 'albumTitle';
  p.textContent = comment;
  div.appendChild(p);
  
  const imgFlex = document.querySelector('.FlexWrap');
  imgFlex.appendChild(div);

};

function renderAlbumGallery(src, comment, hiResPath, loResPath, title, id, isAlbum, albumPicIndex) {
  const div = document.createElement('div');
  div.className = 'FlexItem-two';
  div.dataset.imgComment = comment;
  div.dataset.pictureTitle = title;
  div.dataset.picId = id;

  const imageComment = document.createElement("p");
  imageComment.setAttribute("id", "imageComment");
  imageComment.textContent = comment;

  let arrObj1 = {comment: comment, hiResPath: hiResPath, title: title};

            testAlbumCollection.push(arrObj1);

               let testString = hiResPath;
              const idx = testString.lastIndexOf('/');
              const newString = testString.slice(idx, testString.length);

              if (newString === '/undefined'){
                div.dataset.imgResPath = loResPath;
                albumCollection[title] = loResPath;
              }
              else {
               div.dataset.imgResPath = hiResPath;
               albumCollection[title] = hiResPath;
              }
    

  const commentDiv = document.createElement('div');
  const commentDivText = document.createElement('p');

  const fullComment = comment;
  commentDivText.textContent = fullComment.substring(0, 28) + "...";
  commentDiv.appendChild(commentDivText);
  div.appendChild(commentDiv);

  const img = document.createElement('img');
  img.src = src;
  div.appendChild(img);

  const imgFlex = document.querySelector('.Flex-two');
  imgFlex.appendChild(div);
}
   
function editCommentEventListner(btn, albumIndex, pictureIndex, com) {
  btn.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
      lib.albums[albumIndex].pictures[pictureIndex].comment = com.textContent;
      localStorage.setItem("pictureLibrary", JSON.stringify(lib));

      com.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].comment;
    }
  });
}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}