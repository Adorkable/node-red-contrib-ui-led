module.exports = {
    /** 
	 * Generate our dashboard HTML code
	 * @param {object} config - The node's config instance
	 * @param {object} ledStyle - Style attribute of our LED span in in-line CSS format
	 */
    HTML: function(config, ledStyle) { 
		// text-align: ` + config.labelAlignment + `
		const name = () => {
			return `<span class=\"name\">` + config.label + `</span>`;
		};
		const optionalName = (display) => {
			if (display) {
				return name();
			}
			return '';
		}

		return String.raw`
        	<style>
				div.led_{{$id}} {
				    display: flex;
				    flex-direction: row;

				    justify-content: space-between;
			        align-items: center;

			        height: 100%;
				}
				div.led_{{$id}} > span.led {
				    width: 24px;
				    height: 24px;
				    border-radius: 50%;
				    margin: 6px;
				}
				div.led_{{$id}} > span.name {
					flex-grow: 1;
					text-align: ` + config.labelAlignment + `;
				}
			</style>
			<div class="led_{{$id}}">
				` + optionalName(config.labelPlacement !== 'right') + `
				<span class="led" id="led_{{$id}}" style="` + ledStyle + `"></span>
				` + optionalName(config.labelPlacement === 'right') + `
			</div>`;
	},
	
	/** 
	 * Check for that we have a config instance and that our config instance has a group selected, otherwise report an error
	 * @param {object} config - The config instance
	 * @param {object} node - The node to report the error on
	 * @returns {boolean} `false` if we encounter an error, otherwise `true`
	 */
	checkConfig: function(config, node) {
        if (!config) {
			// TODO: have to think further if it makes sense to separate these out, it isn't clear what the user can do if they encounter this besides use the explicit error to more clearly debug the code
            node.error(RED._("ui_led.error.no-config"));
            return false;
        }
        if (!config.hasOwnProperty("group")) {
            node.error(RED._("ui_led.error.no-group"));
            return false;
        }
        return true;
	},

	ledStyle: function(color, glow) {
		if (glow) {
			return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px, ` + color + ` 0 0px 12px, ` + color + ` 0 0px 12px;`;
		} else {
			// TODO: duplicate code because of execution scope, fix this shit :|
			return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px;`;
		}
	},

	beforeEmit: function(node, RED) {

		return function(msg, value) {

			var updatedMessage = msg;
			const colorForValue =  node.colorForValue;

			var color, found = false;

			if (Array.isArray(colorForValue)) {
				for (var index = 0; index < colorForValue.length; index ++) {
					const compareWith = colorForValue[index];

					if (RED.util.compareObjects(compareWith.value, value)) {
						color = compareWith.color;
						found = true;
						break
					}
				}
			} 
			if (found === false) {
				color = 'gray';
			}

			return { 
				msg: {
					color: color,
					glow: found
				}
			};
		}
	},

	initController: function($scope) {
		$scope.flag = true;         

		var update = (msg) => {
			if (!msg) {
				return;
			}

			function ledStyleTemplate(color, glow) {
				if (glow) {
					return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px, ` + color + ` 0 0px 12px, ` + color + ` 0 0px 12px;`;
				} else {
					// TODO: duplicate code because of execution scope, fix this shit :|
					return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px;`;
				}
			}

			var ptr = document.getElementById("led_" + $scope.$eval('$id'));
			
			const color = msg.color;
			const glow = msg.glow;

			$(ptr).attr('style', ledStyleTemplate(color, glow));
		};
		$scope.$watch('msg', update);
	}
};