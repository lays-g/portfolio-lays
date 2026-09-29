const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

function atualizarMenu() {
    let secaoAtual = "";

    sections.forEach(function(section) {
        const inicio = section.offsetTop - 200;
        const fim = inicio + section.offsetHeight;

        if (window.scrollY >= inicio && window.scrollY < fim) {
            secaoAtual = section.id;
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + secaoAtual) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", atualizarMenu);

const botaoProjetos = document.querySelector(".main-button");

if (botaoProjetos) {
    botaoProjetos.addEventListener("click", function(event) {
        event.preventDefault();

        const projetos = document.getElementById("projetos");

        if (projetos) {
            projetos.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

const linksEmBreve = document.querySelectorAll(".coming-soon");

linksEmBreve.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        alert("Este projeto estará disponível em breve.");
    });
});

const elementosAnimados = document.querySelectorAll(
    ".about-text, .skills-card, .project-card, .contact-box"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("show");
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elementosAnimados.forEach(function(elemento) {
        elemento.classList.add("hidden");
        observer.observe(elemento);
    });
} else {
    elementosAnimados.forEach(function(elemento) {
        elemento.classList.add("show");
    });
}

const formulario = document.getElementById("proposalForm");
const mensagemFormulario = document.getElementById("formMessage");

if (formulario) {
    formulario.addEventListener("submit", async function(event) {
        event.preventDefault();

        const contato = document.getElementById("contatoInput").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (contato === "" || mensagem === "") {
            mensagemFormulario.textContent = "Preencha os campos antes de enviar.";
            return;
        }

        mensagemFormulario.textContent = "Enviando...";

        console.log("Enviando dados para o Flask...");

        try {
            const resposta = await fetch("https://portfolio-lays.onrender.com/contato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contato: contato,
                    mensagem: mensagem
                })
            });

            const dados = await resposta.json();

            console.log("Resposta do Flask:", dados);

            if (resposta.ok) {
                mensagemFormulario.textContent = "Enviado com sucesso!";
                formulario.reset();
            } else {
                mensagemFormulario.textContent = dados.mensagem || "Erro ao enviar.";
            }

        } catch (erro) {
            console.error(erro);
            mensagemFormulario.textContent = "Não foi possível enviar.";
        }
    });
}