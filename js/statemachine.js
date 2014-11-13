/// <reference path="js/libs/require.js" />

define(['jquery'], function($) {

    var StateMachine = function() {
        this.controllerObj = {};
    }

    StateMachine.fn = StateMachine.prototype;

    StateMachine.fn.bind = function() {
        if (!this.o) this.o = $({});
        this.o.bind.apply(this.o, arguments);
    };

    StateMachine.fn.trigger = function() {
        if (!this.o) this.o = $({});
        this.o.trigger.apply(this.o, arguments);
    };

    StateMachine.fn.add = function(controller) {        
        if(this.controllerObj[controller.name]) {
            return;
        }

        //var uid = Math.random().toString(16).substr(2, 8);
        this.bind("change", function(e, current) {
            controller == current ? controller.activate() : controller.deactivate();
        });

        controller.active = $.proxy(function() {
            this.trigger("change", controller);
        }, this);

        this.controllerObj[controller.name] = controller;
    };

    StateMachine.fn.deactiveAll = function() {
        for(var k in this.controllerObj) {
            this.controllerObj[k].deactivate();
        }
    };

    return StateMachine;

});