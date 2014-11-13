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
        this.name = "";
    };

    ModuleBase.fn = ModuleBase.prototype;

    ModuleBase.fn.activate = function() {
        this.showing = true;

        this.$view.css({
                "top": this.$trigger.offset().top - $(window).scrollTop() + "px",
                "right": "70px"
            })
            .show();

        this.$view.animate({
            right: "35px",
            opacity: 1
        }, 100);
    };

    ModuleBase.fn.deactivate = function() {
        this.showing = false;
        this.$view.animate({
            right: "70px",
            opacity: 0
        }, 100, $.proxy(function() {
            this.$view.hide();
        }, this));
    };

    ModuleBase.fn.toggle = function() {
        this.showing ? this.deactivate() : this.active();
    };

    return ModuleBase;
});
