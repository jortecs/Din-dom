//---------------------------------lamar al buttom---------------------------------------//
const nav  =document.querySelector("#nav");
const abrir = document.querySelector(".abrir-menu");
const cerrar = document.querySelector("#cerrar");
//------------------------cuando das click aparece la amburguesa-----------------------//
abrir.addEventListener("click", () =>{
    nav.classList.toggle("visible");
} )
//------------------------cuando das click desaparece la amburguesa-----------------------//
cerrar.addEventListener("click", ()=> {
    nav.classList.remove("visible");
})

