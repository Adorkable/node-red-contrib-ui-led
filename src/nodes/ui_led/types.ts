import { Node, NodeDef, NodeMessage } from 'node-red'
import { BeforeEmitMessage, Payload } from '../../types/node-red-dashboard'
import { ColorForValueArray, LEDNodeOptions } from './shared/types'

export interface LEDNodeDef extends NodeDef, LEDNodeOptions {}

// TODO: test if Typescript really is forcing our key to type string
export type ColorForValueMap = Record<Payload, string>

export type LEDNodeCredentials = Record<string, unknown>

export interface LEDNode extends Node<LEDNodeCredentials> {
  colorForValue: ColorForValueArray

  allowColorForValueInMessage: boolean
  overrideColorForValue: ColorForValueArray | ColorForValueMap

  showGlow: boolean
}

export interface LEDBeforeEmitMessage extends BeforeEmitMessage {
  colorForValue?: ColorForValueArray | ColorForValueMap | void
}

export interface ControllerMessage extends NodeMessage {
  color: string
  glow: boolean
}
