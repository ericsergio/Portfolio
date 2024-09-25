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

const pages = ['about', 'resume', 'examples', 'projects', 'test'];


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
    let prevPage = pgs[Navigation.current.id];
    window.scrollTo(0, this.scrollPos);
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

$(document).ready(function() {
    let pageIdx = 0;
    for(let current in pages) {
        Navigation[[pages[current]]] = new Navigation(pageIdx, pages[current], (window.innerHeight * pageIdx));        
        $('#mainMenu').append(`<li id = ${pages[current]}>${pages[current]}</li>`);
        pageIdx += 1;
    }
    $('#mainMenu li').each(function() {
        $(this).on('click', function() {           
            //this is where the navigation occurs using the prototype function scrollToPage
            //using the ids the click runs the prototype on the clicked nav item and scrolls  
            //to the appropriate spot
            Navigation[[$(this).attr('id')]].scrollToPage();
            if(Orientation.ScreenOrientation.id < 1) {
                $('#mainMenu').hide(100);
            };            
        });
    });
});

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
    }).append(`
    <div id='pg1Div' class = 'pgContainer'></div>`
    );
    /****************************************************************************   Resume Page  **********/
    $('#pg2').css({
        'position':`absolute`,
        'top':`${pgHeight}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`
    <div id='pg2Div' class = 'pgContainer'></div>`
    );
    /****************************************************************************   Examples Page Content **********/
    $('#pg3').css({
        'position':`absolute`,
        'top':`${pgHeight * 2}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`
    <div id='pg3Div' class = 'pgContainer'></div>`
    );
    /****************************************************************************   Projects Page Content **********/
    $('#pg4').css({
        'position':`absolute`,
        'top':`${pgHeight * 3}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`
    <div id='pg4Div' class = 'pgContainer'></div>`
    );
    /****************************************************************************   Contact Page Content **********/
    $('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`
    <div id='pg5Div' class = 'pgContainer'></div>`
    );
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
                    <span class = 'intro'>My name is Eric Sergio and live in the Greater Seattle area.
                        Thank you for taking the time to visit my website!
                    </span>                        
                </p>
            </div>

            <div id = "aboutBackLower" class = "aboutContent">
                <p class = 'aboutTxt'>
                    <span class = "intro">I am a graduate of Bellevue College's Software Development BAS program. 
                        I am a bartender and former bar manager in the process of transitioning careers into IT. 
                        I am currently seeking a position where I can leverage my strong customer service background 
                        with the technical skills that I have gained through my BAS degree and several years of self-study.
                    </span>
                </p>
            </div>
        </div>
    `);    
    if(getOrientation() === 1) {
        $('#pg1Div').append(`<img id="pImage" alt="Profile Image" src="assets/meHS.jpeg"/>`);        
    } else {
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
            JS->PHP
        </option>
        <option id = 'codeExample3' value="option3">
            C# Unity
        </option>
        <option id = 'codeExample4' value="option4">
            MongoDB REST API
        </option>
        <option id = 'codeExample5' value="option5">
            Bash -> Docker
        </option>
    </select>
    <div class = 'selectedImg'></div>`
    );
    let examples = ['ordersProc', 'randQuestionProc', 'ordersWorkflowPHP', 'UIReclaimCSharp', 'restAPINode', 'shellProgramming' ];
    $('#codeExampleList option');
    $('#codeExampleList').on('change', function() {
            let idx = Number($('#codeExampleList option:selected').attr('id').substr(-1, 1));
            $('.selectedImg').empty();
            $('.selectedImg').append(`
            <div id = 'currentExampleImgDiv'>
                <img id = '${examples[idx]}_img' alt = '${examples[idx]} image' src='assets/exampleImages/${examples[idx]}.png' />
            </div>`);
            if(getOrientation() === 1) {
                $('#currentExampleImgDiv').after(`<p class = 'currentExampleImgDivX'>X</p>`);
                $('.currentExampleImgDivX').on('click', function() {
                    $('.selectedImg').empty();
                });
            }
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
        I was the lead bartender at the Outback Steakhouse and I conducted all of the liquor, beer, and wine ordering and inventory management \
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
        console.log(hoveredElement.dataset.tileIdx % 3);
        let description = descriptions[hoveredElement.dataset.tileIdx - 1];        
        $('#projGrid').append(`<div id = 'descriptionBox'><p>${description}</p></div>`);
        let left = hoveredElement.getBoundingClientRect().left;
        let tileWidth = hoveredElement.getBoundingClientRect().width;
        let tileHeight = hoveredElement.getBoundingClientRect().height;
        let top = hoveredElement.getBoundingClientRect().top;
        console.log(`left - (tileWidth * Number(hoveredElement.dataset.tileIdx: ${left - (tileWidth * Number(hoveredElement.dataset.tileIdx))}`);
        console.log(`left: ${left}`);
        console.log(`tileWidth: ${tileWidth}`);
        console.log(`tileWidth * Number(hoveredElement.dataset.tileIdx: ${tileWidth * Number(hoveredElement.dataset.tileIdx)}`);
        console.log(`tileWidth: ${tileWidth}`);
        if(Orientation.ScreenOrientation.id > 0) {
            Number(hoveredElement.dataset.tileIdx) % 3 > 0 ? $('#descriptionBox').css({
                'top': top,            
                'left': left - (tileWidth * (Number(hoveredElement.dataset.tileIdx) % 3)),
            }) : $('#descriptionBox').css({        
                'top': top,
                'left': tileWidth * 2,
            });
            console.log('+++++++++++++++++++++++ LANDSCAPE  +++++++++++++++++++++++++++');
        } else {
            console.log(`left - (tileWidth * Number(hoveredElement.dataset.tileIdx: ${left - (tileWidth * Number(hoveredElement.dataset.tileIdx) % 3)}`);
            console.log(`top: ${top}`);
            Number(hoveredElement.dataset.tileIdx) % 3 > 0 ? $('#descriptionBox').css({
                'top': top,            
                'left': left - (tileWidth * (Number(hoveredElement.dataset.tileIdx) % 3)),
                'color': 'purple',
                'width': 'auto'
            })
            
            : $('#descriptionBox').css({        
                'top': '-400px',
                'left': tileWidth * 2,
                'color': 'red',
            });
            console.log('+++++++++++++++++++++++ PORTRAIT  +++++++++++++++++++++++++++');
            
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
    
    $('#pg5Div').append(`<ul id = 'pageStats'></ul>`);
    let stats = ['aspectRatio', 'orientation', 'innerHeight', 'innerWidth', 'visualViewportHeight', 'visualViewportWidth', 'devicePixelRatio' ];    
    for(let i = 0; i < stats.length;i++) {
        $('#pageStats').append(`<li id = '${stats[i]}'>text</li>`);
    }
    $('#aspectRatio').html(`AspectRatio: ${AspectRatio.currentAspectRatio.ratio}`);
    $('#orientation').html(`Orientation(0:portrait, 1:landscape): ${getOrientation()}`);
    $('#innerHeight').html(`window.innerHeight: ${window.innerHeight}`);
    $('#innerWidth').html(`window.innerWidth: ${window.innerWidth}`);
    $('#visualViewportHeight').html(`visualViewportHeight: ${window.visualViewport.height}`);
    $('#visualViewportWidth').html(`visualViewportWidth: ${window.visualViewport.width}`);
    $('#devicePixelRatio').html(`devicePixelRatio: ${window.devicePixelRatio}`);
});

function getAncestorElements(element) {
    const ancestors = [];
    let currentElement = element.parentElement; // Start with the direct parent
  
    while (currentElement) {
      ancestors.push(currentElement);
      currentElement = currentElement.parentElement; // Move to the next ancestor
    }
  
    console.log(ancestors);
    return ancestors;
  }
  

  /*const getDescendantElements = (element) => {
    const descendants = [];
    const children = element.querySelectorAll('*'); 
  
    children.forEach(child => { descendants.push(child); });
    console.log(descendants);
    return descendants;
  }*/

  const getDescElems = (element) => {
    const descendants = [];
    let child = element.querySelector('*'); // Get the first child (if any)
  
    while (child) {
      descendants.push(child);
      descendants.push(...getDescElems(child)); // Recursively get descendants of the child
      child = child.nextElementSibling; // Move to the next sibling at the same level
    }
    //console.log(descendants);
    return descendants.sort();
  }


//possibly incorporate the following url which was the initial design pitch that evolved into the game UI
//for my contributions to Reclaim:
//https://assets.adobe.com/id/urn:aaid:sc:US:0764a64f-df76-43da-b362-54ac76726b23?view=published