//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
"use strict"; // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from "../model/picture-library-browser.js";

const libraryJSON = "picture-library.json";
let library; //Global varibale, Loaded async from the current server in window.load event
let galleryAlbumArray = [];
let slideIdx = 0;
//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener("DOMContentLoaded", async () => {
  library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON); //reading library from JSON on local server
  //library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instea d of reading JSON
  if (localStorage.getItem("pictureLibrary") == null) {
    localStorage.setItem("pictureLibrary", JSON.stringify(library));
  }
  // localStorage.setItem("pictureLibrary", JSON.stringify(library));

  const libraryFromLocalStorage = localStorage.getItem("pictureLibrary");
  const parsedLibrary = JSON.parse(libraryFromLocalStorage);
  const albums = parsedLibrary.albums;

  for (let albumIndex = 0; albumIndex < albums.length; albumIndex++) {
    renderImage(
      albums[albumIndex].headerImage,
      albums[albumIndex].id,
      albums[albumIndex].title,
      albums[albumIndex].comment,
      true,
      albumIndex
    );

    let elements = document.querySelectorAll(".FlexItem");
    let secondElements = document.querySelectorAll(".FlexItem-two");

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
            renderImageGallery(
              `${albums[albumIndex].path}/${pictures[pictureIndex].imgLoRes}`,
              pictures[pictureIndex].id,
              pictures[pictureIndex].comment,
              pictures[pictureIndex].title,
              albumPicIndex,  
            );
          }
        }
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = "none";
        }
        for (var i = 0; i < secondElements.length; i++) {
          secondElements[i].style.display = "flex";
        }

        let h2 = document.querySelector(".Gallery-Title");
        h2.textContent = this.dataset.title;

        var backToMainButton = document.createElement("button");
        backToMainButton.setAttribute("id", "backToMainButton")
        backToMainButton.style.display = "inline-block";
        backToMainButton.onclick = function() {
          backToMainPageClicked();
        } 
        backToMainButton.textContent = "Back";

        var showGallerySlideShowButton = document.createElement("button");
        showGallerySlideShowButton.setAttribute("id", "showGallerySlideShowButton");
        showGallerySlideShowButton.textContent = "View images";
        showGallerySlideShowButton.onclick = function() {
            showGallerySlideShow();
        }

        var buttonDiv = document.createElement('div');
        buttonDiv.appendChild(backToMainButton);
        buttonDiv.appendChild(showGallerySlideShowButton);

        h2.appendChild(buttonDiv);
      });
    }
  }
  
          var modal = document.getElementById("myModal");
          var modalImg = document.getElementById("img01");
          var pictureComment = document.getElementById("caption");
          var picTitle = document.createElement("h2");

          picTitle.setAttribute("class", "pictureTitle");
          modal.appendChild(picTitle);

         let images = document.querySelectorAll(".FlexItem");
         images.forEach(function(img) {
         img.onclick = function() {
          let galleryImg = document.querySelectorAll(".FlexItem-two");
            
          //Open image modal
          galleryImg.forEach(function(img) {
            img.onclick = function(){

              modal.style.display = "inline-block";
              let albumIdx = this.dataset.aIdx;
              let picIdx = this.dataset.pIdx;
              let src = this.dataset.src;
               modalImg.src = src;

               let storage = JSON.parse(localStorage.getItem("pictureLibrary"));

               pictureComment.textContent = storage.albums[albumIdx].pictures[picIdx].comment;
               picTitle.textContent = storage.albums[albumIdx].pictures[picIdx].title;
               pictureComment.contentEditable = true;
               picTitle.contentEditable = true;
               editCommentEventListner(pictureComment, albumIdx, picIdx, pictureComment);
               editTitleEventListner(picTitle, albumIdx, picIdx, picTitle);
              //  for(let i = 0; i < galleryAlbumArray.length; i++){
              //   if (galleryAlbumArray[i].picIdx === picIdx){
              //     galleryAlbumArray[i].comment = pictureComment.textContent;
              //     galleryAlbumArray[i].title = picTitle.textContent;
              //   }
              //  }           
            }
          }
          )}
          closeWindow();

    })

});


//Render the images
function renderImage(src, tag, title, comment, isAlbum, albumPicIndex) {
  const div = document.createElement("div");
  div.className = `FlexItem`;
  div.dataset.albumId = tag;
  div.dataset.title = title;

  const img = document.createElement("img");
  img.src = src;
  div.appendChild(img);

    const titleDiv = document.createElement('div');

const headerComment = document.createElement('p');
headerComment.className = 'albumComment';
headerComment.textContent = comment;
div.appendChild(headerComment);

const headerTitle = document.createElement('p');
headerTitle.textContent = title;
titleDiv.appendChild(headerTitle);
div.appendChild(titleDiv);

  //IS BELOW IF STATEMENT NESSESCARY? SHOULD IT BE EDITABLE? INTERFERES WITH ONCLICK TO SHOW GALLERY
  if (!isAlbum) {
    comment.contentEditable = true;
    // const editCommentBtn = document.createElement("button");
    // editCommentBtn.textContent = "Edit";
    comment.dataset.index = albumPicIndex;
    // div.appendChild(editCommentBtn);
    const albIndex = albumPicIndex.split("_")[0];
    const picIndex = albumPicIndex.split("_")[1];
    //
    //editCommentEventListner(comment, albIndex, picIndex, comment);
  }

  const imgFlex = document.querySelector(".FlexWrap");
  imgFlex.appendChild(div);
}

