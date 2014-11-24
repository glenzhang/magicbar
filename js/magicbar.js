/// <reference path="js/libs/require.js" />
define(["jquery", "loader", "statemachine"], function($, L, StateMachine) {
    var isIe6 = !-[1, ] && !window.XMLHttpRequest;
    var $window = $(window);

    function init($container) {
        var moduleSB = new StringBuilder();
        var stateManager = new StateMachine();
        
        setTimeout(function() {
            $container.css({
                right: 0
            });
        }, 25);

        $(document).on("click", ".J_mb_trigger", function(ev) {
            ev.preventDefault();
            var $trigger = $(this);
            var moduleName = $trigger.data("module");
            var currentController = stateManager.controllerObj[moduleName];
            var hasLoaded = currentController != undefined;

            if (hasLoaded) {
                if (currentController.$trigger[0] == $trigger[0]) {
                    currentController.toggle();
                } else {
                    currentController.$trigger = $trigger;
                    currentController.active();
                }

            } else {
                L.getHtml("/partial/{0}.html".format(moduleName), function(res) {
                    var $moduleTemplate = $(res).appendTo($container);

                    require(["{0}module".format(moduleName)], function(Module) {
                        var module = new Module();

                        module.$trigger = $trigger;
                        module.$view = $moduleTemplate;
                        module.name = moduleName;
                        stateManager.add(module);
                        $trigger.data("name", module.name);
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

        $window.on("resize.MB", function() {
            stateManager.deactiveAll();
        });
        
        if(isIe6) {
            $window.on("scroll.MB", function() {
                $container.css({'top': $window.scrollTop()});
            });
        }
    }

    return {
        init: init
    };
});
