window.addEventListener('scroll', () => {
    // Title
    const title = document.querySelector('.title-text');
    const navbar = document.getElementById('navbar');
    const titleHeight = title.offsetHeight;

    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const scaleValue = 0.5;
    const scale = Math.max(scaleValue, 1 - scaleValue * (scrollY / (viewportHeight)));
    const translateY = Math.min(viewportHeight + titleHeight, (0.5 * (scrollY + titleHeight)) / scale);
    title.style.transform = `scale(${scale}) translateY(${translateY}px)`;

    if (scrollY > viewportHeight) {
        navbar.style.opacity = '100%';
        navbar.style.height = `${titleHeight}px`;
        title.style.position = 'fixed';
        title.style.top = `-${translateY * scale}px`;
    } else {
        navbar.style.opacity = '0';
        title.style.position = 'relative';
        title.style.top = '';
    }

    // Project
    const quoteHeight = document.querySelector('#quote').offsetHeight;
    const projectHeight = document.querySelector('#projects').offsetHeight;
    const projectTitle = document.querySelector('.project-title-container');
    const projectTitleHeight = projectTitle.offsetHeight;
    const projectTitles = document.querySelectorAll('.project-title');
    const projectCardContainer = document.querySelector('.project-cards-container');

    const minScrollHeight = viewportHeight * 1.5 + quoteHeight - viewportHeight / 2 + projectTitleHeight / 2;
    const maxScrollHeight = minScrollHeight + projectHeight;

    if (scrollY > minScrollHeight && scrollY < maxScrollHeight) {
        projectTitle.style.position = 'fixed';
        projectTitle.style.top = `${viewportHeight / 2 - projectTitleHeight / 2}px`;
        const paddingR = Math.min(40, 30 * (scrollY - minScrollHeight) / (viewportHeight) + 10);
        projectTitles.forEach(pt => {
            pt.style.paddingRight = `${paddingR}vw`;
        });
    }
    else if (scrollY >= maxScrollHeight) {
        projectTitle.style.position = 'absolute';
        projectTitle.style.top = `${maxScrollHeight}px`;
    }
    else {
        projectTitle.style.position = 'relative';
        projectTitle.style.top = ``;
        projectTitles.forEach(pt => {
            pt.style.paddingRight = 'clamp(0px, 10vw, 20vw)';
        });
    }
});


// Modal
const modalBackdrop = document.getElementById('modalBackdrop');
const animatedModal = document.getElementById('animatedModal');
const closeModalButtons = document.querySelectorAll('#closeModalButton');

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(pc => {
    const modalContent = document.querySelectorAll(".modal-content");
    pc.addEventListener('click', () => {
        modalBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        modalBackdrop.classList.add('opacity-100');
        animatedModal.classList.remove('opacity-0', 'translate-y-28', 'scale-90');
        animatedModal.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        const modalId = pc.getAttribute("modal-id");
        modalContent.forEach(mc => mc.classList.add("hidden"));
        document.getElementById(modalId).classList.remove("hidden");
    });
});

closeModalButtons.forEach(close => {
    close.addEventListener('click', () => {
        modalBackdrop.classList.remove('opacity-100');
        modalBackdrop.classList.add('opacity-0', 'pointer-events-none');
        animatedModal.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        animatedModal.classList.add('opacity-0', 'translate-y-28', 'scale-90');
    });
})


modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
        modalBackdrop.classList.add('opacity-0', 'pointer-events-none');
        modalBackdrop.classList.remove('opacity-100');
        animatedModal.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        animatedModal.classList.add('opacity-0', 'translate-y-28', 'scale-90');
    }
});

// Copy Email
document.getElementById("email-icon").addEventListener("click", function () {
    const email = "ivas.wu@yahoo.ca";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
});


//Menu
document.getElementById("menu-button").addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("active");
});


//Dark Mode
const toggleButton = document.getElementById("theme-toggle");
const icon = toggleButton.querySelector("i");
const currentTheme = localStorage.getItem("theme");

if (!currentTheme || currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    icon.classList.replace("fa-moon", "fa-sun");
}

toggleButton.addEventListener("click", () => {
    const isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";

    document.documentElement.setAttribute("data-theme", isDarkMode ? "light" : "dark");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");

    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
});
