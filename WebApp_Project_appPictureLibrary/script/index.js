//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
"use strict"; // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from "../model/picture-library-browser.js";

const libraryJSON = "picture-library.json";
let library; //Global varibale, Loaded async from the current server in window.load even
//use the DOMContentLoaded, or window load event to read the library async and render the images

let albumCollection = [];
let testAlbumCollection = [];
let currentImg = 0;

document.addEventListener("DOMContentLoaded", async () => {
  library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON); //reading library from JSON on local server

  //   if (localStorage.getItem("pictureLibrary") == null) {
  //     localStorage.setItem("pictureLibrary", JSON.stringify(library));
  //   }
  localStorage.setItem("pictureLibrary", JSON.stringify(library));
  const libraryFromLocalStorage = localStorage.getItem("pictureLibrary");
  const parsedLibrary = JSON.parse(libraryFromLocalStorage);
  const albums = parsedLibrary.albums;

  //library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON
  for (
    let albumIndex = 0;
    albumIndex < albums.length;
    albumIndex++ // for (const album of library.albums)
  ) {
    renderImage(
      albums[albumIndex].headerImage,
      albums[albumIndex].id,
      albums[albumIndex].title,
      albums[albumIndex].comment,
      true,
      albumIndex
    );
    const albumGrid = document.querySelector(".album-grid");
    const elements = document.querySelectorAll(".flexItem");

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
              pictures[pictureIndex].title,
              pictures[pictureIndex].comment,
              false,
              albumPicIndex
            );
          }
        }
        albumGrid.style.display = "none";
        if (albumIndex == 4) {
          const imgGrid = document.querySelector(".image-grid");
          const btn = document.querySelector(".selectedImg");

          btn.addEventListener("click", function () {
            let checkedItems = document.querySelectorAll(
              "input[type='checkbox']:checked"
            );
            //console.clear();
            let checkedItemsTrue = [];

            // checkedItems.forEach(function (cb) {
            //   console.log("result", cb.value);
            // });

            for (const item of checkedItems) {
              if (item.checked == true) {
                checkedItemsTrue.push(item.value);
              }
            }
            console.log(checkedItemsTrue);
          });
        }

        if (albumIndex == 4) {
          const imgGrid = document.querySelector(".image-grid");
          const links = imgGrid.querySelectorAll(".card");
          const imgs = imageGrid.querySelectorAll("img");
          const h5 = imageGrid.querySelectorAll("h5");
          const p = imageGrid.querySelectorAll("p");
          const lightboxModal = document.getElementById("lightbox-modal");
          const bsModal = new bootstrap.Modal(lightboxModal);
          const modalBody = document.querySelector(
            ".modal-body .container-fluid"
          );
          for (const link of links) {
            link.addEventListener("click", function (e) {
              e.preventDefault();
              const currentImg = link.querySelector("img");
              const currentH5 = link.querySelector("h5");
              const currentP = link.querySelector("p");
              const lightboxCarousel =
                document.getElementById("lightboxCarousel");
              console.log("lightboxCarousel", lightboxCarousel);
              if (lightboxCarousel) {
                const parentCol = link.parentElement.parentElement;
                console.log(link.parentElement.parentElement);
                const index = [...parentCol.parentElement.children].indexOf(
                  parentCol
                );
                const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
                bsCarousel.to(index);
              } else {
                createCarousel(currentImg);
              }
              bsModal.show();
            });
          }

          function createCarousel(img) {
            console.log("img here", img);

            const markup = `
              <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000" >
                <div class="carousel-inner">
                  ${createSlides(img)}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              `;
            modalBody.innerHTML = markup;
          }

          function createSlides(img) {
            let markup = "";
            const currentImgSrc = img.getAttribute("src");

            for (const img of imgs) {
              const imgSrc = img.getAttribute("src");
              markup += `
              <div class="carousel-item${
                currentImgSrc === imgSrc ? " active" : ""
              }">
              <img src=${imgSrc} >
              </div>
              `;
            }

            return markup;
          }

          function createCaption(caption) {
            return `<div class="carousel-caption">
               <p class="m-0">${caption}</p>
              </div>`;
          }
        }

        // for (var i = 0; i < secondElements.length; i++) {
        //   secondElements[i].style.display = "grid";
        // }
        // let h2 = document.querySelector(".Gallery-Title");
        // h2.textContent = this.dataset.title;
        // var btn = document.createElement("button");
        // btn.setAttribute("id", "backToMainButton");
        // btn.onclick = function () {
        //   backToMainPageClicked();
        // };
        // btn.textContent = "Back";
        // h2.appendChild(btn);
      });
    }
  }

  //   var modal = document.getElementById("myModal");
  //   var modalImg = document.getElementById("img01");
  //   var pictureComment = document.getElementById("caption");
  //   var picTitle = document.createElement("h2");
  //   var nextButton = document.createElement("button");

  //   pictureComment.setAttribute("contenteditable", "true");
  //   picTitle.setAttribute("contenteditable", "true");

  //   nextButton.setAttribute("value", "next");
  //   nextButton.setAttribute("class", "nextButton");
  //   picTitle.setAttribute("class", "pictureTitle");
  //   modal.appendChild(picTitle);
  //   modal.appendChild(nextButton);

  //   let images = document.querySelectorAll(".FlexItem");

  //   images.forEach(function (img) {
  //     img.onclick = function () {
  //       albumCollection = {};
  //       testAlbumCollection = [];

  //       const container = document.querySelector(".Flex-two");
  //       removeAllChildNodes(container);
  //       for (const album of library.albums) {
  //         for (const picture of album.pictures) {
  //           if (album.path === this.dataset.albumPath) {
  //             renderImageGallery(
  //               `${this.dataset.albumPath}/${picture.imgLoRes}`,
  //               picture.comment,
  //               `${this.dataset.albumPath}/${picture.imgHiRes}`,
  //               `${this.dataset.albumPath}/${picture.imgLoRes}`,
  //               picture.title,
  //               picture.id
  //             );
  //           }
  //         }
  //       }

  //       let galleryImg = document.querySelectorAll(".FlexItem-two");

  //       //Open image modal
  //       galleryImg.forEach(function (img) {
  //         console.log(img);
  //         img.onclick = function () {
  //           modal.style.display = "inline-block";
  //           pictureComment.innerHTML = this.dataset.imgComment;
  //           picTitle.innerHTML = this.dataset.pictureTitle;
  //           modalImg.src = this.dataset.imgResPath;
  //           //console.log(pictureComment.textContent);
  //           // pictureComment.addEventListener("keypress", function (event) {
  //           //   if (event.key === "Enter") {
  //           //     event.preventDefault();
  //           //     const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
  //           //     lib.albums[albumIndex].pictures[pictureIndex].comment = com.textContent;
  //           //     localStorage.setItem("pictureLibrary", JSON.stringify(lib));

  //           //     com.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].comment;
  //           //   }
  //           // });
  //         };

  //         // addEventListener("keypress", function (event) {
  //         //   if (event.key === "Enter") {
  //         //     event.preventDefault();
  //         //     const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
  //         //     lib.albums[albumIndex].pictures[pictureIndex].comment = com.textContent;
  //         //     localStorage.setItem("pictureLibrary", JSON.stringify(lib));

  //         //     com.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].comment;
  //         //   }
  //         // });

  //         var span = document.getElementsByClassName("close")[0];

  //         // When the user clicks on <span> (x), close the modal
  //         span.onclick = function () {
  //           modal.style.display = "none";
  //           currentImg = 2;
  //         };
  //       });

  //       //NEXT IMAGE ON BTN CLICK
  //       nextButton.onclick = function () {
  //         if (currentImg < testAlbumCollection.length) {
  //           modalImg.src = testAlbumCollection[currentImg].hiResPath;
  //           pictureComment.innerHTML = testAlbumCollection[currentImg].comment;
  //           picTitle.innerHTML = testAlbumCollection[currentImg].title;
  //           currentImg++;

  //           if (currentImg === testAlbumCollection.length) {
  //             modalImg.src =
  //               testAlbumCollection[testAlbumCollection.length - 1].hiResPath;
  //             currentImg = 0;
  //           }
  //         }
  //       };
  //     };
  //   });
});
// function backToMainPageClicked() {
//   let FlexTwoElements = document.querySelectorAll(".Flex-two");
//   for (var i = 0; i < FlexTwoElements.length; i++) {
//     FlexTwoElements[i].style.display = "none";
//   }
//   document.querySelector("#backToMainButton").remove();
//   document.querySelector(".Gallery-Title").textContent = "";

