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
            $('#mainMenu').hide(100);
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
        'backgroundColor':`#142033`,
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
    <div id='pg2Div' class = 'pgContainer'>
        
    </div>`
    );
    
/****************************************************************************   Examples Page Content **********/
    
    $('#pg3').css({
        'position':`absolute`,
        'top':`${pgHeight * 2}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#000`
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
    <div id='pg4Div' class = 'pgContainer'>
        
    </div>`
    );
    
/****************************************************************************   Design Page Content **********/
    
    $('#pg5').css({
        'position':`absolute`,
        'top':`${pgHeight * 4}px`,
        'height':`${pgHeight}px`,
        'width':`100%`,
        'backgroundColor':`#000`
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
                $('#resumeContent').append(`<p id = "summaryContent">Prior bartender, bar manager, and recent software development BAS graduate, 
                I am hoping to find a position where I can leverage my strong customer service background with the technical skills that I have 
                gained through my recent BAS degree that is accompanied with many years of prior informal learning I pursued for fun.</p>`);
                break;
            case 'EducationItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<h4>Degree: Software Development BAS</h4><p>GPA:3.9</p><p>April 2021 - June 2023</p>
                <h4>Web Application And Cloud Development ATA</h4><p>GPA:3.8</p><p>April 2018 - April 2021</p>`);
                break;
            case 'ExperienceItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<h4>Position: Software Engineer, Intern</h4><p>January 2023 - June 2023</p><p>Scrum master for a 4-person
                developer team working on building a Unity game that helps people learn the Native American language, Ojibwe. </p>`);
                break;
            case 'SkillsItem':
                $('#resumeContent').empty();
                let skills = ['JavaScript', 'jQuery', 'Bash', 'Git', 'C#', 'SQL', 'Unity', 'MongoDB', 'MacOS/Unix', 'Docker', 'NodeJS', 'AngularJS', 
                'Agile', 'Perl', 'PHP', 'Dotnet', 'PowerShell', 'Android Studio', 'React Native', 'Unit Testing' ];
                $('#resumeContent').append(`<ul id="skillsGrid"></ul>`);
                for(let i in skills) {
                    $('#skillsGrid').append(`<li>${skills[i]}</li>`)
                };
                $('#skillsGrid').css({
                    'display':'grid',
                    'list-style-type':'none',
                    'gridTemplateColumns': '1fr 1fr 1fr 1fr',
                    'gridColumnGap': '3%'
                })
                break;
            case 'AwardsItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(`<ul><li>Phi Theta Kappa</li><li>Magna Cum Laude</li><li>LinkedIn Skills Badge:Bash</li>
                <li>LinkedIn Skills Badge:JavaScript</li><li>LinkedIn Skills Badge:Excel</li></ul>`);
                break;
            case 'VolunteeringItem':
                $('#resumeContent').empty();
                $('#resumeContent').append(``);
                break;
            default:
                console.log('default');
                break;
        }
    })
        
    
    

    //examples page content

    //projects page content
    let projects = ['orders', 'tictactoe', 'trivia'];
    $('#pg4Div').append(`<ul id = 'projGrid'></ul>`);
    for(let i in projects) {
        $('#projGrid').append(`
        <li id = '${projects[i]}_proj' class = 'projTiles'>
            <div>
                <a href='Pages/${projects[i]}/index.html'>${projects[i]}</a>
            </div>
        </li>`).css({
            'gridTemplateColumns': '1fr 1fr 1fr'
        });
    }
    $('.projTiles').on('click', function(){
        console.log($(this).attr('id'))
    });
    //design page content
});


