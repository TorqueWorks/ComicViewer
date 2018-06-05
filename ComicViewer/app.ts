import * as $ from "jquery";

window.onload = () => {
    var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON(flickerAPI, {
        tags: "mount rainier",
        tagmode: "any",
        format: "json",
        crossDomain: true
    })
        .done(function (data) {

        });
};