//   let FlexWrapElements = document.querySelectorAll(".FlexItem");
//   for (var i = 0; i < FlexWrapElements.length; i++) {
//     FlexWrapElements[i].style.display = "block";
//   }
// }
const albumGrid = document.querySelector(".album-grid .container-xxl .row");
const imageGrid = document.querySelector(".image-grid .container-xxl .row");
//Render Album
function renderImage(src, id, title, albumComment, isAlbum, albumIndex) {
  const div1 = document.createElement("div");
  div1.classList.add("col-12", "col-sm-6", "col-md-4", "item");
  const div2 = document.createElement("div");
  div2.className = "flexItem";
  div2.dataset.albumId = id;
  const figure = document.createElement("figure");
  const div3 = document.createElement("div");
  div3.classList.add("box", "img-fluid");
  div3.style.backgroundImage = `url(${src})`;
  const div4 = document.createElement("div");
  div4.className = "cover";
  const h3 = document.createElement("h3");
  h3.className = "name";
  h3.textContent = title;
  const albCom = document.createElement("p");
  albCom.className = "title";
  albCom.textContent = albumComment;

  div4.appendChild(h3);
  div4.appendChild(albCom);
  div3.appendChild(div4);
  figure.appendChild(div3);
  div2.appendChild(figure);
  div1.appendChild(div2);
  albumGrid.appendChild(div1);
}
//render Image Gallery
function renderImageGallery(
  src,
  id,
  title,
  pictureComment,
  isAlbum,
  albumPicIndex
) {
  const markupImage = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 item">
<div class="card text-white custom-control custom-checkbox custom-control-label" >
<input type="checkbox" class="check custom-control-input" id="${id}">
<label class="custom-control-label" for="${id}">
<img class="card-img-top" src="${src}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${title}</h5>
  <p class="card-text";">${pictureComment.substring(0, 28) + "..."}</p>
</div>
<i class="fa fa-check-circle"></i>
</label>
</div>
</div>`;

  imageGrid.innerHTML += markupImage;

  // const div1 = document.createElement("div");
  // div1.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "item");
  // const div2 = document.createElement("div");
  // div2.classList.add("card", "text-white");
  // const img = document.createElement("img");
  // img.className = "card-img-top";
  // img.src = src;
  // const div3 = document.createElement("div");
  // div3.className = "card-body";
  // const h5 = document.createElement("h5");
  // h5.className = "card-title";
  // h5.textContent = title;

  // const fullComment = pictureComment;

  // const picCom = document.createElement("p");
  // picCom.className = "card-text";
  // picCom.textContent = fullComment.substring(0, 35) + "...";

  // div3.appendChild(h5);
  // div3.appendChild(picCom);
  // div2.appendChild(img);
  // div2.appendChild(div3);
  // div1.appendChild(div2);
  // imageGrid.appendChild(div1);

  // // if (!isAlbum) {
  // //   commentText.contentEditable = true;
  // //   commentText.dataset.index = albumPicIndex;
  // //   const albIndex = albumPicIndex.split("_")[0];
  // //   const picIndex = albumPicIndex.split("_")[1];
  // //   div.dataset.aIdx = albIndex;
  // //   div.dataset.pIdx = picIndex;
  // //   editCommentEventListner(commentText, albIndex, picIndex, commentText);
  // //   //
  // // }
  // const imgFlex = document.querySelector(".image-grid");
  // imgFlex.appendChild(div);

  //   const markupImage = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 item">
  //   <div class="card text-white" >
  //   <img class="card-img-top" src="${src}" alt="Card image cap">
  //   <div class="card-body">
  //     <h5 class="card-title">${title}</h5>
  //     <p class="card-text";">${pictureComment.substring(0, 28) + "..."}</p>
  //   </div>
  // </div>
  //   </div>`;

  //   imageGrid.innerHTML += markupImage;

  //   if (!isAlbum) {
  //     // commentText.contentEditable = true;
  //     // commentText.dataset.index = albumPicIndex;
  //     const albIndex = albumPicIndex.split("_")[0];
  //     const picIndex = albumPicIndex.split("_")[1];
  //     // div.dataset.aIdx = albIndex;
  //     // div.dataset.pIdx = picIndex;
  //     // editCommentEventListner(commentText, albIndex, picIndex, commentText);
  //   }
}

