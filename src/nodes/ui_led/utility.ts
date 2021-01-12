import nodeRed, { NodeAPI } from 'node-red'
import { ColorForValue, ColorForValueArray } from './shared/types'

import { LEDNode, LEDNodeDef } from './types'

/**
 * Check for that we have a config instance and that our config instance has a group selected, otherwise report an error
 * @param {object} config - The config instance
 * @param {object} node - The node to report the error on
 * @returns {boolean} `false` if we encounter an error, otherwise `true`
 */
export const checkConfig = (
  config: LEDNodeDef,
  node: LEDNode,
  RED: NodeAPI<nodeRed.NodeAPISettingsWithData>
): boolean => {
  if (!config) {
    // TODO: have to think further if it makes sense to separate these out, it isn't clear what the user can do if they encounter this besides use the explicit error to more clearly debug the code
    node.error(RED._('ui_led.error.no-config'))
    return false
  }
  if (!config.group) {
    node.error(RED._('ui_led.error.no-group'))
    return false
  }
  return true
}

export const nodeToStringFactory = (config: LEDNodeDef) => {
  return (): string => {
    let result = 'LED'
    if (config.name) {
      result += ' name: ' + config.label
    }
    if (config.label) {
      result += ' label: ' + config.label
    }
    return result
  }
}

// TODO: should we be doing this at message time? less performant but does it allow config changes where doing before doesn't?
export const mapColorForValue = (
  node: LEDNode,
  config: ColorForValueArray,
  RED: NodeAPI<nodeRed.NodeAPISettingsWithData>
): ColorForValue[] => {
  return config.map((value) => {
    return {
      color: value.color,
      value: RED.util.evaluateNodeProperty(
        value.value,
        value.valueType,
        node,
        {}
      ),
      valueType: value.valueType
    }
  })
}
