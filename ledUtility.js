module.exports = {
    /** 
	 * Generate our dashboard HTML code
	 * @param {object} config - The node's config instance
	 * @param {object} ledStyle - Style attribute of our LED span in in-line CSS format
	 */
    HTML: function(config, ledStyle) { 
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
			return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px, ` + color + ` 0 0px 16px, ` + color + ` 0 0px 16px;`;
		} else {
			// TODO: duplicate code because of execution scope, fix this shit :|
			return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px;`;
		}
	},

	initController: function($scope) {
		$scope.flag = true;         

		var update = (msg) => {
			if (!msg) {
				return;
			}

			var value = msg.payload === true;

			function ledStyleTemplate(color, glow) {
				if (glow) {
					return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px, ` + color + ` 0 0px 16px, ` + color + ` 0 0px 16px;`;
				} else {
					// TODO: duplicate code because of execution scope, fix this shit :|
					return `background-color: ` + color + `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` + color + ` 0 -1px 4px;`;
				}
			}

			var ptr = document.getElementById("led_" + $scope.$eval('$id'));
			$(ptr).attr('style', ledStyleTemplate(
				value ? 'green' : 'red',
				true
				)
			);
		};
		$scope.$watch('msg', update);
	}
};