// const btn = document.querySelector("button");

// btn.addEventListener("click", function () {
//   e.preventDefault();
//   let checkedItems = document.querySelectorAll("input[type='checkbox']:checked");
//   //console.clear();
//    let checkedItemsTrue = [];

//    checkedItems.forEach(function(cb){
//     console.log(cb.value);

// for(const item of checkedItems){

//     if(item.checked == true){

//         checkedItemsTrue.push(item.value);
//     }
//   }
// });

// image gallery
// init the state from the input

// function editCommentEventListner(btn, albumIndex, pictureIndex, com) {
//   btn.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
//       lib.albums[albumIndex].pictures[pictureIndex].comment = com.textContent;
//       localStorage.setItem("pictureLibrary", JSON.stringify(lib));

//       com.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].comment;
//     }
//   });
// }

// function backToMainPageClicked(){
//   let FlexTwoElements = document.querySelectorAll(".FlexItem-two");
//   for (var i = 0; i < FlexTwoElements.length; i++) {
//        FlexTwoElements[i].style.display = "none";
//      }
//    document.querySelector("#backToMainButton").remove();
//    document.querySelector(".Gallery-Title").textContent = "";

//    let FlexWrapElements = document.querySelectorAll(".FlexItem");
//     for (var i = 0; i < FlexWrapElements.length; i++) {
//        FlexWrapElements[i].style.display = "block";
//      }
// }

