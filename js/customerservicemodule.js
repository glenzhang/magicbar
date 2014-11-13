/// <reference path="js/libs/require.js" />

define(["jquery", "modulebase"], function($, ModuleBase) {

    var CustomerService = function() {
        ModuleBase.call(this);
    };

    CustomerService.prototype = new ModuleBase();

    CustomerService.prototype.constructor = CustomerService;    

    CustomerService.fn = CustomerService.prototype;

    CustomerService.fn.setup = function() {
        this.active();
    };

    return CustomerService;
});