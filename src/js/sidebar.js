const sideBarNav = document.getElementById("mobile-nav");
const navShadow = document.getElementById('nav-shadow');
sideBarNav.classList.add("hidden");
const openSidebar = document.getElementById("openSideBar");

openSideBar.onclick = function () {
    if (sideBarNav.classList.contains("hidden")) {
        sideBarNav.classList.remove("hidden");
    }
}


const closeSideBar = document.getElementById("closeSideBar");

closeSideBar.onclick = function () {
if (sideBarNav.classList.contains("hidden")) {
    sideBarNav.classList.remove("hidden");
} else {
    sideBarNav.classList.add("hidden");
}
}

function handleResize() {
    if (window.innerWidth > 1024) {
        sideBarNav.classList.add('hidden'); // Hide the sidebar
    }
}

// Run on page load
handleResize();

// Attach resize event listener
window.addEventListener('resize', handleResize);