/// <reference path="js/libs/require.js" />

define(["jquery", "loader", "statemachine"], function($, L, StateMachine) {

    var $t = $('<div class="mb-container"></div>');
    var moduleStrArr = [];
    var stateManager = new StateMachine();
    var enterSID;
    var leaveSID;

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

        $(document).on("mouseenter", ".J_mb_trigger", function() {
            var $this = $(this);

            enterSID = setTimeout(function() {
                hoverInHandler($this);
            }, 200);

        }).on("mouseleave", ".J_mb_trigger", function() {
            var $this = $(this);

            clearTimeout(enterSID);

            leaveSID = setTimeout(function() {
                hoverOutHandler($this);
            }, 200);
        });

        $(document).on("mouseenter", ".J_mb_magnet", function() {
            clearTimeout(leaveSID);
        }).on("mouseleave", ".J_mb_magnet", function() {
            var $this = $(this);
            var module = $(this).attr("data-module");
            var $trigger = $this.data("$trigger");
            hoverOutHandler($trigger);
        });
    }

    function hoverInHandler($trigger) {
        var moduleName = $trigger.data("module");
        var mid = $trigger.data("id");
        var hasLoaded = mid && stateManager.controllerObj[mid] != undefined;

        if (hasLoaded) {
            stateManager.controllerObj[mid].activate()
        } else {
            L.getHtml("/partial/{0}.html".format(moduleName), function(res) {
                var $moduleTemplate = $(res).appendTo($t);

                require(["{0}module".format(moduleName)], function(Module) {
                    var module = new Module();

                    module.$trigger = $trigger;
                    module.$view = $moduleTemplate;
                    stateManager.add(module);
                    $trigger.data("id", module.id);
                    module.$view.data("$trigger", $trigger);
                    module.setup();
                });
            });
        }
    }

    function hoverOutHandler($trigger) {
        var moduleName = $trigger.data("module");
        var mid = $trigger.data("id");
        var hasLoaded = mid && stateManager.controllerObj[mid] != undefined;

        if (hasLoaded) {
            stateManager.controllerObj[mid].deactivate()
        }
    }

    return {
        init: init
    };
});
