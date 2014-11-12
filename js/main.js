/// <reference path="js/libs/require.js" />
require.config({
    baseUrl: "js",
    paths: {
        jquery: 'libs/jquery'
    }
});

require(["magicbar", "config"], function(magicbar, config) {
    magicbar.init(config);
});