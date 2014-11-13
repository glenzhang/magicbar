/// <reference path="js/libs/require.js" />
require.config({
    baseUrl: "js",
    paths: {
        jquery: 'libs/jquery'
    }
});

require(["magicbar", "loader"], function(magicbar, L) {
    L.getHtml("/partial/container.html", function(res) {
        magicbar.init($(res).appendTo("body"));
    });
});