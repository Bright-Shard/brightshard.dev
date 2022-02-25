let openMenu = 'None';
let date = new Date
let expireDate = new Date(date.getFullYear() + 1, 12, 31, 12, 59, 0)
let resizeTimer;
let projectsListHover = false;

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
        $('#navbar').css('grid-template-columns', '1fr 10px 80px');
    }
}

function reloadCSS(colour) {
    $.cookie('colour', colour, {expires: expireDate, domain: '.brightshard.dev', secure: true, path: '/'});
    $('.btn, .tab-text:not(#active), .gallery-text').css('background-color', colour);
    $('#active').css('background-color', '#151515');
    $('.code, a, .gallery-item, .updateColour, .icon, #active, #navbar-pages').css('color', colour);
    $('.btn').css('color', '#262626');
    $('.tab-text:not(#active)').css('color', '#151515');
    $('.btn, .tab-text, .outline, #navbar-pages, input').css('border-color', colour);
}

function toggleMenus() {
    if(openMenu != 'None') {
        $('#content').animate({opacity: '1'}, 500);
        $('#footer').animate({opacity: '1'}, 500);
        $('#titlebar').animate({opacity: '1'}, 500);
        $('#clickdetection').hide();
        if(openMenu === '#bigimg') {
            $('#bigimg').fadeToggle(500);
        } else if(openMenu === '#settings') {
            $('#cog').attr('class', 'fas fa-cog icon');
            $('#settings').slideToggle(500);
        } else if(openMenu == '#navbar-pages') {
            $('#hamburger').attr('class', 'fas fa-bars icon');
            $('#navbar-pages').slideToggle(500);
        } else if(openMenu == '#projects-dropdown') {
        	$('#projects-dropdown').slideUp(500);
		}
        openMenu = 'None';
    }
}

$(document).ready(function() {
    $('#settings').slideUp(1);
    $('#bigimg').fadeToggle(1);
    $('#clickdetection').hide();
    navBarCSS()
    if($.cookie('colour')){
        reloadCSS($.cookie('colour'))
    } else {
        $.cookie('colour', '#04AA6D', {expires: expireDate, domain: '.brightshard.dev', secure: true, path: '/'});
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
    $('#projects-dropdown').parent().on('mouseenter', function() {
        $('#projects-dropdown').slideDown(500);
        $('#content').animate({opacity: '.5'}, 500);
        $('#footer').animate({opacity: '.5'}, 500);
		setTimeout(function() {
			openMenu = '#projects-dropdown';
		}, 200);
		setTimeout(function() {
			if(projectsListHover == false) {
        		toggleMenus()
			}
			projectsListHover = false;
		}, 1500);
    });
	$('#projects-dropdown').on('mouseenter', function() {
		if(openMenu == '#projects-dropdown') {
			projectsListHover = true;
		}
	});
    $('#projects-dropdown').on('mouseleave', function() {
		if(openMenu == '#projects-dropdown') {
	        toggleMenus()
		}
    });
	$('a').prop('rel', 'noopener noreferrer')
	setTimeout(function() {
    	$('#projects-dropdown').slideUp(1);
   		$('#veil').hide(100);
	}, 300) // The veil covers the whole website until loading is finished to hide stuff glitching in/out of view, this makes it vanish once everything's loaded
});

$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        navBarCSS()
    },5);
});