function renderImageGallery(src, tag, pictureComment, picTitle, albumPicIndex) {
  const div = document.createElement("div");
  div.className = `FlexItem-two`;
  div.dataset.src = src;

  const commentDiv = document.createElement('div');
  const commentText = document.createElement('p');
  
  const fullComment = pictureComment;

  commentText.textContent = fullComment.substring(0, 28) + "...";
  commentDiv.appendChild(commentText);
  div.appendChild(commentDiv);

  const img = document.createElement("img");
  img.src = src;
  div.appendChild(img);

  // commentText.contentEditable = true;
    commentText.dataset.index = albumPicIndex;
    const albIndex = albumPicIndex.split("_")[0];
    const picIndex = albumPicIndex.split("_")[1];
    div.dataset.aIdx = albIndex;
    div.dataset.pIdx = picIndex;
    // editCommentEventListner(commentText, albIndex, picIndex, commentText);
    //
    let galleryAlbum = {albumIdx: albIndex, picIdx: picIndex, comment: pictureComment, title: picTitle};
    galleryAlbumArray.push(galleryAlbum);
  

  const imgFlex = document.querySelector(".Flex-two");
  imgFlex.appendChild(div);
}

function editCommentEventListner(btn, albumIndex, pictureIndex, com) {
  btn.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
      lib.albums[albumIndex].pictures[pictureIndex].comment = com.textContent;
      localStorage.setItem("pictureLibrary", JSON.stringify(lib));

      com.textContent = lib.albums[albumIndex].pictures[pictureIndex].comment;
    }
  });
}
function editTitleEventListner(btn, albumIndex, pictureIndex, com) {
  btn.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
      lib.albums[albumIndex].pictures[pictureIndex].title = com.textContent;
      localStorage.setItem("pictureLibrary", JSON.stringify(lib));
      com.textContent = lib.albums[albumIndex].pictures[pictureIndex].title;
    }
  });

  return com.textContent;
}

function backToMainPageClicked(){
     let FlexTwoElements = document.querySelectorAll(".FlexItem-two");
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
   
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function showGallerySlideShow() {
          var modal = document.getElementById("myModal");
          var modalImg = document.getElementById("img01");
          var pictureComment = document.getElementById("caption");
          var picTitle = document.createElement("h2");
          var nextButton = document.createElement("button");

          nextButton.setAttribute("value", "next");
          nextButton.setAttribute("class", "nextButton");
          picTitle.setAttribute("class", "pictureTitle");
          modal.appendChild(picTitle);
          modal.appendChild(nextButton);
          

          const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
          modal.style.display = "inline-block";

          let albumIndex = galleryAlbumArray[0].albumIdx;
         slideIdx = galleryAlbumArray[0].picIdx;

          let albumPath = lib.albums[albumIndex].path;
          let picId = lib.albums[albumIndex].pictures[slideIdx].imgLoRes;

          modalImg.src = `${albumPath}/${picId}`;
          pictureComment.textContent = lib.albums[albumIndex].pictures[slideIdx].comment;
          picTitle.textContent = lib.albums[albumIndex].pictures[slideIdx].title;
          
        //   nextButton.onclick = function() {
        //     if(slideIdx === galleryAlbumArray.length){
        //       slideIdx = 0;
        //     }
        //     let albumPath = lib.albums[albumIndex].path;
        //     let picId = lib.albums[albumIndex].pictures[slideIdx].imgLoRes;
        //     console.log(galleryAlbumArray.length);
        //     console.log(slideIdx);
        //     console.log(`${albumPath}/${picId}`);
        //     modalImg.src = `${albumPath}/${picId}`;
        //     slideIdx++;
        //   }
        
          //  modalImg.src = galleryAlbumArray[0].path;
          //  pictureComment.textContent = galleryAlbumArray[0].comment;
          //  picTitle.textContent = galleryAlbumArray[0].title;

          //  picTitle.contentEditable = false;
          //  pictureComment.contentEditable = false;

          //  let imgIdx = 0;
          //  nextButton.onclick = function() {
          //   if (imgIdx <= galleryAlbumArray.length){
          //     imgIdx++;
          //     if (imgIdx === galleryAlbumArray.length){
          //       imgIdx = 0;
          //     }
          //     modalImg.src = galleryAlbumArray[imgIdx].path;
          //     pictureComment.textContent = galleryAlbumArray[imgIdx].comment;
          //     picTitle.textContent = galleryAlbumArray[imgIdx].title;
          //   }
          //  }
       closeWindow();

}

function closeWindow(){

             var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            var pictureComment = document.getElementById("caption");
          var picTitle = document.createElement("h2");

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              pictureComment.textContent = "";
              picTitle.textContent = "";
              modal.style.display = "none";
              slideIdx = 0;
            }
}