//check
class Orientation {
    constructor(id) {    
        this.id = id;
    }
}


class Navigation {
    constructor(id, name) {
        this.id = id;
        this.name = name;
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

//

$(document).ready(function() {
    let pageIdx = 0;
    for(let current in pages) {
        Navigation.navItem = new Navigation(pageIdx, pages[current]);
        $('#mainMenu').append(`<li>${pages[current]}</li>`);
        pageIdx += 1;
    }
    let pgHeight = window.innerHeight;
    let pgWidth = window.innerWidth;
    $('body').css('height', `${pgHeight * pages.length}px`)
    $('#pg1').css({
        'position':`absolute`,
        'top':`0px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#000`,        
    }).append("<div id='pg1Div' class = 'pgContainer'></div>");
    $('#pg1Div').append(`<ul id = 'pg1List'>
        <li id = 'pg1Item1'>This page is currently under construction, If you are interested in my work then please visit my example projects:<br>Inventory Management:<a href="Pages/orders/index.html">Inventory Management</a><br>Tic Tac Toe:<a href="Pages/TicTacToe/index.html"> Tic Tac Toe</a><br>Trivia:<a href="Pages/trivia/index.html">Trivia</a><br><p>**Please note that the Trivia project is also under construction, I wrote this before learning how to use JavaScript Promises and so will be conducting some major refactors on that project in particular.</li>
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
    $('#pg2Div').append(`<img id = 'resumeImg' alt='Resume Image' src='assets/EricDSergioResumeAsImage.png' />`)
    $('#pg3').css({
        'position':`absolute`,
        'top':`${pgHeight * 2}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#000`
    }).append("<div id='pg3Div' class = 'pgContainer'><h1>PAGE 3</h1></div>")
    $('#pg4').css({
        'position':`absolute`,
        'top':`${pgHeight * 3}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`
    }).append("<div id='pg4Div' class = 'pgContainer'><h1>PAGE 4</h1></div>")
    $('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#000`
    }).append("<div id='pg5Div' class = 'pgContainer'><h1>PAGE 5</h1></div>")
});

