class UI {
  constructor() {
    this.cookiesCtaBtn = document.getElementById('cookiesCta');
    this.elBtnCloseNewsletter = document.getElementById('btnCloseNewsletter'); 
    this.elPageHeaderContainer = document.getElementById('pageHeaderContainer'); 
    this.elCookiesOutbox = document.getElementById('cookiesOutbox'); 
    this.elNewsletterContainer = document.getElementById('newsletterContainer'); 
  }

  handleCloseCookiesPanel(){
    let cookiesHeight = this.elCookiesOutbox.offsetHeight
    this.elCookiesOutbox.style.top = '-'+cookiesHeight+'px'
    this.elPageHeaderContainer.style.marginTop = '0'
  }

  handleCloseNewsletterPanel(){
    this.elNewsletterContainer.style.bottom= '-207px'
    this.elNewsletterContainer.style.paddingTop= '0'
    this.elNewsletterContainer.style.paddingBottom= '0'
    localStorage.setItem('isNewsletterClosed', true)
    localStorage.setItem('timeSet',new Date().getTime())
  }

  handleScrollPosition(){
    let isNewsletterClosed = localStorage.getItem('isNewsletterClosed')
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-(document.body.offsetHeight/3)) && isNewsletterClosed === 'false') {
      this.elNewsletterContainer.style.bottom= '0'
      this.elNewsletterContainer.style.height= '207px'
    }
  }
}

function eventListeners(){
  const cookiesCtaBtn = document.getElementById('cookiesCta');
  const elBtnCloseNewsletter = document.getElementById('btnCloseNewsletter');

  const ui = new UI();
  
  cookiesCtaBtn.addEventListener('click', function(event){
    event.preventDefault();
    ui.handleCloseCookiesPanel();
  }) 

  elBtnCloseNewsletter.addEventListener('click', function(event){
    event.preventDefault();
    ui.handleCloseNewsletterPanel();
  })

  window.addEventListener('scroll', function(event) { 
    event.preventDefault();
    ui.handleScrollPosition();
 });
}

function handleExpiration(){
  const expirationDuration = 1000 * 60 * 10; 

  const prevAccepted = parseInt(localStorage.getItem("timeSet"));
  const currentTime = new Date().getTime();
  if (currentTime > prevAccepted+expirationDuration) {
    localStorage.setItem("isNewsletterClosed", false);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
  setInterval(() => {
    handleExpiration();
  }, 600000);
})