//check
class Orientation {
    constructor(id) {    
        this.id = id;
    }
};

class Navigation {
    constructor(id, name, scrollPos, setToggle) {
        this.id = id || 0;
        this.name = name || 'about';
        this.scrollPos = scrollPos || 0;
        this.setToggle = setToggle || 0;        
    }
};

const pages = ['about', 'resume', 'examples', 'projects'];


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
        });
        //}).siblings().not((`#${pgs[this.id]}`)).each(function() {
        
        //});
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
    /*$('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'display':`none`
    }).append(`
    <div id='pg5Div' class = 'pgContainer'></div>`
    );*/
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
            <p id = 'aboutTxt'>
            <span class = 'halfWidth'>My name is Eric Sergio and live in the Greater Seattle area.
                </span>
                <span class = 'fullWidth'>I have experience in front-end and back-end development
                with a proven ability to create responsive and mobile-friendly websites. I set high expectations 
                for myself in anything I do and have a strong drive to continue to learn and improve. 
                Thank you for taking the time to visit my site.
                    <br><br>**Site is under construction.<br><br>**Site is built from scratch.
                </span>
            </p>
        </div>
        
        <div id = "pMid"></div>
        
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
                $('#resumeContent').append(`<div id = 'educationDiv' class = 'resumeSections'>
                <ul id = 'educationList1'>
                    <li>Bellevue College \t April 2021 - June 2023</li>    
                    <li>Degree: Software Development BAS</li>
                    <li>GPA:3.9 | Magna Cum Laude</li>                    
                    <li>Undergraduate Coursework: Mobile Application Development, Web Development, Application Architecture, Unit
                    Testing, Data Structures and Algorithms, Object Oriented Programming, Database Architecture and Manipulation,
                    Agile Framework, Project Management</li>
                </ul>
                <ul id = 'educationList2'>
                    <li>Edmonds College \t April 2018 - April 2021</li>    
                    <li>Web Application And Cloud Development ATA</li>
                    <li>GPA:3.8 | Phi Theta Kappa</li>                    
                    <li>Undergraduate Coursework: Full Stack Web Development, JavaScript Frameworks, Database Implementation,
                    Systems Analysis, Project Management</li>
                </ul>
                </div>`);
                if(Orientation.ScreenOrientation.id === 0) {
                    $('#educationList2').hide();
                    $('#resumeContent').append(`<button id = 'edNext'>Next</button>`);
                    $('#edNext').on('click', function() {
                        $('#educationDiv ul').each(function(){
                            $(this).toggle();                            
                        });
                        $('#educationList1')[0].style.display ? $('#edNext').html('Previous') : $('#edNext').html('Next');              
                    });
                }
                break;
            case 'ExperienceItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<div id = 'experienceDiv' class = 'resumeSections'>
                <ul id = 'experienceList1'>
                    <li>Position: Software Engineer, Intern</li>
                    <li>January 2023 - June 2023</li>
                    <li>Scrum master for a 4-person developer team working on building a Unity game that helps people learn the Native American language, Ojibwe.</li>
                    <ol>
                        <li>Piloted the adoption of Unity's UI Toolkit, replacing legacy UI and significantly enhancing the game's user
                        experience.</li>
                        <li>Organized and oversaw daily stand-up meetings and sprint retrospectives and configured DevOps.</li>
                        <li>Wrote the code for the entire UI's initial framework in which everyone else built off of.</li>
                    </ol>

                </ul>
                <ul id = 'experienceList2'>
                <li>Position: Lead Bartender/Temporary Software Engineer Intern </li>
                <li>August 2005 - Present</li>
                <li>Became the lead bartender in 2018.</li>
                <ol>
                    <li> In 2019, I proposed building a full stack web application to digitize the ordering process of all liquor,
                        beer, and wine for the restaurant that I bartended at and as the lead bartender, conducted the ordering for. </li>
                    <li>Virtually eliminated unit quantity ordering errors and standardized product type units.</li>
                    <li>Built a dedicated database management page to allow a non-technical user to be capable of updating database
                        directly from a web interface.</li>
                </ol>

                </ul>`);
                if(Orientation.ScreenOrientation.id === 0) {
                    $('#experienceList2').hide();
                    $('#resumeContent').append(`<button id = 'expNext'>Next</button>`);
                    $('#expNext').on('click', function() {
                        $('#experienceDiv ul').each(function(){
                            $(this).toggle();                            
                        });
                        $('#experienceList1')[0].style.display ? $('#expNext').html('Previous') : $('#expNext').html('Next');              
                    });
                }
                break;
            case 'SkillsItem':
                $('#resumeContent').empty();
                let skills = ['JavaScript', 'jQuery', 'Bash', 'Git', 'C#', 'SQL', 'Unity', 'MongoDB', 'MacOS/Unix', 'Docker', 'NodeJS', 'AngularJS', 
                'Agile', 'Perl', 'PHP', 'Dotnet', 'PowerShell', 'Android Studio', 'React Native', 'Unit Testing' ];
                let skillDescriptions = [
                    'By far JavaScript is the language that I am the most proficient with. I intentionally learned JavaScript without using an IDE and while using "strict mode". Although a lot of my code samples utilize JQuery, I initially spent a great deal of time without using any helper libraries. I am very comfortable using OO JavaScript including prototyping and classes. I earned a LinkedIn skills badge for JavaScript where I scored within the top tenth percentile of those who attempted the assessment, and for those who aren\'t familiar with LinkedIn skills badges, they are assessments where you are only allowed to take the assessment a set number of times and if you score within the top fifteenth percentile then you earn a skill badge for that language. Over a million LinkedIn users had taken the js assessment and so I am especially proud to have scored as high as I did for this particular assessment.',                     
                    'Shortly after learning base js, I took a course on JavaScript frameworks and libraries where JQuery was the most utilized library that the curriculum covered. I found JQuery to be a huge time saver and use it almost any time I use JavaScript. I would consider myself to be highly proficient using it.',                    
                    'Another language that I have extensive experience with. I am a Mac user and as such I work in a UNIX environment. I use my command line for just about everything I do on my computer and rarely need to use the UI. I really enjoy shell programming and have devoted a ton of my free time to learning how to most effectively accomplish tasks from my shell. I often use languages/utilities such as SED and AWK in conjunction with bash as I love the puzzle of turning data into useful information via text manipulation.',
                    'Although I am very cautious using Git I have several years of experience using it in team projects. There is plenty more for me to learn using git but I am very comfortable with day to day github usage',
                    'C# is the language that my BAS degree was based around and I have used it in numerous scenarios. ',
                    'SQL is one of my favorite languages as I love working with databases. I have used MySQL and SQL server extensively, sqlite3, and the MySQL and SQL Server cloud based SQL solutions. I have built numerous databases from scratch for various projects and am proficient creating stored procedures, views, and transactions in addition to incorporating them into backend code to display data on the frontend. On the projects page, my Inventory Management application provides live examples of this in a functional app; there are also code snippets available on the examples page.',
                    'I acquired the experience I have in Unity during my Capstone project for my BAS degree. I was put on a team of 4 developers working on the improvement of a game being sponsored by the University of Minnesota to help people learn the Native American language, Ojibwe. I held the role of Scrum Master for this project and as such, I organized our daily stand-ups, weekly reviews, our DevOps dashboard/project boards, and served as a general team helper as needed. In addition to my role as the scrum master, I was one of the main development contributors too, and in fact, I built the entire framework for the UI and designed the UI. It happened this way because I pitched the idea that was chosen in the early stages of our team being onboarded to the development team. After my pitch was selected, I conducted a great deal of research because this was my first time using Unity. This research led me to pitching a new idea which was scrapping the pre-fab method of building the UI and using the more modern UI Toolkit technology. '
                ];
                $('#resumeContent').append(`<div id = 'skillsDiv' class = 'resumeSections'> <ul id="skillsGrid"></ul></div>`);
                $('#resumeContent').append(`<p id = 'skillDescription'></p>`);                
                for(let i in skills) {
                    $('#skillsGrid').append(`<li>${skills[i]}</li>`)
                };
                if(Orientation.ScreenOrientation.id === 1) {
                    $('#skillsGrid li').each(function() {
                        $(this).on('mouseenter', function() {
                            $(this).css('color', 'yellow');                            
                            $('#skillDescription').append(`${skillDescriptions[$(this).index()]}`)
                        });
                        $(this).on('mouseleave', function() {
                            $('#skillDescription').empty();
                            $(this).css('color', '#fff');
                        });
                    });
                }
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
    });

    //*********************************************************************************************** examples page content
    //<img id="ordersProcImage" alt="ordersProc Image" src="assets/ordersProc.png"/>
    //<img id="randQuestionProcImage" alt="randQuestionProc Image" src="assets/randQuestionProc.png"/>
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
    //shellProgramming
    let examples = ['ordersProc', 'randQuestionProc', 'ordersWorkflowPHP', 'UIReclaimCSharp', 'restAPINode', 'shellProgramming' ];
    $('#codeExampleList option');
    $('#codeExampleList').on('change', function() {
        //$('#codeExampleList').on('change', function() {
            console.log($('#codeExampleList option:selected'))
            //console.log($(this))
            let idx = Number($('#codeExampleList option:selected').attr('id').substr(-1, 1));
            console.log(idx)
            $('.selectedImg').empty();
            $('.selectedImg').append(`
            <div id = 'currentExampleImgDiv'>
                <img alt = '${examples[idx]} image' src='assets/exampleImages/${examples[idx]}.png' />
            </div>`)
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
    }
});

const exampleLandscapeZoom = () => {
    $('#sqlProcOrders-magnifyingGlass').on('mouseenter', function() {
        console.log($(this));
    });
}
