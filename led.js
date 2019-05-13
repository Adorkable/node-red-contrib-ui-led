module.exports = function(RED) {
	'use strict';
	var ledUtility = require('./ledUtility');

	var ui = undefined; 

    function LEDNode(config) {
        try {
			if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }

            RED.nodes.createNode(this, config);                       

			var node = this;
			 
			this.colorForValue = config.colorForValue.map(function(colorForValue) {
				return {
					color: colorForValue.color,
					value: RED.util.evaluateNodeProperty(colorForValue.value, colorForValue.valueType, node)
				}
			});

			this.toString = function() {
				var result = "LED";
				if (config.name) {
					result += " name: " + config.label;
				}
				if (config.label) {
					result += " label: " + config.label;
				}
				// console.log("This", this, "\nConfig", config);
				return result;
			};

			if (ledUtility.checkConfig(config, node)) {
	            var done = ui.addWidget({                   
					node: node,    
					width: config.width || config.group.width || undefined,
					height: config.height || 1,
	                format: ledUtility.HTML(config, ledUtility.ledStyle('gray', false)), 
	                group: config.group,  
	                templateScope: "local",
	                order: config.order,
	                beforeEmit: ledUtility.beforeEmit(node, RED),
	                initController: ledUtility.initController
				});

				node.on("close", done);
			}		
        } catch(error) {
            console.log("While constructing LEDNode widget:", error);		
		}
    }

    RED.nodes.registerType("ui_led", LEDNode);
}
