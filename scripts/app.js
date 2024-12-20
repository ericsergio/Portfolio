//check
class Orientation {
    constructor(id) {    
        this.id = id || 0;
    }
};

class AspectRatio {
    constructor(ratio) {
        this.ratio = ratio;
    }
};

AspectRatio.currentAspectRatio = new AspectRatio(window.innerWidth / window.innerHeight);


class Navigation {
    constructor(id, name, scrollPos, setToggle) {
        this.id = id || 0;
        this.name = name || 'about';
        this.scrollPos = scrollPos || 0;
        this.setToggle = setToggle || 0;        
    }
};

const pages = ['about', 'resume', 'examples', 'projects', 'contact'];


const getOrientation = () => {
    return window.innerHeight / window.innerWidth > 1 ? 0 : 1
};

const isLandscapeMode = () => {
    return getOrientation() === 1;
};

Navigation.current = new Navigation();

$(window).on("resize load", function(event) {
    Orientation.ScreenOrientation = new Orientation(getOrientation());
    let names = ['portrait', 'landscape'];    
    //when the viewport is in Portrait mode
    if(Orientation.ScreenOrientation.id < 1) {        
        $('#navBtn').show();
        $('#mainMenu').css('gridTemplateColumns', '1fr');
        $('#mainMenu').hide();
    } else {
        //when the viewport is in landscape mode
        $('#mainMenu').show(100);
        doLandscapeNav();
    }
});

$(document).ready(function(){
    $('#navBtn').on('click', function() {
        $('#mainMenu').toggle(300);
    });
});

/*gets ran on load or page resize to Landscape mode */
const doLandscapeNav = () => {
    $('#navBtn').hide();
};




/*This is the site Navigation. Rather than creating new pages, this calculates the device's page
size and navigating scrolls to the page's/section's position. The navigation is set to be fixed
so as you scroll, the navigation remains in place making it appear to go to a new page. The 
clicked page stats are stored in a js class constructor's properties as to store the data
needed to do this. The actual page containers are dynamically created below.*/
Navigation.prototype.scrollToPage = function() {
    const pgs = ['pg1', 'pg2', 'pg3', 'pg4', 'pg5'];
    //console.log(this.name)
    //console.log(this.id)
    Navigation.current.name = this.name;
    Navigation.current.scrollPos = this.scrollPos;
    Navigation.current.id = this.id;
    
    if(this.id === null) {
        this.id = 0;
    }
    
    $(`#${pgs[this.id]}`).css({
        'position':`fixed`,
        'display':`block`,
        'top':'1px',
        'z-index':5
    }).siblings().not((`#${pgs[this.id]}`)).not($('.countToggles')).each(function() {
        $(this).css({
            'position':`absolute`,
            'display':'none',
            'z-index':2
        });
    });

    if(isLandscapeMode() === false) {
        $(`#${pgs[this.id]}`).css({            
            'height':`${document.body.clientHeight + 500}px`
        });
    };
    return this.id;
}
//getters
Navigation.prototype.getScrolledPage = function() {
    return this.scrollPos;
}

Navigation.getPageName = function() {
    return this.name;
}

