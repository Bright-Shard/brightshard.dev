let nerdText;
let settingsShown = false;
let year = 2022;

function toggleSettings(){
    settingsShown = !settingsShown;
        if(settingsShown){
            $('#content').animate({opacity: .5}, 500);
            $('#footer').animate({opacity: .5}, 500);
            $('#settings').show(500)
        } else {
            $('#content').animate({opacity: 1}, 500);
            $('#footer').animate({opacity: 1}, 500);
            $('#settings').hide(500)
        }
}

function toggleNerdText(){
    $.cookie('nerdText', nerdText, {expires: new Date(year, 6, 30, 12,
                59, 0), domain: '.brightshard.dev', secure: true})
    if(nerdText){
        $('h1').each(function(){
           $(this).text('# ' + $(this).attr('nerdtext'));
        });
    } else {
        $('h1').each(function(){
           $(this).text($(this).attr('normaltext'));
        });
    }
}

function reloadCSS(colour) {
    $.cookie('colour', colour, {expires: new Date(year, 6, 30, 12,
                59, 0), domain: '.brightshard.dev', secure: true})
    $('h1').each(function () {
        $(this).css('color', colour);
    });
    $('a').each(function () {
        $(this).css('color', colour);
    });
    $('.btn').each(function () {
        $(this).css('color', '#262626');
        $(this).css('border-color', colour);
        $(this).css('background-color', colour);
    });
    $('.tab-text').each(function () {
        $(this).css('color', '#262626');
        $(this).css('border-color', colour);
        $(this).css('background-color', colour);
    });
    $('.outline').each(function () {
        $(this).css('border-color', colour);
    });
    $('#settingsCog').css({'color': 'transparent', 'text-shadow': '0 0 0 '+colour});
}

$(document).ready(function() {
    $('#settings').hide();
    if($.cookie('colour')){
        reloadCSS($.cookie('colour'))
    } else {
        $.cookie('colour', '#04AA6D', {expires: new Date(year, 6, 30, 12,
                59, 0), domain: '.brightshard.dev', secure: true});
    }
    if($.cookie('nerdText')){
        nerdText = ($.cookie('nerdText') === 'true');
    } else {
        nerdText = true;
        $.cookie('nerdText', true, {expires: new Date(year, 6, 30, 12,
                59, 0), domain: '.brightshard.dev', secure: true});
    }
    toggleNerdText();
    $('#content').click(function(){
       if(settingsShown){
           toggleSettings()
       }
    });
});