// function removeAllChildNodes(parent) {
//  while (parent.firstChild) {
//      parent.removeChild(parent.firstChild);
//  }
// }

// function renderImageGallery(
//   src,
//   comment,
//   hiResPath,
//   loResPath,
//   title,
//   id,
//   albumPicIndex
// ) {
//   const div = document.createElement("div");
//   div.className = "FlexItem-two";
//   // div.dataset.imgComment = comment;
//   div.dataset.pictureTitle = title;
//   div.dataset.picId = id;
//   let arrObj1 = { comment: comment, hiResPath: hiResPath, title: title };

//   testAlbumCollection.push(arrObj1);

//   let testString = hiResPath;
//   const idx = testString.lastIndexOf("/");
//   const newString = testString.slice(idx, testString.length);

//   if (newString === "/undefined") {
//     div.dataset.imgResPath = loResPath;
//     albumCollection[title] = loResPath;
//   } else {
//     div.dataset.imgResPath = hiResPath;
//     albumCollection[title] = hiResPath;
//   }

//   const commentDiv = document.createElement("div");
//   const commentDivText = document.createElement("p");

//   const fullComment = comment;
//   commentDivText.textContent = fullComment.substring(0, 28) + "...";
//   commentDiv.appendChild(commentDivText);
//   div.appendChild(commentDiv);

//   const img = document.createElement("img");
//   img.src = src;
//   div.appendChild(img);

//   const imgFlex = document.querySelector(".Flex-two");
//   console.log(albumPicIndex);

//   // pictureComment.addEventListener("keypress", function (event) {
//   //   if (event.key === "Enter") {
//   //     event.preventDefault();
//   //     const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
//   //     lib.albums[albumIndex].pictures[pictureIndex].comment = com.textContent;
//   //     localStorage.setItem("pictureLibrary", JSON.stringify(lib));

//   //     com.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].comment;
//   //   }
//   // });
//   imgFlex.appendChild(div);
// }

// function removeAllChildNodes(parent) {
//   while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
//   }
// }
