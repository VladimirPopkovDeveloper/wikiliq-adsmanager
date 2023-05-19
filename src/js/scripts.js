// Navbar
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      $target.classList.toggle("is-active");
    });
  });
});

// Tabs & tab content
const tabs = document.querySelectorAll(".tabs li");
const tabContentBoxes = document.querySelectorAll(
  "#tab-content .tab-content-box"
);

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("is-active"));
    tabContentBoxes.forEach((box) => box.classList.remove("is-active"));

    tab.classList.add("is-active");
    tabContentBoxes[index].classList.add("is-active");
  });
});

// Bottom menu & main content
const bottom_links = document.querySelectorAll(".bottom-navbar .bottom-link");
const mainContentSections = document.querySelectorAll(
  ".main-content .main-content-section"
);

bottom_links.forEach((bottom_link, index) => {
  bottom_link.addEventListener("click", () => {
    bottom_links.forEach((bottom_link) =>
      bottom_link.classList.remove("is-active")
    );
    mainContentSections.forEach((section) =>
      section.classList.remove("is-active")
    );

    bottom_link.classList.add("is-active");
    mainContentSections[index].classList.add("is-active");
  });
});

// Notifications
document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.classList.remove("animate__slideInUp");
        $notification.classList.add("animate__slideOutDown");
        setTimeout(() => {
          $notification.parentNode.removeChild($notification);
        }, 1000);
      });
    }
  );
});

// Active button images
const buttonImages = document.querySelectorAll(
  "#modal-screen-container_position .button-image"
);
const bottleImages = document.querySelectorAll(
  "#modal-screen-container_product .button-image"
);
const progressBar = document.querySelector("#progress-bar_ad");
const modalDate = document.querySelector("#modal-screen-container_date");

buttonImages.forEach((buttonImage) => {
  buttonImage.addEventListener("click", () => {
    buttonImages.forEach((otherButtonImage) => {
      if (otherButtonImage !== buttonImage) {
        otherButtonImage.classList.remove("is-active");
      }
    });
    buttonImage.classList.add("is-active");
    modalDate.classList.add("is-active");
    progressBar.setAttribute("value", "33");
  });
});

// Calendar set dates
const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const modalProduct = document.querySelector("#modal-screen-container_product");

endDate.addEventListener("change", () => {
  modalProduct.classList.add("is-active");
  progressBar.setAttribute("value", "66");
});

// Choose bottle to promote
const modalPrice = document.querySelector("#modal-screen-container_price");

bottleImages.forEach((bottleImage) => {
  bottleImage.addEventListener("click", () => {
    bottleImages.forEach((otherBottleImage) => {
      if (otherBottleImage !== bottleImage) {
        otherBottleImage.classList.remove("is-active");
      }
    });
    bottleImage.classList.add("is-active");
    modalPrice.classList.add("is-active");
    progressBar.setAttribute("value", "100");
  });
});

// Prev & Next
/*
const prevButton = document.querySelector(".prev-next-buttons .prev-button");
const nextButton = document.querySelector(".prev-next-buttons .next-button");
const finishButton = document.querySelector(
  ".prev-next-buttons .finish-button"
);
console.log(prevButton);
const modalScreenContainers = document.querySelectorAll(
  ".modal-screen-container"
);

let activeScreenContainerIndex = 0;
prevButton.style.display = "none";
finishButton.style.display = "none";
modalScreenContainers[activeScreenContainerIndex].classList.add("is-active");

prevButton.addEventListener("click", () => {
  if (activeScreenContainerIndex > 0) {
    modalScreenContainers[activeScreenContainerIndex].classList.remove(
      "is-active"
    );
    activeScreenContainerIndex--;
    modalScreenContainers[activeScreenContainerIndex].classList.add(
      "is-active"
    );
    if (activeScreenContainerIndex === 0) {
      prevButton.style.display = "none";
      finishButton.style.display = "none";
    }
    nextButton.style.display = "block";
    finishButton.style.display = "none";
  }
});

nextButton.addEventListener("click", () => {
  if (activeScreenContainerIndex < modalScreenContainers.length - 1) {
    modalScreenContainers[activeScreenContainerIndex].classList.remove(
      "is-active"
    );
    activeScreenContainerIndex++;
    modalScreenContainers[activeScreenContainerIndex].classList.add(
      "is-active"
    );
    if (activeScreenContainerIndex === modalScreenContainers.length - 1) {
      nextButton.style.display = "none";
      finishButton.style.display = "block";
    }
    prevButton.style.display = "block";
  }
});
*/

// Calendar
// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
calendars.forEach((calendar) => {
  // Add listener to select event
  calendar.on("select", (date) => {
    console.log(date);
  });
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector("#my-element");
if (element) {
  // bulmaCalendar instance is available as element.bulmaCalendar
  element.bulmaCalendar.on("select", (datepicker) => {
    console.log(datepicker.data.value());
  });
}
