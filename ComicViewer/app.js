"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
window.onload = function () {
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
//# sourceMappingURL=app.js.map