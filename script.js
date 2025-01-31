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
    const placeholderHeight = document.querySelector('#quote').offsetHeight;
    const projectTitle = document.querySelector('.project-title-container');
    const projectTitleHeight = projectTitle.offsetHeight;
    const projectTitles = document.querySelectorAll('.project-title');
    const projectCardContainer = document.querySelector('.project-cards-container');

    const minScrollHeight = viewportHeight*1.5 + placeholderHeight - viewportHeight/2 + projectTitleHeight / 2;
    const maxScrollHeight = minScrollHeight + 20 * projectCardContainer.offsetHeight;

    if (scrollY > minScrollHeight && scrollY < maxScrollHeight) {
        projectTitle.style.position = 'fixed';
        projectTitle.style.top = `${viewportHeight / 2 - projectTitleHeight / 2}px`;
        const paddingR = Math.min(40, 30 * (scrollY - minScrollHeight) / (viewportHeight) + 10);
        projectTitles.forEach(pt => {
            pt.style.paddingRight = `${paddingR}vw`;
        });
    }
    else {
        projectTitle.style.position = 'relative';
        projectTitle.style.top = ``;
        projectTitles.forEach(pt => {
            pt.style.paddingRight = 'clamp(0px, 10vw, 20vw)';
        });
    }


    // if (scrollPosition > sectionTop + sectionHeight) {
    //     aboutText.classList.add('reveal-text');
    // } else {
    //     aboutText.classList.remove('reveal-text');
    // }
});


// Modal
const modalBackdrop = document.getElementById('modalBackdrop');
const animatedModal = document.getElementById('animatedModal');
const closeModalButton = document.getElementById('closeModalButton');

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

// Close
closeModalButton.addEventListener('click', () => {
    modalBackdrop.classList.remove('opacity-100');
    modalBackdrop.classList.add('opacity-0', 'pointer-events-none');
    animatedModal.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    animatedModal.classList.add('opacity-0', 'translate-y-28', 'scale-90');
});

modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
        modalBackdrop.classList.add('opacity-0', 'pointer-events-none');
        modalBackdrop.classList.remove('opacity-100');
        animatedModal.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        animatedModal.classList.add('opacity-0', 'translate-y-28', 'scale-90');
    }
});