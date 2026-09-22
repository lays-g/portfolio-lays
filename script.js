/* =====================================
   PORTFÓLIO - JAVASCRIPT
===================================== */


/* =====================================
   MENU ATIVO
===================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* =====================================
   BOTÃO "VER MEUS PROJETOS"
===================================== */

const projectButton = document.querySelector(".main-button");

if (projectButton) {

    projectButton.addEventListener("click", () => {

        const projects = document.querySelector("#projetos");

        if (projects) {

            projects.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* =====================================
   PROJETOS EM DESENVOLVIMENTO
===================================== */

const comingSoonLinks = document.querySelectorAll(".coming-soon");

comingSoonLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        alert("Em breve o projeto estará disponível!");

    });

});


/* =====================================
   BOTÃO BAIXAR CURRÍCULO
===================================== */

const btnCV = document.querySelector("#btnCV");

if (btnCV) {

    btnCV.addEventListener("click", () => {

        // O link do currículo seguirá normalmente.

    });

}


/* =====================================
   ANIMAÇÃO AO APARECER NA TELA
===================================== */

const animatedElements = document.querySelectorAll(
    ".about-text, .skills-card, .project-card, .contact-box"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(element => {

    element.classList.add("hidden");

    observer.observe(element);

});
