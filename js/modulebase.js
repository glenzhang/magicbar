/// <reference path="js/libs/require.js" />

define(["jquery"], function($) {
    var ModuleBase = function() {
        this.$view = "";
        this.$trigger = "";
        this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    };

    ModuleBase.fn = ModuleBase.prototype;

    ModuleBase.fn.adjustPosition = function(offset) {
        offset = offset || 0;

        this.$view.css("top", this.$trigger.offset().top - $(window).scrollTop() - offset + "px");
        this.$view.css("right", "70px");

        this.$view.animate({right: "35px", opacity:1}, 300);
    };

    return ModuleBase;
});