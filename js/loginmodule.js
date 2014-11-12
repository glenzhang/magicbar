/// <reference path="js/libs/require.js" />

define(["jquery", "modulebase"], function($, ModuleBase) {

    var Login = function() {
        ModuleBase.call(this);
    };

    Login.prototype = new ModuleBase();

    Login.prototype.constructor = Login;    

    Login.fn = Login.prototype;

    Login.fn.activate = function() {
        this.showing = true;
        this.$view.show();
        this.adjustPosition();
    };  

    Login.fn.deactivate = function() {
        this.showing = false;
        this.$view.hidden();
    };

    return Login;
});