/// <reference path="js/libs/require.js" />

define(["jquery", "modulebase"], function($, ModuleBase) {

    var Login = function() {
        ModuleBase.call(this);
    };

    Login.prototype = new ModuleBase();

    Login.prototype.constructor = Login;    

    Login.fn = Login.prototype;

    /*
    Login.fn.activate = function() {
        this.showing = true;
        this.$view.show();
        this.adjustPosition();
    };  

    Login.fn.deactivate = function() {
        this.showing = false;
        console.log(this.$view);
        this.$view.hide();
    };

    Login.fn.toggle = function() {
        if(this.showing) {
            this.deactivate();
        }else{
            this.activate();
        }
    };
    */

    Login.fn.setup = function() {
        this.activate();
    };

    return Login;
});