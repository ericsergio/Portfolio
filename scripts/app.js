//check
class Orientation {
    constructor(id) {    
        this.id = id;
    }
}

class Navigation {
    constructor(id, name, scrollPos, setToggle) {
        this.id = id || 0;
        this.name = name || 'about';
        this.scrollPos = scrollPos || 0;
        this.setToggle = setToggle || 0;        
    }
}

const pages = ['about', 'resume', 'examples', 'projects', 'contact'];


const getOrientation = () => {
    return window.innerHeight / window.innerWidth > 1 ? 0 : 1
};

const isLandscapeMode = () => {
    return getOrientation() === 1;
}

Navigation.current = new Navigation();

$(window).on("resize load", function(event){
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
    //designSite(pgs[this.id]);
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
            //I need to check this -- this was to account for the bottom of iphone's viewport being made visible when scrolling
            'height':`${document.body.clientHeight + 500}px`
        }).siblings().not((`#${pgs[this.id]}`)).each(function() {
        
        });
    }
}
/*This was one idea i had to randomly place lines going vertically and horizontally accross the screen
which is kinda cool but not very professional looking so i'm shelfing this for now.*/
/*const designSite = (page) => {
    let rnd10 = Math.floor(Math.random() * 6) + 3;
    $(`#${page}`).find($('.vLines')).remove();
    $(`#${page}`).append(`<ul class = 'vLines'></ul>`);
    $(`#${page}`).find($('.hLines')).remove();
    $(`#${page}`).append(`<ul class = 'hLines'></ul>`);
    for(let i = 0;i<=rnd10;i++) {
        $('.vLines').append(`<li id = 'vLine${i}'></li>`)
    }
    for(let i = 0;i<=rnd10;i++) {
        $('.hLines').append(`<li id = 'hLine${i}'></li>`)
    }
    $('.vLines').children().each(function() {        
        $(this).css({
            'left':`${Math.floor(Math.random() * document.body.clientWidth)}px`,
            'borderRightWidth':`${Math.floor(Math.random() * 40)}px`
        })
    });
    $('.hLines').children().each(function() {        
        $(this).css({
            'top':`${Math.floor(Math.random() * 100)}vh`,
            'borderTopWidth':`${Math.floor(Math.random() * 40)}px`            
        })
    });
}*/

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
})

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
        'backgroundColor':`#fff`,
        'z-index':5
    }).append(`
    <div id='pg1Div' class = 'pgContainer'>
    
    </div>`
    );
    /****************************************************************************   Resume Page  **********/
    $('#pg2').css({
        'position':`absolute`,
        'top':`${pgHeight}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`,
        'display':`none`
    }).append(`
    <div id='pg2Div' class = 'pgContainer'>
        
    </div>`
    );
    /****************************************************************************   Examples Page Content **********/
    $('#pg3').css({
        'position':`absolute`,
        'top':`${pgHeight * 2}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`,
        'display':`none`
    }).append(`
    <div id='pg3Div' class = 'pgContainer'>
        
    </div>`
    );
    /****************************************************************************   Projects Page Content **********/
    $('#pg4').css({
        'position':`absolute`,
        'top':`${pgHeight * 3}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`,
        'display':`none`
    }).append(`
    <div id='pg4Div' class = 'pgContainer'>
        
    </div>`
    );
    /****************************************************************************   Contact Page Content **********/
    $('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`,
        'display':`none`
    }).append(`
    <div id='pg5Div' class = 'pgContainer'>
        
    </div>`
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


//This function is where to add dynamic content to the pages
$(document).ready(function(){
    //*********************************************************************************************** about page content
    $('#pg1Div').append(`
    <div id = 'pg1Content'>
        <div id = "pBack" class = "aboutContent">
            <p>My name is Eric Sergio and am based out of the Greater Seattle Area.            
            </p>
        </div>
        
        <div id = "pMid">
        </div>
        
        <img id="pImage" alt="Profile Image" src="assets/ame.png"/>
    </div>
    `);
    //*********************************************************************************************** resume page content
    //$('#pg2Div').append(`<img id = 'resumeImg' alt='Resume Image' src='assets/EricDSergioResumeAsImage.png' />`);
    let sections = ['Summary', 'Education', 'Experience', 'Skills', 'Awards', 'Other'];
    $('#pg2Div').append(`
        <ul id = 'pg2ListGrid'></ul>
        <div id = "resumeContent"></div>
    `);
    for(let i in sections) {
        $('#pg2ListGrid').append(`<li id = '${sections[i]}Item' class = 'resumeListItems'>${sections[i]}</li>`)
    }
    for(let i in sections) {
        $(`#${sections[i]}Item`).append(`
            <div id = '${sections[i]}Drop' class = "dropArrow"></div>
        `);
    }
    //$('.resumeListItems').append('<div class = "dropArrow"></div>');
    //$('#pg2ListGrid').after('<div id = "resumeContent"></div>');
    $('#pg2ListGrid li').on('click', function() {
        switch($(this).attr('id')) {
            case 'SummaryItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<div id = 'summaryDiv' class = 'resumeSections'><p>Prior bartender, bar manager, and recent software development BAS graduate, 
                I am hoping to find a position where I can leverage my strong customer service background with the technical skills that I have 
                gained through my recent BAS degree that is accompanied with many years of prior informal learning I pursued for fun.</p></div>`);
                break;
            case 'EducationItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<div id = 'educationDiv' class = 'resumeSections'><ul id = 'educationList1'>Degree: Software Development BAS</ul><li>GPA:3.9</li><li>April 2021 - June 2023</li></ul>
                <ul id = 'educationList2'>Web Application And Cloud Development ATA</ul><li>GPA:3.8</li><li>April 2018 - April 2021</li></ul></div>`);
                break;
            case 'ExperienceItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<div id = 'experienceDiv' class = 'resumeSections'>
                <ul id = 'experienceList1'>
                    <li>Position: Software Engineer, Intern</li>
                    <li>January 2023 - June 2023</li>
                    <li>Scrum master for a 4-person developer team working on building a Unity game that helps people learn the Native American language, Ojibwe. </li>
                </ul>
                <ul id = 'experienceList2'>
                    <li>Position: Lead Bartender/Temporary Software Engineer Intern </li>
                    <li>August 2005 - Present</li>
                    <li>Became the lead bartender in 2018. In 2019, as the internship required to graduate with my associates degree, I proposed building a full stack
                    web application to digitize the ordering process of all liquor, beer, and wine which was previously done using pen and paper. This</a href = 'pages/orders/index.html'> app </a>
                    can be viewed via the projects page. </li>
                </ul>`);
                break;
            case 'SkillsItem':
                $('#resumeContent').empty();
                let skills = ['JavaScript', 'jQuery', 'Bash', 'Git', 'C#', 'SQL', 'Unity', 'MongoDB', 'MacOS/Unix', 'Docker', 'NodeJS', 'AngularJS', 
                'Agile', 'Perl', 'PHP', 'Dotnet', 'PowerShell', 'Android Studio', 'React Native', 'Unit Testing' ];
                $('#resumeContent').append(`<div id = 'skillsDiv' class = 'resumeSections'> <ul id="skillsGrid"></ul></div>`);
                for(let i in skills) {
                    $('#skillsGrid').append(`<li>${skills[i]}</li>`)
                };
                break;
            case 'AwardsItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<div id = 'awardsDiv' class = 'resumeSections'><ul><li>Phi Theta Kappa</li><li>Magna Cum Laude</li><li>LinkedIn Skills Badge:Bash</li>
                <li>LinkedIn Skills Badge:JavaScript</li><li>LinkedIn Skills Badge:Excel</li></ul></div>`);
                break;
            case 'VolunteeringItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<div id = 'volunteeringDiv' class = 'resumeSections'><h4>U6 Coed Soccer Coach - Mukilteo Cougars</h4>
                <h4>Coursera Data Analytics Certificate Offered by Google (In Progress)</h4></div>`);
                break;
            default:
                console.log('default');
                break;
        }
    })
    //*********************************************************************************************** examples page content
    //<img id="ordersProcImage" alt="ordersProc Image" src="assets/ordersProc.png"/>
    //<img id="randQuestionProcImage" alt="randQuestionProc Image" src="assets/randQuestionProc.png"/>
    $('#pg3Div').append(`
    <h5 id = 'exampleDescription'>These examples are code snippets of various projects that show my contributions/work. This section is intended to provide some insight of my coding ability/skills
     using various languages. Unless I make a note saying otherwise, everything included here is code that I originally wrote, Click on the heading to display each example snippet.</h5>
    <ul id='codeExampleList'>
        <li id = 'codeExample0'>
            Example orders SQL Procedure code snippet
        </li>
        <li id = 'codeExample1'>
            Example trivia SQL Procedure code snippet
        </li>
        <li id = 'codeExample2'>
            JavaScript to PHP workflow example            
        </li>
        <li id = 'codeExample3'>
            C# Unity User Interface development
        </li>
        <li id = 'codeExample4'>
            Mongo DB REST API development
        </li>
        <li id = 'codeExample5'>
            Bash shell programming and Docker snippets
        </li>

    </ul>
    <div class = 'selectedImg'></div>`
    );
    let examples = ['ordersProc', 'randQuestionProc', 'ordersWorkflowPHP', 'UIReclaimCSharp', 'restAPINode', 'shellProgramming' ];
    $('#codeExampleList li').append(`<div class = 'dropArrow' class = "dropArrow"></div>`);
    $('#codeExampleList li').each(function() {
        $(this).on('click', function() {
            let idx = Number($(this).attr('id').substr(-1, 1));
            $('.selectedImg').empty();
            $('.selectedImg').append(`<div id = 'currentExampleImgDiv'><img alt = '${examples[idx]} image' src='assets/${examples[idx]}.png' /></div>`)
        });
        
    });
    //*********************************************************************************************** projects page content
    let projects = ['orders', 'tictactoe', 'trivia'];    
    $('#pg4Div').append(`<ul id = 'projGrid'></ul>`);
    for(let i in projects) {
        $('#projGrid').append(`
        <li id = '${projects[i]}_proj' class = 'projTiles'>
            
            <a id = '${projects[i]}Link' href='Pages/${projects[i]}/index.html'>
                <img id="${projects[i]}Img" class = "projTile" alt="${projects[i]}Tile" src='assets/${projects[i]}Img.png' />
                    </a>
                </img>
        </li>`);
    }
    if(Orientation.ScreenOrientation.id < 1) {
        //$('a#triviaLink').preventDefault();
        let topValue = $('#trivia_proj')[0].getBoundingClientRect().top;
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
                $('#pg4Div').append(`<div id='triviaErr'><p>I apologize but it appears that you are on a mobile device 
                and the Trivia project has been problematic on mobile devices. I am working to fix this, in the meantime though, 
                please view the trivia project from a desktop.</p></div>`);
                $('#triviaErr').css({
                    'position':`absolute`,
                    'top':`18vh`,                
                    'right':`22vw`,
                    'width':`40vw`,
                    'height':`16vh`
                });
            } else {
                $('#triviaErr').remove();
            }
        });
    }
    //*********************************************************************************************** design page content

});

const exampleLandscapeZoom = () => {
    $('#sqlProcOrders-magnifyingGlass').on('mouseenter', function() {
        console.log($(this));
    });

/*    const magnifyingGlass = $('#ordersProcImage')[0];

    magnifyingGlass.addEventListener('mouseover', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        console.log("mousemove event fired");

        const magnifyingGlassWidth = magnifyingGlass.offsetWidth;
        const magnifyingGlassHeight = magnifyingGlass.offsetHeight;

        // Position the magnifying glass at the mouse coordinates
        magnifyingGlass.style.left = `${mouseX - magnifyingGlassWidth / 2}px`;
        magnifyingGlass.style.top = `${mouseY - magnifyingGlassHeight / 2}px`;
    });
magnifyingGlass.addEventListener('mousedown', (event) => {
    event.preventDefault();
  
    const elementUnderMagnifyingGlass = document.elementFromPoint(event.clientX, event.clientY);
  
    if (elementUnderMagnifyingGlass) {
      zoomIn(elementUnderMagnifyingGlass, event.clientX, event.clientY);
    }
  });

  document.addEventListener('mouseup', () => {
  const zoomedElements = document.querySelectorAll('[style^="transform: scale("]');


  for (const element of zoomedElements) {
    element.style.transform = '';
  }
});*/
}


/*
function zoomIn(element, mouseX, mouseY) {
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
  
    const zoomFactorHeight = 3;
    const zoomFactorWidth = 2;
    const zoomedWidth = elementWidth * zoomFactorWidth;
    const zoomedHeight = elementHeight * zoomFactorHeight;
    console.log(`zoomedHeight: ${zoomedHeight} \n zoomedWidth:${zoomedWidth}`);
  
    const zoomedLeft = mouseX - zoomedWidth / 2;
    const zoomedTop = mouseY - zoomedHeight / 2;
  
    console.log(`zoomedLeft: ${zoomedLeft} \n zoomed:${zoomedTop}`);
    element.style.transform = `scale(${zoomFactorHeight}) translate(${zoomedLeft}px, ${zoomedTop}px)`;
  }
*/



/*$( "img#ordersImg.projTile" ).hover(
    function() {/
      $( this )./append( $( "<span> ***</span>" ) );
    }, function() {/
      $( this ).fin/d( "span" ).last().remove();
    }/
  );/
*/