Navigation.prototype.getPageId = function() {
    return this.id;
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


$(document).ready(function() {
    let pageIdx = 0;
    const pgs = ['pg1', 'pg2', 'pg3', 'pg4', 'pg5'];
    for(let current in pages) {
        //console.log(`-----${current}`);
        //console.log(`+++++${pages[current]}`);
        //console.log(`=====${pageIdx}`);
        
        Navigation[[pages[current]]] = new Navigation(pageIdx, pages[current], (window.innerHeight * pageIdx));        
        $('#mainMenu').append(`<li id = ${pages[current]}>${pages[current]}</li>`);
        //console.log(`||||||${Navigation.current.id}`);
        pageIdx += 1;

    }
    
    $('#mainMenu li').each(function() {
        $(this).on('click', async function() {
            //only do it if user is clicking on a different tab than they are currently on because after scrollToPage() gets called Navigation.current.id will change
            if(pages.indexOf($(this).attr('id')) !== Navigation.current.id) {
                $(`#${pgs[Navigation.current.id]}`).fadeOut(1000);
                //this is where the navigation occurs using the prototype function scrollToPage
                //using the ids the click runs the prototype on the clicked nav item and scrolls  
                //to the appropriate spot
                //console.log(`mainMenu li id, used as the prototype property: ${$(this).attr('id')}`);
                if(Orientation.ScreenOrientation.id < 1) {
                    $('#mainMenu').hide(100);
                };
                await delay(1000);            
                Navigation[[$(this).attr('id')]].scrollToPage();                
            }
        });
    });
});


//You need to refactor this to use the Navigation class
//This function is the page set up and navigation system - page static containers are created here
$(document).ready(function() {
    let pgHeight = window.innerHeight;    
    $('body').css('height', `${pgHeight * pages.length}px`)
    /****************************************************************************   About Page  **********/
    $('#pg1').css({
        'position':`fixed`,
        'top':`0px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'z-index':5
    }).append(`<div id='pg1Div' class = 'pgContainer'></div>`);
    /****************************************************************************   Resume Page  **********/
    $('#pg2').css({
        'position':`absolute`,
        'top':`${pgHeight}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`<div id='pg2Div' class = 'pgContainer'></div>`);
    /****************************************************************************   Examples Page Content **********/
    $('#pg3').css({
        'position':`absolute`,
        'top':`${pgHeight * 2}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`<div id='pg3Div' class = 'pgContainer'></div>`);
    /****************************************************************************   Projects Page Content **********/
    $('#pg4').css({
        'position':`absolute`,
        'top':`${pgHeight * 3}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`<div id='pg4Div' class = 'pgContainer'></div>`);
    /****************************************************************************   Contact Page Content **********/
    $('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`<div id='pg5Div' class = 'pgContainer'></div>`);
});

$(document).ready(function() {
    let contactItems = ['mailIcon', 'githubIcon', 'linkedInIcon'];
    let contactHrefs = ['mailto:ericdsergio87@icloud.com','https://github.com/ericsergio','https://linkedin.com/in/ericsergio']
    for(let i in contactItems) {
        $('.contactGrid').append(`
        <li id = ${contactItems[i]}>
            <a href = '${contactHrefs[i]}' target="_blank">
                <img src = 'assets/icons/${contactItems[i]}.png' alt = '${contactItems[i]} icon png'>
            </a>
        </li>`);
    }
});

$(document).ready(function() {
    //*********************************************************************************************** about page content
    $('#pg1Div').append(`
        <div id = 'pg1Content'>
            <div id = "aboutBackUpper" class = "aboutContent">
                <p class = 'aboutTxt'>
                    <span class = 'intro0'>My name is Eric Sergio and live in the Greater Seattle area. Thank you for taking the time to visit my website! </span>
                </p>
            </div>

            <div id = "aboutBackLower" class = "aboutContent">
                <p class = 'aboutTxt'>
                    <span class = "intro1">I graduated from Bellevue College in 2023 with a BAS in Software Development. I have spent most of my life working in the restaurant industry, primarily as a bartender. Although I was/am good at my job and earn enough to live relatively comfortably, it isn't what I enjoy doing. A few years ago, when the older of my two daughters was 1 years old, I decided that I needed to pursue a new career that I would be passionate about and that would enable me to provide my daughters with more of my time and financial security. This wasn't the first attempt I had made at making a career transition and although my first attempt resulted in a failed business, it did cause me to discover that I loved building, testing, tinkering, customizing, and generally solving the puzzles that software development presents. After my first time leaving the restaurant industry to start a e-commerce business, I came to realize that I needed to learn how to manage and manipulate data. I began by working with VBA which led to SQL, C#, JavaScript and everything from AutoHotkey to Selenium.I switched from only knowing Windows to being a dedicated UNIX environment user who prefers to doing mostly everything from my shell and finding UI's to be cumbersome. I completed my BAS degree in Software Development with a 3.9 GPA and am confident that if I am confronted with a problem to solve, I will find a way to solve it. Along with the technical skills I have gained an enormous amount of experience throughout my numerous years working in a high-volume, fast-paced, high-stress, multi-task required environment where your job and livelihood revolves around keeping scores of varying personalities happy while being timed and minor priority mishaps can lead to a snowball effect of negative compounding problems.
                    </span>
                </p>
            </div>
        </div>
    `);    
    if(getOrientation() === 1) {
        $('#pg1Div').append(`<img id="pImage" alt="Profile Image" src="assets/meHS.jpeg"/>`);        
    } else {
        //mobile
        $('#pg1Content').after(`<button id = 'more'>more</button>`);        
        $('#more').on('click', function() {            
            $('#pg1Content').css({
                'overflow-y' : 'auto'
            })
        })
        $('#pg1Div').append(`<img id="pImage" alt="Profile Image" src="assets/meHS.jpeg"/>`);
    }
    //*********************************************************************************************** resume page content
    $('#pg2Div').append(`
        <div id='iframeBack'>
            <iframe id = 'resumeFrame' src = 'resume.html'></iframe>
        </div>`);


    //*********************************************************************************************** examples page content
    $('#pg3Div').append(`
    <h5 id = 'exampleDescription'>These examples are code snippets of various projects that show my contributions/work. This section is intended to provide some insight of my coding ability/skills
     using various languages. Unless I make a note saying otherwise, everything included here is code that I originally wrote, Click on the heading to display each example snippet.</h5>
    <select id='codeExampleList'>
        <option id = 'codeExample0' value="option0">
            Example Code Snippets
        </option>
        <option id = 'codeExample0' value="option0">
            SQL Procedure
        </option>
        <option id = 'codeExample1' value="option1">
            SQL Procedure
        </option>
        <option id = 'codeExample2' value="option2">
            PHP
        </option>
        <option id = 'codeExample3' value="option3">
            C# Unity
        </option>
        <option id = 'codeExample4' value="option4">
            MongoDB REST API
        </option>
    </select>
    <div class = 'selectedImg'></div>`
    );
    let examples = ['ordersProc', 'randQuestionProc', 'phpWide', 'cSharpWide', 'restAPIWide' ];
    let PortraitExamples = ['orderProc', 'randomQuestionProc', 'phpNarrow', 'cSharpNarrow', 'restAPINarrow' ];
    $('#codeExampleList option');
    $('#codeExampleList').on('change', function() {
            let idx = Number($('#codeExampleList option:selected').attr('id').substr(-1, 1));
            $('.selectedImg').empty();
            $('blankBack').remove();
            if(getOrientation() === 1) {
            $('.selectedImg').append(`
            <div id = 'currentExampleImgDiv'>
                <img id = '${examples[idx]}_img' alt = '${examples[idx]} image' src='assets/exampleImages/${examples[idx]}.png' />
            </div>`);
            } else {
                $('.selectedImg').append(`
                    <div id = 'currentExampleImgDiv'>
                        <img id = '${PortraitExamples[idx]}_img' alt = '${PortraitExamples[idx]} image' src='assets/exampleImages/${PortraitExamples[idx]}.png' />
                    </div>`);
            }
            $('#pg3Div').prepend(`<div id = blankBack></div>`);            
            $('#currentExampleImgDiv').after(`<p class = 'currentExampleImgDivX'>X</p>`);
            $('.currentExampleImgDivX').on('click', function() {
                $('.selectedImg').empty();
                $('#blankBack').remove();
            });            
            $('#pg3Div').css('opacity', 1);
        });
    //*********************************************************************************************** projects page content
    let projects = ['orders', 'tictactoe', 'slotMachine', 'reclaim'];
    let projectTitles = ['Orders', 'TicTacToe', 'Slot Machine', 'Reclaim'];        
    $('#pg4Div').append(`<ul id = 'projGrid'></ul>`);
    let idx = 0;    
    for(let i in projects) {
        idx += 1;
        $('#projGrid').append(`
        <li id = '${projects[i]}_proj' class = 'projTiles'>
            <h5 id = '${projects[i]}Title' class = 'projTitles' data-tile-idx = '${idx}'>${projectTitles[i]}</h5>
            <a id = '${projects[i]}Link' href='Pages/${projects[i]}/index.html'>                
                <img id="${projects[i]}Img" class = "projTile" alt="${projects[i]}Tile" src='assets/${projects[i]}Img.png' />
                    </a>
                </img>
        </li>        
        `);
    }
    let descriptions = [
        
        'I built this web application as my final project and internship for finishing my AA degree at Edmonds College. At the time, \
        I was the lead bartender at the Outback Steakhouse and I conducted all of the liquor, beer, and wine ordering. \
        I used PHP, MySQL, JS and used this application in a live setting for over a year. It cut my labor time in half and virtually eliminated \
        ordering errors. ',
        
        'I wrote this Tic Tac Toe game to provide content to my portfolio and built the game specifically to showcase my ability to write OO JavaScript \
        and algoithms. ',
        
        'I created this slot machine game to add content for my portfolio and to showcase my ability to write OO JavaScript, js promises, async/await, and \
        it just seemed like a fun project. ', 
        
        'Reclaim is a game being built by the University of Minnesota that teaches users the Native American language Ojibwe. \
        In completing my capstone project, I was the team scrum master and software engineer. I designed and implemented the initial game UI. \
        The game isnt set to launch until 2025 so I am providing my exit documentation showing the initial UI framework that I designed & built. \
        '
        
    ];

    $(`.projTiles h5`).on('mouseover', (event) => {
        const hoveredElement = event.target;        
        let description = descriptions[hoveredElement.dataset.tileIdx - 1];        
        $('#projGrid').append(`<div id = 'descriptionBox'><p>${description}</p></div>`);
        let left = hoveredElement.getBoundingClientRect().left;
        let tileWidth = hoveredElement.getBoundingClientRect().width;
        let top = hoveredElement.getBoundingClientRect().top;

        if(Orientation.ScreenOrientation.id > 0) {
            Number(hoveredElement.dataset.tileIdx) % 4 > 0 ? $('#descriptionBox').css({
                'top': top,            
                'left': left - (tileWidth * (Number(hoveredElement.dataset.tileIdx) % 3)),
                'color': 'green',
            }) : $('#descriptionBox').css({        
                'top': top,
                'left': tileWidth * 2,
                'color': 'teal',
            });
            console.log('+++++++++++++++++++++++ LANDSCAPE  +++++++++++++++++++++++++++');
        } else {
            console.log(`left - (tileWidth * Number(hoveredElement.dataset.tileIdx) % 4)}: ${left - (tileWidth * Number(hoveredElement.dataset.tileIdx) % 4)}`);
            console.log(`top: ${top}`);
            console.log(`(Number(hoveredElement.dataset.tileIdx) % 3) : ${(Number(hoveredElement.dataset.tileIdx) % 3)}`)
            Number(hoveredElement.dataset.tileIdx) % 4 === 3 ? $('#descriptionBox').css({
                'top': top,            
                'left': tileWidth /*- (tileWidth * (Number(hoveredElement.dataset.tileIdx) % 3))*/,
                'color': 'purple',                
            }) : $('#descriptionBox').css({        
                'top': top / 2,
                'left': tileWidth * 1.5,
                'color': 'red',
            });
            console.log('+++++++++++++++++++++++ PORTRAIT  +++++++++++++++++++++++++++');
            console.log(`(Number(hoveredElement.dataset.tileIdx) % 4) : ${(Number(hoveredElement.dataset.tileIdx) % 4)}`)
        }
    });
    $(`.projTiles h5`).on('mouseout', function() {
        $('#descriptionBox').remove();
    });
    if('#reclaimLink') {
        $('#reclaimLink').attr('href', '#');
        $('#reclaimLink').on('click', function() {
            $('#pg4Div').append(`<iframe id = 'reclaimFrame' src = 'reclaimDocumentation.html'></iframe>`);
            $('#pg4Div').append(`<div id = 'reclaimFrameExit'>X</div>`);
            $('#reclaimFrameExit').on('click', function() {
                $('#reclaimFrame').remove();
                $('#reclaimFrameExit').remove();
            });
        })
    };
    
    $('#pg5Div').append(`<ul id = 'contactItems'></ul>`);
    let theContactItems = ['one', 'two', 'three'];
    for(let i = 0;i <= theContactItems.length;i++) {
        $('#contactItems').append(`<li id = '${theContactItems[i]}'>${theContactItems[i]}</li>`)
    }
});


//possibly incorporate the following url which was the initial design pitch that evolved into the game UI
//for my contributions to Reclaim:
//https://assets.adobe.com/id/urn:aaid:sc:US:0764a64f-df76-43da-b362-54ac76726b23?view=published