import { NodeInitializer } from 'node-red'
import { NodeRedUI } from '../../types/node-red-dashboard'

import { beforeEmitFactory, initController } from './processing'
import { HTML, ledStyle } from './rendering'
import { LEDNode, LEDNodeDef } from './types'
import { checkConfig, mapColorForValue, nodeToStringFactory } from './utility'

const nodeInit: NodeInitializer = (RED): void => {
  function LEDNodeConstructor(this: LEDNode, config: LEDNodeDef): void {
    try {
      const NodeREDDashboard = RED.require('node-red-dashboard')
      if (!NodeREDDashboard) {
        throw new Error(
          'Node-RED dashboard is a peer requirement of this library, please install it via npm or in the palette panel.'
        )
      }

      RED.nodes.createNode(this, config)

      if (!checkConfig(config, this, RED)) {
        return
      }

      this.colorForValue = mapColorForValue(this, config.colorForValue, RED)
      this.allowColorForValueInMessage = config.allowColorForValueInMessage
      this.toString = nodeToStringFactory(config)

      // TODO: support theme and dark
      const ui: NodeRedUI = NodeREDDashboard(RED)

      const group = RED.nodes.getNode(config.group) as any

      const done = ui.addWidget({
        node: this,
        width:
          config.width || (config.group && group.config.width) || undefined,
        height: config.height || 1,
        format: HTML(config, ledStyle('gray', false)),
        group: config.group,
        templateScope: 'local',
        order: config.order,
        emitOnlyNewValues: false,
        beforeEmit: beforeEmitFactory(this, RED),
        initController
      })

      this.on('close', done)
    } catch (error) {
      console.log(error)
    }
  }

  RED.nodes.registerType('ui_led', LEDNodeConstructor)
}

export = nodeInit
