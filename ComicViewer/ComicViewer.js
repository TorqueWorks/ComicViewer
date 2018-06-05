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
    //Create the first cell (we'll always have at least one)
    createComicCells("1");
    //Do our initial call. This one is special because we use this to get the current comic number
    //which is then used to determine the rest of the comics to load
    $.getJSON(xkcdAPI)
        .done(function (data) {
            //Set the first comic img here - no reason to duplicate the call below
            setComicData(data, 1);
            //Fetch the rest of the comics after creating the cell to hold that comic.
            var i = 1;
            while (++i <= n) {
                createComicCells(i);
                getAndSetComicData(parseInt(data.num) - (i - 1), i);
            }
            
        });
    
}

/**
 * Gets the comic metadata for the id specified and sets the elements with the appropriate data (img src, text, etc)
 * @param {any} id The ID of the comic itself (i.e. 1000)
 * @param {any} targetIndex The target index to use for selecting the elements
 */
function getAndSetComicData(index, targetId) {
    $.getJSON(xkcdAPI + "/" + id)
        .done(function (data) {
            setComicData(data, targetIndex);
        });
}

/**
 * Creates the cells for holding the comic data (img, alt-text, etc)
 * @param {any} index The index to use for this set of cells
 */
function createComicCells(index) {
    $("#comics").append("<td><img id='comic" + index + "' /></td>");
    $("#alt-text").append("<td id='alttext" + index + "' />");
}

function setComicData(data, id) {
    $("#comic" + id).attr("src", data.img);
    $("#alttext" + id).text(data.alt);
}