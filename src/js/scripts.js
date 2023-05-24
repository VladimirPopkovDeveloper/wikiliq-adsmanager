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
const mainContentSections = document.querySelectorAll(
  ".main-content .main-content-section"
);
const bottom_links = document.querySelectorAll(".bottom-navbar .bottom-link");
const side_links = document.querySelectorAll(".side-navbar .side-link");

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

// Side menu & main content

side_links.forEach((side_link, index) => {
  side_link.addEventListener("click", () => {
    side_links.forEach((side_link) => side_link.classList.remove("is-active"));
    mainContentSections.forEach((section) =>
      section.classList.remove("is-active")
    );

    side_link.classList.add("is-active");
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
const packBlocks = document.querySelectorAll(
  "#modal-screen-container_pack .button-image"
);
const modalPack = document.querySelector("#modal-screen-container_pack");

buttonImages.forEach((buttonImage) => {
  buttonImage.addEventListener("click", () => {
    buttonImages.forEach((otherButtonImage) => {
      if (otherButtonImage !== buttonImage) {
        otherButtonImage.classList.remove("is-active");
      }
    });
    buttonImage.classList.add("is-active");
    modalPack.classList.add("is-active");
    selectRandomDates();
  });
});

// Choose pack
const modalProduct = document.querySelector("#modal-screen-container_product");

packBlocks.forEach((packBlock) => {
  packBlock.addEventListener("click", () => {
    packBlocks.forEach((otherpackBlock) => {
      if (otherpackBlock !== packBlock) {
        otherpackBlock.classList.remove("is-active");
      }
    });
    packBlock.classList.add("is-active");
    modalProduct.classList.add("is-active");
    selectRandomDates();
  });
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
    selectRandomDates();
  });
});

// Calendars
// jsCalendar
// Get the element
let calEl = document.getElementById("freeDatesCalendar");
// Get & format current date
const getCurrentDate = () => {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

function generateRandomDate() {
  const currentDate = new Date();

  const randomOffset = Math.floor(Math.random() * 5); // Генерируем случайное смещение от 0 до 5
  const date = new Date(
    currentDate.getTime() + randomOffset * 24 * 60 * 60 * 1000
  ); // Добавляем смещение к текущей дате

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;

  randomDate = formattedDate;
  return randomDate;
}

// Генерируем случайные даты
//const randomDates = generateRandomDates();

// Create the calendar
let freeDatesCalendar = jsCalendar.new(calEl, getCurrentDate(), {
  navigator: true,
  navigatorPosition: "left",
  zeroFill: false,
  monthFormat: "month YYYY",
  dayFormat: "DDD",
  language: "en",
});

function selectRandomDates() {
  freeDatesCalendar.clearselect();
  freeDatesCalendar.select(generateRandomDate());
}
