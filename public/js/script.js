document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveLink = (clickedLink) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });
    clickedLink.classList.add("active");
    clickedLink.setAttribute("aria-current", "page");
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // event.preventDefault(); // Descomente se não quiser que a página role/navegue
      setActiveLink(event.target);
    });
  });

  // Opcional: define o link "Início" como ativo na carga inicial (já feito no HTML acima, mas bom ter aqui)
  // const homeLink = document.querySelector('.nav-link[data-link="inicio"]');
  // if (homeLink) {
  //     setActiveLink(homeLink);
  // }
});
