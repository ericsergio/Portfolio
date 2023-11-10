//check
class Orientation {
    constructor(id) {    
        this.id = id;
    }
}

class Navigation {
    constructor(id, name, scrollPos) {
        this.id = id || null;
        this.name = name || null;
        this.scrollPos = scrollPos || null;
        
    }
}

const pages = ['about', 'resume', 'examples', 'projects', 'design'];



const getOrientation = () => {
    return window.innerHeight / window.innerWidth > 1 ? 0 : 1
};

Navigation.current = new Navigation();

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
    let tempCheckTop = 25;
    let tempCheckLeft = 25;
    $('#navBtn').on('click', function(){
        $('#mainMenu').toggle(100);        
    });
}

const doLandscapeNav = () => {
    $('#navBtn').hide();
    $('#mainMenu').css('gridTemplateColumns', '.7fr .7fr .7fr .7fr .7fr 2fr')
}

Navigation.prototype.scrollToPage = function() {
    window.scrollTo(0, this.scrollPos);
    Navigation.current.name = this.name;
    Navigation.current.scrollPos = this.scrollPos;
    Navigation.current.id = this.id;
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



//This function is the page set up and navigation system - page containers are created here
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
            //to the appropriate spot
            Navigation[[$(this).attr('id')]].scrollToPage();
            if(Orientation.ScreenOrientation.id < 1) {
                $('#mainMenu').hide(100);
            }
            
        })
    })
    let pgHeight = window.innerHeight;    
    $('body').css('height', `${pgHeight * pages.length}px`)
/****************************************************************************   About Page  **********/
    $('#pg1').css({
        'position':`absolute`,
        'top':`0px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#00747C`,
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
        'backgroundColor':`#fff`
    }).append(`
    <div id='pg2Div' class = 'pgContainerE'>
        
    </div>`
    );
    
/****************************************************************************   Examples Page Content **********/
    
    $('#pg3').css({
        'position':`absolute`,
        'top':`${pgHeight * 2}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#00747C`
    }).append(`
    <div id='pg3Div' class = 'pgContainer'>
        <h1>PAGE 3</h1>
    </div>`
    );
    
/****************************************************************************   Projects Page Content **********/

    $('#pg4').css({
        'position':`absolute`,
        'top':`${pgHeight * 3}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#fff`
    }).append(`
    <div id='pg4Div' class = 'pgContainerE'>
        
    </div>`
    );
    
/****************************************************************************   Design Page Content **********/
    
    $('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#00747C`
    }).append(`
    <div id='pg5Div' class = 'pgContainer'>
        <h1>PAGE 5</h1>
    </div>`
    );
    
});


//This function is where to add dynamic content to the pages
$(document).ready(function(){
    //about page content
    $('#pg1Div').append(`
    <ul id = 'pg1List'>
        <li id = 'pg1Item1'>
            <p id = "greeting" class = "aboutContent">My name is Eric Sergio and am based out of the Greater Seattle Area.
                As a prior longtime bartender, I am a career transitioning millennial aspiring to launch a new career in IT. 
            </p>
            <p id = "greeting2"> Wherever I land, I will take the opportunity to learn as much as I can and as quickly as I can as I have a lot of
                ground to make up to fulfill my goals. I am an excellent problem solver with a strong sense of curiosity and drive. My degree was based 
                around C#, and my strongest tech skills include JavaScript, Bash, MySQL, jQuery, PHP, GCP and Azure. I can adapt and learn new languages 
                as needed. My site is under construction, below are temporary links to a few of my projects.
            </p> 
        <div id = "tempLinks">
            Inventory Management:<a href="Pages/orders/index.html">Inventory Management</a><br>
            Tic Tac Toe:<a href="Pages/TicTacToe/index.html"> Tic Tac Toe</a><br>
            Trivia:<a href="Pages/trivia/index.html">Trivia</a><br></div>
        <li id='pg1Item2'>
            <img id="pImage" alt="Profile Image" src="assets/ame.png"/>
        </li>
    </ul>`);
    //resume page content
    //$('#pg2Div').append(`<img id = 'resumeImg' alt='Resume Image' src='assets/EricDSergioResumeAsImage.png' />`);
    let sections = ['Summary', 'Education', 'Experience', 'Skills', 'Awards', 'Volunteering'];
    $('#pg2Div').append(`<ul id = 'pg2ListGrid'></ul><div id = "resumeContent"></div>`);
    for(let i in sections) {
        $('#pg2ListGrid').append(`<li id = '${sections[i]}Item'>${sections[i]}</li>`);        
    }
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
                    <li>Lead Bartender/Temporary Software Engineer Intern </li>
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
    //examples page content
    $('#pg3Div').append(`
    <ul id='codeExampleList'>
        <li>
            <img id="ordersProcImage" alt="ordersProc Image" src="assets/ordersProc.png"/>
        </li>
    </ul>
    <div class = 'zoomedImg'></div>`
    );


    //---------------------------------------------//---------------------------------------------
    
    //---------------------------------------------//---------------------------------------------
    //projects page content
    let projects = ['orders', 'tictactoe', 'trivia', 'extra'];
    $('#pg4Div').append(`<ul id = 'projGrid'></ul>`);
    for(let i in projects) {
        $('#projGrid').append(`
        <li id = '${projects[i]}_proj' class = 'projTiles'>
            
            <a id = '${projects[i]}Link' href='Pages/${projects[i]}/index.html'>
                <img id="${projects[i]}Img" class = "projTile" alt="ordersTile" src='assets/${projects[i]}Img.png' />
                    </a>
                </img>
            
        </li>`);
    }
    $('.pgContainer').append(`<p id = 'tempDisclaimer'>Some content is only temporary, Site is under construction, working on functionality first. 
    Note: I am intentionally avoiding using wordpress/joomla templates and helper libraries (exception of jquery). Site is built from scratch</p>`);
    //
    //design page content


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

