/// <reference path="js/libs/require.js" />

define(["jquery"], function ($) {

    function getHtml(url, callback) {
        if (!url) {
            return;
        }

        callback = callback || $.noop;

        $.ajax({ url: url, cache: true, dataType: "html" }).done(callback);

        return this;
    }

    function getScript(url, callback) {

        if (!url) {
            return;
        }

        callback = callback || $.noop;

        $.ajax({ url: url, cache: true, dataType: "script" }).done(callback);

        return this;
    }

    function getJsonp(url, callback) {

        if (!url) {
            return;
        }

        callback = callback || $.noop;

        $.ajax({ url: url, cache: true, dataType: "jsonp" }).done(callback);

        return this;
    }

    return {
        getHtml: getHtml,
        getScript: getScript,
        getJsonp: getJsonp
    };
});