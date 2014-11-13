/// <reference path="js/libs/require.js" />

define(["jquery", "modulebase"], function($, ModuleBase) {

    var Message = function() {
        ModuleBase.call(this);
    };

    Message.prototype = new ModuleBase();

    Message.prototype.constructor = Message;    

    Message.fn = Message.prototype;

    Message.fn.setup = function() {

        
    };

    return Message;
});