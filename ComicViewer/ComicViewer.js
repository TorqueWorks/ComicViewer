var xkcdAPI = "https://xkcd.now.sh";

window.onload = () => {
    /**
    CORS enabled version of the XKCD api
    https://github.com/mrmartineau/xkcd-api
    Latest Comic : https://xkcd.now.sh
    Comic #1000 : https://xkcd.now.sh/1000
    Example response : 
        {
              "month": "9",
              "num": 1892,
              "link": "",
              "year": "2017",
              "news": "",
              "safe_title": "USB Cables",
              "transcript": "",
              "alt": "Tag yourself, I'm \"frayed.\"",
              "img": "https://imgs.xkcd.com/comics/usb_cables.png",
              "title": "USB Cables",
              "day": "20"
        }
    */
    var xkcdAPI = "https://xkcd.now.sh";
    getLastNComics(3);
};

/**
 * Gets the last N comics, starting with the current one.
 * @param {any} n The number of comics to display (will always display at least 1)
 */
function getLastNComics(n) {
    //Do our initial call. This one is special because we use this to get the current comic number
    //which is then used to determine the rest of the comics to load
    $.getJSON(xkcdAPI)
        .done(function (data) {
            //Set the first comic img here - no reason to duplicate the call below
            createComicSlide(data);
            //Fetch the rest of the comics after creating the cell to hold that comic.
            var i = 1;
            while (++i <= n) {
                getAndCreateComicSlide(parseInt(data.num) - (i - 1));
            }
            
        });
    
}

/**
 * Gets the comic metadata for the id specified and sets the elements with the appropriate data (img src, text, etc)
 * @param {any} id The ID of the comic itself (i.e. 1000)
 */
function getAndCreateComicSlide(id) {
    $.getJSON(xkcdAPI + "/" + id)
        .done(function (data) {
            createComicSlide(data);
        });
}

function createComicSlide(data) {
    var carousel = document.getElementById("comic-carousel");

    //Overall item div
    var itemDiv = document.createElement("div");
    itemDiv.className = "item" + (carousel.childElementCount === 0 ? " active" : "");

    //Date header
    var date = document.createElement("h2");
    date.className = "date";
    date.innerText = data.month + "/" + data.day + "/" + data.year;

    var title = document.createElement("h2");
    title.className = "title";
    title.innerText = data.title;

    //Comic image
    var img = document.createElement("img");
    img.className = "comic";
    img.src = data.img;

    //alt-text footer
    var caption = document.createElement("p");
    caption.className = "alttext";
    caption.innerText = data.alt;

    itemDiv.appendChild(title);
    itemDiv.appendChild(date);
    itemDiv.appendChild(img);
    itemDiv.appendChild(caption);
    document.getElementById("comic-carousel").appendChild(itemDiv);
}