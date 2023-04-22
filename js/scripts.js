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

      el.classList.toggle("is-active");
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

// Notifications
document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});
