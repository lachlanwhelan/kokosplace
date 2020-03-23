const navToggle = document.getElementById('toggle');
const navMenu = document.getElementsByClassName('header-menu')[0];
const footerMenu = document.getElementsByClassName('footer-menu')[0];

navToggle.addEventListener('click', () => {
    const navMenu = document.getElementsByClassName('header-menu')[0];
    navMenu.classList.toggle('slide');
    navToggle.children[1].classList.toggle('span-in');
})

async function handleLinkClick(e){
    e.preventDefault();

    fetch(`/pages/${e.target.id}.json`)
    .then(response => response.json())
    .then(element => {
        const page = element.page
       history.pushState({page: page}, null, `/${e.target.id}`);
       render(page)
       navMenu.className = 'header-menu';
    })
    navToggle.children[1].className = 'span-out';
}

function initialise(){
    fetch('/pages/home.json')
    .then(response => response.json())
    .then(element => {
       history.replaceState({page: element.page}, null, "");
        render(element.page)
    })
}


function render(page){
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = page;
}

window.onpopstate = function(event){
    if(event.state){
        render(event.state.page);
    }
}


navMenu.addEventListener('click', handleLinkClick);
footerMenu.addEventListener('click', handleLinkClick);
initialise();

/* function loadPage(e){
    let type = e.id;
    
    switch(type){
        case 'home':
            getPage('home');
        break;
        case 'menu':
            getPage('menu');
        break;
        case 'whatsOn':
            getPage('whatsOn')
        break;
        case 'reservations':
            getPage('reservations');
        break;
    }
}

function getPage(link){
    const rootElement = document.getElementById('root');
    fetch('page.json')
    .then(response => response.json())
    .then(element => {
        const pageToRender = element.pages.filter(page => {
            return page.type === link
        })
        navMenu.className = 'header-menu';
        rootElement.innerHTML = pageToRender[0].page;
    })
}
*/

window.onload = () => {
    setTimeout(() => {
        document.getElementsByClassName('loader')[0].className = 'load-fade';
    }, 1000);
}