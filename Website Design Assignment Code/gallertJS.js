document.addEventListener("DOMContentLoaded", function () {
    // Select all dropdown containers
    const dropdowns = document.querySelectorAll(".containerA, .containerB, .containerC");
  
    dropdowns.forEach(container => {
      const arrow = container.querySelector(".arrow-down img"); // Select the arrow inside each container
      const imageScroller = container.nextElementSibling; // Get the corresponding dropdown content
  
      container.addEventListener("click", function () {
        if (!imageScroller) return; // Avoid errors if no matching element
  
        // Toggle visibility of the dropdown content
        imageScroller.classList.toggle("show");
  
        // Toggle arrow rotation
        arrow.classList.toggle("rotate");
      });
    });
  
    // Close dropdowns when clicking outside
    window.addEventListener("click", function (event) {
      dropdowns.forEach(container => {
        const imageScroller = container.nextElementSibling;
        const arrow = container.querySelector(".arrow-down img");
  
        if (!container.contains(event.target) && !imageScroller.contains(event.target)) {
          imageScroller.classList.remove("show");
          arrow.classList.remove("rotate");
        }
      });
    });
  
    // Image Scroller functionality
    document.querySelectorAll(".imageScroller").forEach(scroller => {
      const items = scroller.querySelectorAll(".item");
      const leftArrow = scroller.querySelector(".arrow-left");
      const rightArrow = scroller.querySelector(".arrow-right");
  
      let currentIndex = 2; // Start from the middle item
  
      function updateActiveItem(newIndex) {
        if (newIndex < 0) {
          newIndex = items.length - 1; // Go to the last item
        } else if (newIndex >= items.length) {
          newIndex = 0; // Go to the first item
        }
  
        scroller.querySelector(".active")?.classList.remove("active");
        items[newIndex].classList.add("active");
  
        currentIndex = newIndex;
  
        // Resize items dynamically
        items.forEach((el, index) => {
          if (index === currentIndex) {
            el.style.width = "120px";
            el.style.height = "120px";
            el.style.borderRadius = "25px";
          } else if (Math.abs(index - currentIndex) === 1) {
            el.style.width = "80px";
            el.style.height = "80px";
            el.style.borderRadius = "25px";
          } else {
            el.style.width = "50px";
            el.style.height = "50px";
            el.style.borderRadius = "25px";
          }
        });
      }
  
      // Click event for items to activate them
      items.forEach((item, index) => {
        item.addEventListener("click", () => updateActiveItem(index));
      });
  
      // Arrow navigation
      leftArrow.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing the dropdown
        updateActiveItem(currentIndex - 1);
      });
  
      rightArrow.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing the dropdown
        updateActiveItem(currentIndex + 1);
      });
    });
  
    // Lightbox functionality for images
    const images = document.querySelectorAll(".scroller .item img");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <button class="prev">&#9665;</button>
            <img id="lightbox-img" src="">
            <button class="next">&#9655;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
  
    let currentIndex = 0;
    const lightboxImg = document.getElementById("lightbox-img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const closeBtn = document.querySelector(".close");
  
    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = images[currentIndex].src;
      lightbox.classList.add("active");
    }
  
    function changeImage(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = images.length - 1;
      if (currentIndex >= images.length) currentIndex = 0;
      lightboxImg.src = images[currentIndex].src;
    }
  
    images.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
    });
  
    prevBtn.addEventListener("click", () => changeImage(-1));
    nextBtn.addEventListener("click", () => changeImage(1));
    closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  
    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("active")) {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") lightbox.classList.remove("active");
      }
    });
  
    // Mobile menu toggle
    const burger = document.querySelector(".containerPhone");
    const phoneMenu = document.querySelector(".phoneMenu");
  
    burger.addEventListener("change", () => {
      phoneMenu.classList.toggle("show");
    });
  });
  