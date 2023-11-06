//check
class Orientation {
    constructor(id) {    
        this.id = id;
    }
}

class Navigation {
    constructor(id, name, scrollPos) {
        this.id = id;
        this.name = name;
        this.scrollPos = scrollPos;
    }
}

const pages = ['about', 'resume', 'examples', 'projects', 'design'];

const getOrientation = () => {
    return window.innerHeight / window.innerWidth > 1 ? 0 : 1
};



$(window).on("resize load", function(event){
    Orientation.ScreenOrientation = new Orientation(getOrientation());
    let names = ['portrait', 'landscape'];
    //$( "#orientation" ).text(`${names[Orientation.ScreenOrientation.id]} mode | Width: ${window.innerWidth} px | Height: ${window.innerHeight} px `);
    //when the viewport is in Portrait mode
    if(Orientation.ScreenOrientation.id < 1) {
        doPortraitNav();
        $('#mainMenu').hide();
        
    } else {
        //when the viewport is in landscape mode
        $('#mainMenu').show(100);
        doLandscapeNav();
    }
});

const doPortraitNav = () => {
    $('#navBtn').show();
    $('#mainMenu').css('gridTemplateColumns', '1fr');
    $('#navBtn').on('click', function(){
        $('#mainMenu').toggle(100) 
    })
}

const doLandscapeNav = () => {
    $('#navBtn').hide();
    $('#mainMenu').css('gridTemplateColumns', '.7fr .7fr .7fr .7fr .7fr 2fr')
}

Navigation.prototype.scrollToPage = function() {
    window.scrollTo(0, this.scrollPos);
}

//getters

Navigation.prototype.getScrolledPage = function() {
    return this.scrollPos;
}

Navigation.prototype.getPageName = function() {
    return this.name;
}

Navigation.prototype.getPageId = function() {
    return this.id;
}


$(document).ready(function() {
    let pageIdx = 0;
    let currPageHeight = document.body.scrollHeight / pages.length;
    console.log(document.body.scrollHeight);
    for(let current in pages) {
        Navigation[[pages[current]]] = new Navigation(pageIdx, pages[current], (window.innerHeight * pageIdx));        
        $('#mainMenu').append(`<li id = ${pages[current]}>${pages[current]}</li>`);
        pageIdx += 1;
    }
    $('#mainMenu li').each(function(){
        $(this).on('click', function(){           
            //this is where the navigation occurs using the prototype function scrollToPage
            //using the ids the click runs the prototype on the clicked nav item and scrolls  
            //to the approptiate spot
            Navigation[[$(this).attr('id')]].scrollToPage();
        })
    })
    let pgHeight = window.innerHeight;
    let pgWidth = window.innerWidth;
    $('body').css('height', `${pgHeight * pages.length}px`)
    $('#pg1').css({
        'position':`absolute`,
        'top':`0px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#142033`,
    }).append("<div id='pg1Div' class = 'pgContainer'></div>");
    /****************************************************************************   About Page Content **********/
    $('#pg1Div').append(`<ul id = 'pg1List'>
        <li id = 'pg1Item1'><p id = "greeting" class = "aboutContent">My name is Eric Sergio and am based out of the Greater Seattle Area.
        As a prior longtime bartender, I am a career transitioning millennial aspiring to launch a new career in IT. </p><p id = "greeting2"> Wherever I land, 
        I will take the opportunity to learn as much as I can and as quickly as I can as I have a lot of ground to make up to fulfill my goals.
        I am an excellent problem solver with a strong sense of curiosity and drive. My degree was based around C#, and my strongest tech skills
        include JavaScript, Bash, MySQL, jQuery, PHP, GCP and Azure. I can adapt and learn new languages as needed. My site is under construction, below are
        temporary links to a few of my projects.</p> 
        <div id = "tempLinks">Inventory Management:<a href="Pages/orders/index.html">Inventory Management</a><br>
        Tic Tac Toe:<a href="Pages/TicTacToe/index.html"> Tic Tac Toe</a><br>Trivia:<a href="Pages/trivia/index.html">Trivia</a><br></div>
        <li id='pg1Item2'>
            <img id="pImage" alt="Profile Image" src="assets/ame.png"/>
        </li>`)
    $('#pg2').css({
        'position':`absolute`,
        'top':`${pgHeight}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`
    }).append("<div id='pg2Div' class = 'pgContainer'></div>");
    $('#pg2Div').append(`<img id = 'resumeImg' alt='Resume Image' src='assets/EricDSergioResumeAsImage.png' />`);
    $('#pg3').css({
        'position':`absolute`,
        'top':`${pgHeight * 2}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#000`
    }).append("<div id='pg3Div' class = 'pgContainer'><h1>PAGE 3</h1></div>");
    $('#pg4').css({
        'position':`absolute`,
        'top':`${pgHeight * 3}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`
    }).append("<div id='pg4Div' class = 'pgContainer'><ul id = 'projGrid'></ul></div>");
    let projects = ['orders', 'tictactoe', 'trivia'];
    for(let i in projects) {
        $('#projGrid').append(`<li id = '${projects[i]}_proj' class = 'projTiles'><div'><a href='Pages/${projects[i]}/index.html'>${projects[i]}</a></div></li>`).css({
            'gridTemplateColumns': '1fr 1fr 1fr'
        });
    }
    $('.projTiles').on('click', function(){
        console.log($(this).attr('id'))
    })
    $('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#000`
    }).append("<div id='pg5Div' class = 'pgContainer'><h1>PAGE 5</h1></div>");
});

