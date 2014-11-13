/// <reference path="js/libs/require.js" />

define(["jquery", "loader", "statemachine"], function($, L, StateMachine) {

    var $t = $('<div class="mb-container J_mb_container"></div>');
    var moduleSB = new StringBuilder();
    var stateManager = new StateMachine();
    var enterSID;
    var leaveSID;
    var activateMID;

    function init(modules) {
        modules = modules || [];

        $t.appendTo("body");

        for (var i = modules.length - 1; i >= 0; --i) {
            moduleSB.append("<a href='javascript:void(0);' class='mb-{0}-trigger J_mb_trigger' ".format(modules[i]))
                .append("data-module='{0}'>{0}</a>".format(modules[i]));
        }

        $t.append(moduleSB.toString());

        setTimeout(function() {
            $t.css({
                right: 0
            });
        }, 25);

        $(document).on("click", ".J_mb_trigger", function(ev) {
            ev.preventDefault();
            var $trigger = $(this);
            var moduleName = $trigger.data("module");
            var mid = $trigger.data("id");
            var currentController = mid && stateManager.controllerObj[mid];
            var hasLoaded = currentController != undefined;
/*
            if(activateMID && activateMID != mid) {
                stateManager.controllerObj[activateMID].deactivate();
            }
*/
            if (hasLoaded) {
                if (currentController.showing) {
                    currentController.deactivate();
                } else {
                    currentController.active();
                    activateMID = mid;
                }
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
                        activateMID = module.id;
                        module.setup();
                    });
                });
            }
        }).on("click", function(ev) {
            var $this = $(ev.target);
            if ($this.parents(".J_mb_container").length == 0) {
                stateManager.deactiveAll();
            }
        });
    }

    return {
        init: init
    };
});
