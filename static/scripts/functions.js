let openMenu = 'None';
var year = 2022;
let resizeTimer;
let projectsListOpen = false;

function navBarCSS(){
    if ($(window).width() <= 800) { // Show the hamburger menu on small screens
        $('#navbar-pages').slideUp(1)
        $('#navbar-pages').attr('class', 'navbar-pages-mobile');
        $('#hamburger').show();
        $("#navbar-pages").detach().appendTo("body");
        $('#navbar').css('grid-template-columns', '1fr');
    } else { // Hide the hamburger menu on large screens
        $('#navbar-pages').attr('class', 'navbar-pages-desktop');
        $('#navbar-pages').slideDown(1)
        $('#hamburger').hide();
        $("#navbar-pages").detach().appendTo("#navbar");
        $('#navbar').css('grid-template-columns', '1fr 40px');
    }
}

function reloadCSS(colour) {
    $.cookie('colour', colour, {expires: new Date(year, 6, 30, 12,
                59, 0), domain: '.brightshard.dev', secure: true})
    $('.code, a, .gallery-item, .updateColour, .icon').css('color', colour)
    $('.btn').css({'color': '#262626', 'border-color': colour, 'background-color': colour});
    $('.tab-text:not(#active)').css({'color': '#151515', 'border-color': colour, 'background-color': colour})
    $('.outline').css('border-color', colour);
    $('#active').css({'color': colour, 'border-color': colour, 'background-color': '#151515'})
    $('#navbar-pages').css({'color': colour, 'border-color': colour})
    $('.gallery-text').css({'background-color': colour});
}

function toggleMenus() {
    if(openMenu != 'None') {
        $('#content').animate({opacity: '1'}, 500);
        $('#footer').animate({opacity: '1'}, 500);
        $('#titlebar').animate({opacity: '1'});
        $('#clickdetection').hide();
        if(openMenu === '#bigimg') {
            $('#bigimg').fadeToggle(500);
        } else if(openMenu === '#settings') {
            $('#cog').attr('class', 'fas fa-cog icon');
            $('#settings').slideToggle(500);
        } else {
            $('#hamburger').attr('class', 'fas fa-bars icon');
            $('#navbar-pages').slideToggle(500);
        }
        openMenu = 'None';
    }
}

$(document).ready(function() {
    $('#settings').slideUp(1);
    $('#projects-dropdown').slideUp(1);
    $('#bigimg').fadeToggle(1);
    $('#clickdetection').hide();
    navBarCSS()
    if($.cookie('colour')){
        reloadCSS($.cookie('colour'))
    } else {
        $.cookie('colour', '#04AA6D', {expires: new Date(year, 6, 30, 12,
                59, 0), domain: '.brightshard.dev', secure: true});
    }
    $('img').click(function() {
        if($(this).attr('nozoom') != 'true'){
            toggleMenus()
            $('#bigimg').attr({'src': $(this).attr('src'), 'width': $(this).width()*2, 'height': $(this).height()*2});
            $('#content').animate({opacity: '.5'}, 500);
            $('#footer').animate({opacity: '.5'}, 500);
            $('#titlebar').animate({opacity: '.5'}, 500);
            $('#clickdetection').show();
            $('#bigimg').fadeToggle(500);
            openMenu = '#bigimg';
        }
    });
    $('#clickdetection').click(function() {
        toggleMenus()
    });
    $('#cog').click(function() {
        if(openMenu === '#settings'){
            toggleMenus()
        } else {
            toggleMenus()
            $('#content').animate({opacity: '.5'}, 500);
            $('#footer').animate({opacity: '.5'}, 500);
            $('#clickdetection').show();
            $('#settings').slideToggle(500);
            $('#cog').attr('class', 'fas fa-cog icon fa-rotate-90');
            openMenu = '#settings';
        }
    });
    $('#hamburger').click(function() {
        if (openMenu === '#navbar-pages') {
            toggleMenus()
        } else {
            toggleMenus()
            $('#content').animate({opacity: '.5'}, 500);
            $('#footer').animate({opacity: '.5'}, 500);
            $('#clickdetection').show();
            $('#navbar-pages').slideToggle(500);
            $('#hamburger').attr('class', 'fas fa-bars icon fa-rotate-90');
            openMenu = '#navbar-pages';
        }
    });
    $('#projects-dropdown').parent().hover(function() {
        if (!projectsListOpen) {
            $('#projects-dropdown').slideDown(500);
            $('#clickdetection').show()
            projectsListOpen = true;
        }
    });
    $('#clickdetection').hover(function() {
        if (projectsListOpen) {
            $('#projects-dropdown').slideUp(500);
            $('#clickdetection').hide()
            projectsListOpen = false;
        }
    })
    $('#veil').hide(); // The veil covers the whole website until loading is finished to hide stuff glitching in/out of view, this makes it vanish once everything's loaded
});

$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        navBarCSS()
    },5);
});