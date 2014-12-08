/// <reference path="js/libs/require.js" />
define(["jquery", "loader", "statemachine"], function($, L, StateMachine) {
    var isIe6 = !-[1, ] && !window.XMLHttpRequest;
    var $window = $(window);
    var $document = $(document);
    var triggerSelector = ".J_mb_trigger";
    var tipsSelector = ".J_mb_tips";
    var mouseenterSID;

    var stateManager = new StateMachine();

    function init($container) {
        setTimeout(function() {
            $container.css({
                right: 0
            });
        }, 25);

        $(triggerSelector, $container).on("mouseenter", mouseenterHandler)
            .on("mouseleave", mouseleaveHandler)
            .on("click", function(ev) {
                ev.preventDefault();

                var $trigger = $(this);
                var moduleName = $trigger.data("module");
                var currentController = stateManager.controllerObj[moduleName];
                var hasLoaded = currentController != undefined;

                clearTimeout(mouseenterSID);

                $trigger.find(tipsSelector).hide().css({
                    right: "50px",
                    opacity: 0
                });

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

                            module.unusetriggertop = $trigger.data("uutt"); 
                            module.$trigger = $trigger;
                            module.$view = $moduleTemplate;
                            module.name = moduleName;
                            stateManager.add(module);
                            
                            module.setup();
                        });
                    });
                }
            });

        $document.on("click", function(ev) {
            var $this = $(ev.target);
            if ($this.parents(".J_mb_container").length == 0) {
                stateManager.deactiveAll();
            }
        });

        $window.on("resize.MB", function() {
            stateManager.deactiveAll();
        });

        if (isIe6) {
            $window.on("scroll.MB", function() {
                $container.css({
                    'top': $window.scrollTop()
                });
            });
        }
    }

    function mouseenterHandler() {
        var $this = $(this);
        var moduleName = $this.data("module");
        var currentController = stateManager.controllerObj[moduleName];

        if (currentController &&
            currentController.showing &&
            currentController.$trigger[0] == this) {
            return;
        }

        mouseenterSID = setTimeout(function() {
            $this.find(tipsSelector).show().animate({
                right: "33px",
                opacity: 1
            }, 150);
        }, 250);
    }

    function mouseleaveHandler() {
        clearTimeout(mouseenterSID);

        $(this).find(tipsSelector).animate({
            right: "50px",
            opacity: 0
        }, 150, function() {
            $(this).hide();
        });
    }

    return {
        init: init
    };
});
