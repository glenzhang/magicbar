/// <reference path="js/libs/require.js" />

define(["jquery", "loader", "statemachine"], function($, L, StateMachine) {

    var $t = $('<div class="mb-container"></div>');
    var moduleStrArr = [];
    var stateManager = new StateMachine();

    function init(modules) {

        modules = modules || [];

        $t.appendTo("body");

        for (var i = modules.length - 1; i >= 0; --i) {
            moduleStrArr.push("<a href='javascript:void(0);' class='mb-")
            moduleStrArr.push(modules[i]);
            moduleStrArr.push("-trigger");
            moduleStrArr.push(" J_mb_trigger' data-module='");
            moduleStrArr.push(modules[i]);
            moduleStrArr.push("'>");
            moduleStrArr.push(modules[i]);
            moduleStrArr.push("</a>");
        }

        $t.append(moduleStrArr.join(''));

        setTimeout(function() {
            $t.css({
                right: 0
            });
        }, 25);

        $(document).on("click", ".J_mb_trigger", function(ev) {
            ev.preventDefault();
            var $this = $(this);

            if (stateManager.controllerObj[$this.data("id")]) {
                stateManager.controllerObj[$this.data("id")].activate()
            } else {
                L.getHtml("/partial/login.html", function(res) {
                    var $moduleTemplate = $(res).appendTo($t);

                    require([$this.data("module")], function(Module) {
                        var module = new Module();

                        module.$trigger = $this;
                        module.$view = $(".mb-login-magnet:eq(0)");

                        stateManager.add(module);

                        $this.data("id", module.id);
                        module.active();
                    });
                });
            }
        });
    }

    return {
        init: init
    };
});
