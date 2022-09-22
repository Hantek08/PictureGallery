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

  if (localStorage.getItem("pictureLibrary") == null) {
    localStorage.setItem("pictureLibrary", JSON.stringify(library));
  }
  // localStorage.setItem("pictureLibrary", JSON.stringify(library));
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
              albumPicIndex,
              pictures[pictureIndex].rating,
              `${albums[albumIndex].path}/${pictures[pictureIndex].imgHiRes}`
            );
          }
        document.querySelector(".image-grid").style.display = "flex";

        }
        

        
        
        //SHOW ALL IMAGES IN ALBUM SLIDESHOW
        
        if (albumIndex == 4) {
          albumGrid.style.display = "none";

const parentdiv = document.querySelector(".selectedImg").parentNode;
const imgdiv = document.querySelector(".selectedImg");
const newbtn = document.createElement("button");
newbtn.setAttribute("class", "selectedImg circular");
newbtn.textContent = "View selected image";
parentdiv.insertBefore(newbtn, imgdiv);

const anotherbtn = document.createElement("button");
anotherbtn.setAttribute("id", "selectedImg");
parentdiv.insertBefore(anotherbtn, imgdiv);
anotherbtn.textContent = "Back";
anotherbtn.onclick = function() {
  backToMainPageClicked();
}


          const links = document.querySelectorAll(".card");
          const imgs = document.querySelectorAll("img");
          const lightboxModal = document.getElementById("lightbox-modal");
          const bsModal = new bootstrap.Modal(lightboxModal);
          const modalBody = document.querySelector(
            ".modal-body .container-fluid"
          );
          const imgBtn = document.querySelector(".allImg");
          const btn = document.querySelector(".selectedImg");


        
          const ratingDiv = document.querySelectorAll("#rating");
          ratingDiv.forEach((star, clickedix) => {
            star.addEventListener("click", function (e) {
              let action = "add";
              let counter = 0;
              for (const span of this.children) {
                span.classList[action]("active");
                if (span.classList.value == "active"){
                  counter++;
                }
                
                if (span === e.target) action = "remove";
              }
              console.log("albumid " + star.dataset.albumId);
              console.log("picid " + star.dataset.pictureId);
              console.log("clicked rating " + counter);
                    const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
                    console.log("clicked images current rating " + lib.albums[star.dataset.albumId].pictures[star.dataset.pictureId].rating);
                    lib.albums[star.dataset.albumId].pictures[star.dataset.pictureId].rating = counter;
                   localStorage.setItem("pictureLibrary", JSON.stringify(lib));
              });
          });


          let checkedItemsTrue = [];
          btn.addEventListener("click", function (e) {
            checkedItemsTrue = [];
            e.preventDefault();
            let checkedItems = document.querySelectorAll(
              "input[type='checkbox']:checked"
            );

            for (const item of checkedItems) {
              if (item.checked == true) {
                const obj = {
                  id: item.id,
                  hires: item.dataset.hires,
                  pictureIdx: item.dataset.pictureindex,
                  albumIdx: item.dataset.albumindex,
                  title: item.dataset.title,
                  comment: item.dataset.comment,
                };
                checkedItemsTrue.push(obj);
                createCarouselSecond(obj);
                console.log(checkedItems);
              }
            }
            bsModal.show();
            console.log(checkedItemsTrue);
          });

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
              const imgCaption = img.getAttribute("data-caption");
              const imgTitle = img.getAttribute("data-title");

              markup += `
              <div class="carousel-item${
                currentImgSrc === imgSrc ? " active" : ""
              }">
              ${imgTitle ? createTitle(imgTitle) : ""}

              <img src=${imgSrc} >
              ${imgCaption ? createCaption(imgCaption) : ""}
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

          function createTitle(title) {
            return `<div class="carousel-title">
               <h5 >${title}</h5>
              </div>`;
          }

          function createCarouselSecond(img) {
            console.log("img here", img);

            const markup = `
              <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000" >
                <div class="carousel-inner">
                  ${createSlidesSecond(img)}
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

          function createSlidesSecond(img) {
            let markup = "";
            const currentImgSrc = img.hires;

            console.log(currentImgSrc);
            for (const img of checkedItemsTrue) {
              const imgSrc = img.hires;
              const title = img.title;
              const comment = img.comment;
              const albInx = img.albumIdx;
              const picInx = img.pictureIdx;
              console.log("here is picInx", picInx);
              markup += `
              <div class="carousel-item${
                currentImgSrc === imgSrc ? " active" : ""
              }">
              ${title ? createTitleSecond(title, albInx, picInx) : ""}

              <img src=${imgSrc} >
              ${comment ? createCaptionSecond(comment, albInx, picInx) : ""}
              </div>
              `;
            }
            const com = document.querySelectorAll("p.m-0.p-text");

            return markup;
          }

          function createCaptionSecond(caption, aIndex, pIndex) {
            return `<div class="carousel-caption">
               <p class="m-0 p-text" data-aindex = "${aIndex}" data-pindex = "${pIndex}">${caption}</p>
              </div>`;
          }

          function createTitleSecond(title, aIndex, pIndex) {
            return `<div class="carousel-title">
               <h5 >${title}</h5>
              </div>`;
          }
        }

      });
    }
  }
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
  id,
  title,
  pictureComment,
  isAlbum,
  albumPicIndex,
  rating,
  hiResPath
) {
  const div1 = document.createElement("div");
  div1.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "item");

  const div2 = document.createElement("div");
  div2.classList.add(
    "card",
    "text-white",
    "custom-control",
    "custom-checkbox",
    "custom-control-label"
  );
  const input2 = document.createElement("input");
  input2.setAttribute("type", "checkbox");
  input2.classList.add("check", "custom-control-input");
  input2.setAttribute("id", src);

  const albIndex = albumPicIndex.split("_")[0];
  const picIndex = albumPicIndex.split("_")[1];

  input2.dataset.hires = hiResPath;
  input2.dataset.albumindex = albIndex;
  input2.dataset.pictureindex = picIndex;
  input2.dataset.comment = pictureComment;
  input2.dataset.title = title;
  input2.dataset.rating = rating;

  const label3 = document.createElement("label");
  label3.classList.add("custom-control-label");
  label3.setAttribute("for", src);

  const img4 = document.createElement("img");
  img4.classList.add("card-img-top");
  img4.src = src;
  img4.dataset.title = title;
  img4.dataset.caption = pictureComment;
  img4.dataset.rating = rating;

  const check5 = document.createElement("i");
  check5.classList.add("fa", "fa-check-circle");

  const div6 = document.createElement("div");
  div6.className = "card-body";
  div6.dataset.rating = rating;

  const titleH5 = document.createElement("h5");
  titleH5.className = "card-title";

  titleH5.textContent = title;
  titleH5.contentEditable = true;
  // titleH5.dataset.index = albumPicIndex;

  const p8 = document.createElement("p");
  p8.classList.add("card-text");
  p8.textContent = pictureComment;
  p8.contentEditable = true;
  toggleText(p8);

  const btn = document.createElement("button");
  btn.textContent = "click";
  btn.onclick = function () {
    toggleText(p8);
  };
  div6.appendChild(btn);

  div6.appendChild(titleH5);
  div6.appendChild(p8);

  const starsDiv = document.createElement("div");
  starsDiv.setAttribute("id", "rating");

  for (let i = 0; i < 5; i++){
    const span = document.createElement("span");
    if (i < rating){
      span.className = "active";
    }
    starsDiv.appendChild(span);
  }

  div6.appendChild(starsDiv);

  label3.appendChild(img4);
  label3.appendChild(check5);

  div2.appendChild(input2);
  div2.appendChild(label3);
  div2.appendChild(div6);

  div1.appendChild(div2);

  imageGrid.appendChild(div1);

  
  const albIndex0 = albumPicIndex.split("_")[0];
  const picIndex1 = albumPicIndex.split("_")[1];
  starsDiv.dataset.albumId = albIndex0;
  starsDiv.dataset.pictureId = picIndex1;

  editTitleEventListner(titleH5, albIndex0, picIndex1, titleH5);
  editCommentEventListner(p8, albIndex0, picIndex1, p8);


}
function toggleText(paragraph) {
  paragraph.classList.toggle("truncate");
}

