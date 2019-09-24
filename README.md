## Node-RED UI LED
A simple LED status indicator for the Node-RED Dashboard

[![dependencies](https://img.shields.io/david/adorkable/node-red-contrib-ui-led.svg?style=flat-square)](https://github.com/Adorkable/node-red-contrib-ui-led/network/dependencies)
[![dev-dependencies](https://img.shields.io/david/dev/adorkable/node-red-contrib-ui-led.svg?style=flat-square)](https://github.com/Adorkable/node-red-contrib-ui-led/network/dependencies)
[![optional-dependencies](https://img.shields.io/david/optional/adorkable/node-red-contrib-ui-led.svg?style=flat-square)](https://github.com/Adorkable/node-red-contrib-ui-led/network/dependencies)
[![peer-dependencies](https://img.shields.io/david/peer/adorkable/node-red-contrib-ui-led.svg?style=flat-square)](https://github.com/Adorkable/node-red-contrib-ui-led/network/dependencies)

![Examples Image](images/examples.png)

The node uses `msg.payload`'s value to determine status. By default:

* `msg.payload` === `true` - **Green**
* `msg.payload` === `false` - **Red**
* no `msg` received yet or `msg.payload` !== `true` and `msg.payload` !== `false` - **Gray**

## Install
To install the node run the following from your Node-RED user directory (`~/.node-red`):
```bash
npm install node-red-contrib-ui-led
```

Or install the node from the Palette section of your Node-RED editor by searching by name (`node-red-contrib-ui-led`).

## Custom Statuses

Although `true` => Green and `false` => Red is the default, one can map other payload values to any color.

To customize the mappings open the node's configuration panel and scroll to the _Colors for Values_ list.

![Colors for Values Image](images/colorsForValues.png)

To add a value mapping press the **+Color** button at the bottom of the list. 

Next fill in a color in a [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) format (color name, hex, rgb, rgba...), select the value type (`string`, `boolean`...) and fill in an appropriate value.

Similarly existing Value => Color maps can be modified.

Finally to delete a mapping simply press the X button on the far right!

## Custom Statuses in `msg`

By enabling _Allow Color For Value map in msg_ in a node that node will use dictionaries passed via `msg.colorForValue` to override any previous color to value mappings. 

The format should be `value` => `color`, ie an object whose key values return color values.

Example:

```js
msg.colorForValue = {};
msg.colorForValue[true] = "purple";
msg.colorForValue[false] = "orange";
```

## General Example Usage

This example sets up an MQTT broker and topic with two buttons to simulate a true and false status value. To see more examples please run the project in the example folder:

```json
[{"id":"d3b3123c.3700d","type":"tab","label":"Sensors","disabled":false,"info":""},{"id":"2fa28c61.b659f4","type":"tab","label":"Debug","disabled":false,"info":""},{"id":"e120d946.46fa68","type":"mqtt-broker","z":"","name":"Node-RED","broker":"localhost","port":"1883","clientid":"Node-RED","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","closeTopic":"","closeQos":"0","closePayload":"","willTopic":"","willQos":"0","willPayload":""},{"id":"5ee52ff4.c9bcd","type":"ui_tab","z":"","name":"Home","icon":"dashboard","disabled":false,"hidden":false},{"id":"e6d3e1d1.040fe","type":"ui_tab","z":"","name":"Debug","icon":"dashboard","disabled":false,"hidden":false},{"id":"d2a16e71.43f47","type":"ui_group","z":"","name":"Home","tab":"5ee52ff4.c9bcd","disp":true,"width":"6","collapse":false},{"id":"703bff68.9236e","type":"ui_base","theme":{"name":"theme-light","lightTheme":{"default":"#0094CE","baseColor":"#0094CE","baseFont":"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif","edited":true,"reset":false},"darkTheme":{"default":"#097479","baseColor":"#097479","baseFont":"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif","edited":false},"customTheme":{"name":"Untitled Theme 1","default":"#4B7930","baseColor":"#4B7930","baseFont":"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif"},"themeState":{"base-color":{"default":"#0094CE","value":"#0094CE","edited":false},"page-titlebar-backgroundColor":{"value":"#0094CE","edited":false},"page-backgroundColor":{"value":"#fafafa","edited":false},"page-sidebar-backgroundColor":{"value":"#ffffff","edited":false},"group-textColor":{"value":"#1bbfff","edited":false},"group-borderColor":{"value":"#ffffff","edited":false},"group-backgroundColor":{"value":"#ffffff","edited":false},"widget-textColor":{"value":"#111111","edited":false},"widget-backgroundColor":{"value":"#0094ce","edited":false},"widget-borderColor":{"value":"#ffffff","edited":false},"base-font":{"value":"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif"}},"angularTheme":{"primary":"indigo","accents":"blue","warn":"red","background":"grey"}},"site":{"name":"Node-RED Dashboard","hideToolbar":"false","allowSwipe":"false","lockMenu":"false","allowTempTheme":"true","dateFormat":"DD/MM/YYYY","sizes":{"sx":48,"sy":48,"gx":6,"gy":6,"cx":6,"cy":6,"px":0,"py":0}}},{"id":"f07f2284.66882","type":"ui_group","z":"","name":"Debug","tab":"5ee52ff4.c9bcd","disp":true,"width":"6","collapse":false},{"id":"84a49aa6.ece8f8","type":"mosca in","z":"d3b3123c.3700d","mqtt_port":1883,"mqtt_ws_port":8080,"name":"","username":"","password":"","dburl":"","x":138.5,"y":63,"wires":[[]]},{"id":"4e1b0ebf.b8849","type":"mqtt out","z":"2fa28c61.b659f4","name":"","topic":"/sensors/example","qos":"1","retain":"","broker":"e120d946.46fa68","x":503.5,"y":68,"wires":[]},{"id":"91e93093.b69b9","type":"template","z":"2fa28c61.b659f4","name":"Connected","field":"payload","fieldType":"msg","format":"json","syntax":"plain","template":"{\n    \"connectionStatus\": true\n}","output":"json","x":277.5,"y":46,"wires":[["4e1b0ebf.b8849"]]},{"id":"d5778615.363838","type":"template","z":"2fa28c61.b659f4","name":"Disconnected","field":"payload","fieldType":"msg","format":"json","syntax":"plain","template":"{\n    \"connectionStatus\": false\n}","output":"str","x":287.5,"y":99,"wires":[["4e1b0ebf.b8849"]]},{"id":"11fb0eab.b93991","type":"ui_button","z":"2fa28c61.b659f4","name":"","group":"f07f2284.66882","order":3,"width":0,"height":0,"passthru":false,"label":"Connect","tooltip":"","color":"","bgcolor":"","icon":"","payload":"","payloadType":"str","topic":"","x":105.5,"y":46,"wires":[["91e93093.b69b9"]]},{"id":"30e579e9.a240a6","type":"ui_button","z":"2fa28c61.b659f4","name":"","group":"f07f2284.66882","order":2,"width":0,"height":0,"passthru":false,"label":"Disconnect","tooltip":"","color":"","bgcolor":"","icon":"","payload":"","payloadType":"str","topic":"","x":95,"y":99,"wires":[["d5778615.363838"]]},{"id":"2de44e18.457882","type":"ui_led","z":"d3b3123c.3700d","group":"d2a16e71.43f47","name":"Connected","order":0,"label":"Connected","x":668,"y":123,"wires":[]},{"id":"f692216.3bbe7e","type":"function","z":"d3b3123c.3700d","name":"Connected Status","func":"if (typeof msg.payload == 'object' && \n    msg.payload.connectionStatus === true) {\n    msg.payload = true;\n} else {\n    msg.payload = false;\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":483,"y":123,"wires":[["2de44e18.457882"]]},{"id":"97e1b56b.41ae98","type":"json","z":"d3b3123c.3700d","name":"","property":"payload","action":"","pretty":false,"x":313,"y":123,"wires":[["f692216.3bbe7e"]]},{"id":"7e8d71cc.8cc83","type":"mqtt in","z":"d3b3123c.3700d","name":"","topic":"/sensors/example","qos":"2","broker":"e120d946.46fa68","x":142,"y":124,"wires":[["97e1b56b.41ae98"]]}]
```
