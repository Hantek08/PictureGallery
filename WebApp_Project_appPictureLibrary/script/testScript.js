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
  //library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

for (const album of library.albums) {
    renderAlbumHeader(album.headerImage, album.path, album.comment, album.title);
}
      
          var modal = document.getElementById("myModal");
          var modalImg = document.getElementById("img01");
          var captionText = document.getElementById("caption");
          var picTitle = document.createElement("h2");
          var nextButton = document.createElement("button");
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

          // alert(this.dataset.albumPath);   
          const container = document.querySelector('.Flex-two');
          removeAllChildNodes(container);
          for (const album of library.albums) {
            for (const picture of album.pictures){
              if (album.path === this.dataset.albumPath){
                renderAlbumGallery(`${this.dataset.albumPath}/${picture.imgLoRes}`, picture.comment, `${this.dataset.albumPath}/${picture.imgHiRes}`, `${this.dataset.albumPath}/${picture.imgLoRes}`, picture.title); 
                  let h2 = document.querySelector('#Gallery-Title');
                 h2.textContent = album.title;
              }
            }
          }
          
    
          let galleryImg = document.querySelectorAll(".FlexItem-two");
   
          galleryImg.forEach(function(img) {
            img.onclick = function(){
              modal.style.display = "inline-block";
              captionText.innerHTML = this.dataset.imgComment;
              picTitle.innerHTML = this.dataset.pictureTitle;
              modalImg.src = this.dataset.imgResPath;
              
            }

            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              modal.style.display = "none";
              picTitle.textContent = null;
              captionText.textContent = null;
              currentImg = 2;
            }
          })

          nextButton.onclick = function() {
              picTitle.innerHTML = null;
              captionText.innerHTML = null;
            if (currentImg < testAlbumCollection.length){
              
      
              modalImg.src = testAlbumCollection[currentImg].hiResPath;
              captionText.innerHTML  = testAlbumCollection[currentImg].comment;
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
      })




//Render the images
function renderAlbumHeader(src, tag, comment, title) {
  
  const div = document.createElement('div');
  div.className = `FlexItem`;
  div.dataset.albumPath = tag;
  
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

function renderAlbumGallery(src, comment, hiResPath, loResPath, title) {
  const div = document.createElement('div');
  div.className = 'FlexItem-two';
  div.dataset.imgComment = comment;
  div.dataset.pictureTitle = title;
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
   
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}