function editTitleEventListner(tH5, albumIndex, pictureIndex, titleH5) {
  tH5.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
      lib.albums[albumIndex].pictures[pictureIndex].title = titleH5.textContent;
      localStorage.setItem("pictureLibrary", JSON.stringify(lib));

      titleH5.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].title;
    }
  });
}

function editRatingEventListner(tH5, albumIndex, pictureIndex, titleH5) {
  tH5.addEventListener("click", function (event) {
      event.preventDefault();
      const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
      lib.albums[albumIndex].pictures[pictureIndex].rating = titleH5.innerHTML;
      localStorage.setItem("pictureLibrary", JSON.stringify(lib));

      titleH5.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].rating;
    
  });
}

function editCommentEventListner(p, albumIndex, pictureIndex, p8) {
  p.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const lib = JSON.parse(localStorage.getItem("pictureLibrary"));
      lib.albums[albumIndex].pictures[pictureIndex].comment = p8.textContent;
      localStorage.setItem("pictureLibrary", JSON.stringify(lib));

      p8.innerHTML = lib.albums[albumIndex].pictures[pictureIndex].comment;

      console.log("p8 here ", p8);
    }
  });
}
function backToMainPageClicked() {
let k = document.querySelector(".image-grid .container-xxl .row");
  while (k.firstChild) {
    k.removeChild(k.lastChild);
  }
  let x = document.querySelector(".image-grid").style.display = "none";
  let y = document.querySelector(".album-grid").style.display = "block";
  document.querySelector("#selectedImg").remove();
  document.querySelector(".selectedImg").remove();
}