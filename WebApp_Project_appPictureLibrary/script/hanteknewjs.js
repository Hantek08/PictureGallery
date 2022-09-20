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
      });
    }
  }




  let imgGrid = document.querySelector(".image-grid");
  imgGrid.addEventListener("click", function() {
    const links = imgGrid.querySelectorAll("div");
    const imgs = document.querySelectorAll("img");
    const lightboxModal = document.getElementById("lightbox-modal");
     const bsModal = new bootstrap.Modal(lightboxModal);
     const modalBody = document.querySelector(".modal-body .container-fluid");

    for (const link of links){
      link.addEventListener("click", function(e){
        e.preventDefault();
        const currentImg = link.querySelector("img");
        console.log(currentImg);
      })
    }






    // for (const img of imgs){
    //   console.log(img);
    // }

    //  for (const link of links){
    //   link.addEventListener("click", function(e) {
    //     e.preventDefault();
    //     const currentImg = link.querySelector("img");
    //     console.log(currentImg);
    //   })
    //  }


//       for (const link of links) {
//     link.addEventListener("click", function (e) {
//       e.preventDefault();
//       const currentImg = link.querySelector("img");
//       const lightboxCarousel = document.getElementById("lightboxCarousel");
//       if (lightboxCarousel) {
//         const parentCol = link.parentElement.parentElement;
//         console.log(link.parentElement.parentElement);
//         const index = [...parentCol.parentElement.children].indexOf(parentCol);
//         const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
//       bsCarousel.to(index);
//     } else {
//       createCarousel(currentImg);
//     }
//     bsModal.show();
//   });
// }
    
  })


});


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
  tag,
  title,
  pictureComment,
  isAlbum,
  albumPicIndex
) {
  const div1 = document.createElement("div");
  div1.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "item");
  const div2 = document.createElement("div");
  div2.classList.add("card", "text-white");
  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = src;
  const div3 = document.createElement("div");
  div3.className = "card-body";
  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = title;

  const fullComment = pictureComment;

  const picCom = document.createElement("p");
  picCom.className = "card-text";
  picCom.textContent = fullComment.substring(0, 35) + "...";

  div3.appendChild(h5);
  div3.appendChild(picCom);
  div2.appendChild(img);
  div2.appendChild(div3);
  div1.appendChild(div2);
  imageGrid.appendChild(div1);
}



function createCarousel(img) {
  const markup = `
    <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="false">
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
    <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">

    </div>
    `;
  }

  return markup;
}

