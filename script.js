/* =====================================
   PORTFÓLIO - JAVASCRIPT
===================================== */


/* =====================================
   MENU ATIVO
===================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

function updateActiveMenu() {

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

}

window.addEventListener("scroll", updateActiveMenu);


/* =====================================
   BOTÃO "VER MEUS PROJETOS"
===================================== */

const projectButton = document.querySelector(".main-button");

if (projectButton) {

    projectButton.addEventListener("click", event => {

        event.preventDefault();

        const projects = document.querySelector("#projetos");

        if (projects) {

            projects.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


/* =====================================
   PROJETOS 2 E 3 - EM BREVE
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

        // O navegador abrirá normalmente
        // o arquivo curriculo.pdf.

    });

}


/* =====================================
   ANIMAÇÃO DOS ELEMENTOS
===================================== */

const animatedElements = document.querySelectorAll(
    ".about-text, .skills-card, .project-card, .contact-box"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

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

} else {

    animatedElements.forEach(element => {

        element.classList.add("show");

    });

}
