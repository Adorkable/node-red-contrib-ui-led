function ledStyle(color, glow) {
	if (glow) {
		return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px, ` + color + ` 0 0px 16px, ` + color + ` 0 0px 16px;`;
	} else {
		return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px;`;
	}
}

module.exports = function(RED) {
	'use strict';
	var ledUtility = require('./ledUtility');

	/**
	 * LED Node construction function
	 * @param {object} config Node configuration object
	 */
    function LEDNode(config) {
        try {
			var ui = undefined; 
			if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }

            RED.nodes.createNode(this, config);                       

			var node = this;

			this.colors = config.colors;

            var beforeEmit = function(msg, value) {
				var updatedMessage = msg;
				updatedMessage.colors = node.colors;
                return { msg: updatedMessage };
			};

			if (ledUtility.checkConfig(config, node)) {
	            var done = ui.addWidget({                   
	                node: node,    
	                format: ledUtility.HTML(config, ledUtility.ledStyle('gray', false)), 
	                group: config.group,  
	                templateScope: "local",
	                order: 0,
	                beforeEmit: beforeEmit,
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
