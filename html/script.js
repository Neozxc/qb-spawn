$(document).ready(function() {

    $(".container").hide();
    $("#submit-spawn").hide()

    window.addEventListener('message', function(event) {
        var data = event.data;
        if (data.type === "ui") {
            if (data.status == true) {
                $(".container").fadeIn(250);
            } else {
                $(".container").fadeOut(250);
            }
        }

        if (data.action == "setupLocations") {
            setupLocations(data.locations, data.houses)
        }

        if (data.action == "setupAppartements") {
            setupApps(data.locations)
        }
    })
})

var currentLocation = null

$(document).on('click', '.location', function(evt){
    evt.preventDefault(); //dont do default anchor stuff
    var location = $(this).data('location'); //get the text
    var type = $(this).data('type'); //get the text
    var label = $(this).data('label'); //get the text
    if (type !== "lab") {
        $("#spawn-label").html("Confirm")
        $("#submit-spawn").attr("data-location", location);
        $("#submit-spawn").attr("data-type", type);
        $("#submit-spawn").fadeIn(100)
        // $.post('https://qb-spawn/setCam', JSON.stringify({
        //     posname: location,
        //     type: type,
        // }));
        if (currentLocation !== null) {
            $(currentLocation).removeClass('selected');
        }
        $(this).addClass('selected');
        currentLocation = this
    }
});

$(document).on('click', '#submit-spawn', function(evt){
    evt.preventDefault(); //dont do default anchor stuff
    var location = $(this).data('location');
    var spawnType = $(this).data('type');
    $(".container").addClass("hideContainer").fadeOut("9000");
    setTimeout(function(){
        $(".hideContainer").removeClass("hideContainer");
    }, 900);
    if (spawnType !== "appartment") {
        $.post('https://qb-spawn/spawnplayer', JSON.stringify({
            spawnloc: location,
            typeLoc: spawnType
        }));
    } else {
        $.post('https://qb-spawn/chooseAppa', JSON.stringify({
            appType: location,
        }));
    }
});

function setupLocations(locations, myHouses) {
    var parent = $('.spawn-locations')
    $(parent).html("");

    $(parent).append('<div class="loclabel" id="location" data-location="null" data-type="lab" data-label="Where would you like to start?"><p><span id="null">Where would you like to start?</span></p></div>')
    
    // Map
    $(parent).append('<div class="themap"><img style="padding-bottom: 2%;"src="https://cdn.discordapp.com/attachments/897994953907666954/944740252453585006/mapgtav.png" alt=""></div>');
    
    setTimeout(function(){
        $(parent).append('<div class="location" id="location" data-location="current" data-type="current" data-label="Last Location"><p class="thebottext"><span style="font-size: 15px;" id="current-location">From last location</span></p></div>');
        
        // Change data-location="" values to your config.lua [location] values
        // Locations <div></div>
        $(parent).prepend(`<div style="position: relative; top: "25%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 27%; margin-left: 15%; transform: rotate(320deg);" class="location" id="location" data-location="motel" data-type="normal" src="https://cdn-icons-png.flaticon.com/512/889/889668.png"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "35%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 29%; margin-left: 16%; transform: rotate(321deg);" class="location" id="location" data-location="paleto" data-type="normal" src="https://cdn-icons-png.flaticon.com/512/889/889668.png"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "45%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 31%; margin-left: 18%; transform: rotate(325deg);" class="location" id="location" data-location="policedp" data-type="normal" src="https://cdn-icons-png.flaticon.com/512/889/889668.png"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "55%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 18.5%; margin-left: 29%; transform: rotate(320deg);" class="location" id="location" data-location="grapeseed" data-type="normal" src="https://cdn-icons-png.flaticon.com/512/889/889668.png"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "65%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 20%; margin-left: 35.6%; transform: rotate(320deg);" class="location" id="location" data-location="legion" data-type="normal" src="https://cdn-icons-png.flaticon.com/512/889/889668.png"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "75%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 22%; margin-left: 42.5%; transform: rotate(320deg);" class="location" id="location" data-location="grandsenora" data-type="normal" src="https://cdn-icons-png.flaticon.com/512/889/889668.png"></div>`);

        // Old
        // $.each(locations, function(index, location){
        //     $(parent).append('<div class="location" id="location" data-location="'+location.location+'" data-type="normal" data-label="'+location.label+'"><p><span id="'+location.location+'">'+location.label+'</span></p></div>')
        // });

        if (myHouses != undefined) {
            $.each(myHouses, function(index, house){
                $(parent).append('<div class="location" id="location" data-location="'+house.house+'" data-type="house" data-label="'+house.label+'"><p class="thehousetext"><span id="'+house.house+'">In my house: at: '+house.label+'</span></p></div>')
            });
        }

        $(parent).append('<div style="margin: auto;" class="submit-spawn" id="submit-spawn"><p><span id="spawn-label"></span></p></div>');
        $('.submit-spawn').hide();
    }, 100)
}

function setupApps(apps) {
    var parent = $('.spawn-locations')
    $(parent).html("");
    
    $(parent).append('<div class="loclabel" id="location" data-location="null" data-type="lab" data-label="Choose a apartment"><p><span id="null">Choose where you wanna live</span></p></div>')
    
    // Map
    $(parent).append('<div class="themap"><img style="padding-bottom: 2%;"src="https://cdn.discordapp.com/attachments/897994953907666954/944740252453585006/mapgtav.png" alt=""></div>');
    
        // Locations
        $(parent).prepend(`<div style="position: relative; top: "35%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 29%; margin-left: 15%;" class="location" id="location" data-location="apartment1" data-type="appartment" src="https://cdn-icons.flaticon.com/png/512/3307/premium/3307713.png?token=exp=1645346058~hmac=077c862650ce45ae9b234529a5c76803"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "65%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 23%; margin-left: 42%;" class="location" id="location" data-location="apartment2" data-type="appartment" src="https://cdn-icons.flaticon.com/png/512/3307/premium/3307713.png?token=exp=1645346058~hmac=077c862650ce45ae9b234529a5c76803"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "75%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 19%; margin-left: 36%;" class="location" id="location" data-location="apartment3" data-type="appartment" src="https://cdn-icons.flaticon.com/png/512/3307/premium/3307713.png?token=exp=1645346058~hmac=077c862650ce45ae9b234529a5c76803"></div>`);
        $(parent).prepend(`<div style="position: relative; top: "55%";"><img style="position: absolute; width: 2%; height: auto; margin-top: 19%; margin-left: 29%;" class="location" id="location" data-location="apartment4" data-type="appartment" src="https://cdn-icons.flaticon.com/png/512/3307/premium/3307713.png?token=exp=1645346058~hmac=077c862650ce45ae9b234529a5c76803"></div>`);

    // Old
    // $.each(apps, function(index, app){
    //     $(parent).append('<div style="margin: auto;" class="location" id="location" data-location="'+app.name+'" data-type="appartment" data-label="'+app.label+'"><p><span id="'+app.name+'">'+app.label+'</span></p></div>')
    // });

    $(parent).append('<div style="margin: auto;" class="submit-spawn" id="submit-spawn"><p><span id="spawn-label"></span></p></div>');
    $('.submit-spawn').hide();
}