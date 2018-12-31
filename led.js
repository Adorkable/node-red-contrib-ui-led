module.exports = function(RED) {
	var settings = RED.settings;

    function HTML(config, ledStyle) { 
        return String.raw`
        	<style>
				div.led {
				    display: flex;
				    flex-direction: row;

				    justify-content: space-between;
			        align-items: center;

			        height: 100%;
				}
				span.led {
				    width: 24px;
				    height: 24px;
				    border-radius: 50%;
				    margin: 8px;
				}
			</style>
			<div class="led">
				<span class="name">` + config.label + `</span>
			    <span class="led" id="led_{{$id}}" style="` + ledStyle + `">   
			    </span>
			</div>`;
    };

    var ui = undefined; 
    function LEDNode(config) {
        try {
            var node = this;
            if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }
            RED.nodes.createNode(this, config);                       

            var beforeEmit = function(msg, value) {
                return { msg: msg };
            };

            var initController = ($scope) => {
            	$scope.flag = true;         

            	var update = (msg) => {
	            	if (!msg) {
	            		return;
	            	}

	            	var value = msg.payload === true;

					var ledStyleTemplate = (color) => {
						return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px, ` + color + ` 0 0px 16px, ` + color + ` 0 0px 16px;`
					};

					var ptr = document.getElementById("led_" + $scope.$eval('$id'));
					$(ptr).attr('style', ledStyleTemplate(
						value ? 'green' : 'red'
						)
					);
	            };
                $scope.$watch('msg', update);
            };

			var ledStyleTemplate = (color) => {
				return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px;`
			};
            var done = ui.addWidget({                   
                node: node,    
                format: HTML(config, ledStyleTemplate('gray')), 
                group: config.group,  
                templateScope: "local",
                order: 0,
                emitOnlyNewValues: false,
                forwardInputMessages: false,
                storeFrontEndInputAsState: false,
                beforeEmit: beforeEmit,
                initController: initController
            });
        } catch(error) {
            console.log(error);		
		}
		
        node.on("close", done);
    }

    RED.nodes.registerType("led", LEDNode);
}