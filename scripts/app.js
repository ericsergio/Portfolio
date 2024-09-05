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
}

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
}

Navigation.current = new Navigation();

$(window).on("resize load", function(event){
    $(document.body).css({
        'backgroundImage': 'url("https://ericdsergio.webhop.me/assets/woodSculpture.png")',
        'backgroundRepeat': `no-repeat`,
        'backgroundAttachment': `fixed`
    })
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


/*gets ran on load or page resize to Portrait mode */
const doPortraitNav = () => {
}

/*gets ran on load or page resize to Landscape mode */
const doLandscapeNav = () => {
    $('#navBtn').hide();
    $('#mainMenu').css('gridTemplateColumns', '.7fr .7fr .7fr .7fr .7fr 2fr')
}

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

$(document).ready(function(){
    let pageIdx = 0;
    for(let current in pages) {
        Navigation[[pages[current]]] = new Navigation(pageIdx, pages[current], (window.innerHeight * pageIdx));        
        $('#mainMenu').append(`<li id = ${pages[current]}>${pages[current]}</li>`);
        pageIdx += 1;
    }
    $('#mainMenu li').each(function(){
        $(this).on('click', function(){           
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
    /*if(getOrientation() === 1) {
        $('.pgContainer').each(function() {
            $(this).on('mouseenter', function() {
                $(this).css('opacity', '.9');                
            });
            $(this).on('mouseleave', function() {
                $(this).css('opacity', '.5');
            });
        });
    }*/
});


//This function is where to add dynamic content to the pages

$(document).ready(function(){
    //*********************************************************************************************** about page content
    $('#pg1Div').append(`
    <div id = 'pg1Content'>
        <div id = "pBack" class = "aboutContent">
            <p id = 'aboutTxt'>
                <span class = 'halfWidth'>My name is Eric Sergio and live in the Greater Seattle area. </span>
                <span class = 'fullWidth'>Thank you for taking the time to visit my website! I am a recent 
                graduate of Bellevue College's Software Development BAS program. I am a bartender and former bar manager
                in the process of transitioning careers into IT. I have a strong customer service background as
                well as a strong academic background in software development. I am currently seeking a position where 
                I can leverage my strong customer service background with the technical skills that I have gained through 
                my recent BAS degree.

                </span>
                <span id = 'inprogress'>**Site under construction<br>**Site is built from scratch</span>
            </p>
        </div>
        <div id = "pMid"></div>        
    </div>
    `);
    if(getOrientation() === 1) {
        $('#pg1').append(`<img id="pImage" alt="Profile Image" src="assets/me.jpg"/>`);
    } else {
        $('#pg1Div').append(`<img id="pImage" alt="Profile Image" src="assets/me.jpg"/>`);
    }
    //*********************************************************************************************** resume page content
    $('#pg2Div').append(`<div id='iframeBack'><iframe id = 'resumeFrame' src = 'resume.html'></iframe></div>`);


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
            console.log($('#codeExampleList option:selected'))
            let idx = Number($('#codeExampleList option:selected').attr('id').substr(-1, 1));
            console.log(idx)
            $('.selectedImg').empty();
            $('.selectedImg').append(`
            <div id = 'currentExampleImgDiv'>
                <img alt = '${examples[idx]} image' src='assets/exampleImages/${examples[idx]}.png' />
            </div>`)
        });
    //*********************************************************************************************** projects page content
    let projects = ['orders', 'tictactoe', 'slotMachine'/*, 'trivia'*/, 'reclaim'];    
    $('#pg4Div').append(`<ul id = 'projGrid'></ul>`);
    for(let i in projects) {        
        $('#projGrid').append(`
        <li id = '${projects[i]}_proj' class = 'projTiles'>
            <a id = '${projects[i]}Link' href='Pages/${projects[i]}/index.html'>
                <img id="${projects[i]}Img" class = "projTile" alt="${projects[i]}Tile" src='assets/${projects[i]}Img.png' />
                    </a>
                </img>
        </li>`)
    }
    if('#reclaimLink') {
        $('#reclaimLink').attr('href', '#');
        $('#reclaimLink').on('click', function() {
            $('#pg4Div').append(`<iframe id = 'reclaimFrame' src = 'reclaimDocumentation.html'></iframe>`);
            $('#reclaimFrame').css({
                'position':`absolute`,
                'top':`0px`,
                'left':`0px`,                
                'width':`100%`,
                'height':`100%`
            });
            $('#pg4Div').append(`<div id = 'reclaimFrameExit'>X</div>`);
            $('#reclaimFrameExit').css({
                'position':`relative`,
                'top':`5%`,
                'left':`97%`,
                'fontSize':`1.3em`,
                'color':`red`
            });
            $('#reclaimFrameExit').on('click', function() {
                $('#reclaimFrame').remove();
                $('#reclaimFrameExit').remove();
            });
        })
    }
    



    /*if(getOrientation() < 1) {
        //$('a#triviaLink').preventDefault();
        /*let topValue = $('#trivia_proj')[0].getBoundingClientRect().top;
        let leftValue = $('#trivia_proj')[0].getBoundingClientRect().left;
        console.log(`top:${topValue} | left: ${leftValue}`);
        $('#triviaLink').before(`<div id = 'triviaBlock'></div>`);
        $('#triviaBlock').css({    
            'position':`absolute`,
            'height':`200px`,
            'width':`100px`,
            'backgroundColor':`none`,
            'z-index':`7`
        }).on('click', function() {
            if($('#triviaErr').text().length === 0) {
                $('#pg4Div').append(`<div id='triviaErr'>Please view the Trivia project from a desktop. 
                The mobile version is under construction. Click the Trivia project again to exit.</div>`);
                $('#triviaErr').css({
                    'position':`absolute`,
                    'top':`5vh`,                
                    'right':`22vw`,
                    'width':`40vw`,
                    'height':`16vh`
                });
            } else {
                $('#triviaErr').remove();
            }
        });
    }*/
    $('#pg5Div').append(`<ul id = 'pageStats'></ul>`);
    let stats = ['aspectRatio', 'orientation', 'innerHeight', 'innerWidth', 'visualViewportHeight', 'visualViewportWidth', 'devicePixelRatio' ];    
    for(let i = 0; i < stats.length;i++){
        $('#pageStats').append(`<li id = '${stats[i]}'>text</li>`);
    }
    console.log(window.innerHeight)
    $('#aspectRatio').html(`AspectRatio: ${AspectRatio.currentAspectRatio.ratio}`);
    $('#orientation').html(`Orientation(0:portrait, 1:landscape): ${getOrientation()}`);
    $('#innerHeight').html(`window.innerHeight: ${window.innerHeight}`);
    $('#innerWidth').html(`window.innerWidth: ${window.innerWidth}`);
    $('#visualViewportHeight').html(`visualViewportHeight: ${window.visualViewport.height}`);
    $('#visualViewportWidth').html(`visualViewportWidth: ${window.visualViewport.width}`);
    $('#devicePixelRatio').html(`devicePixelRatio: ${window.devicePixelRatio}`);
});

//possibly incorporate the following url which was the initial design pitch that evolved into the game UI
//for my contributions to Reclaim:
//https://assets.adobe.com/id/urn:aaid:sc:US:0764a64f-df76-43da-b362-54ac76726b23?view=published