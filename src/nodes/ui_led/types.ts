import { Node, NodeDef, NodeMessage } from 'node-red'
import { ColorForValueArray, LEDNodeOptions } from './shared/types'

export interface LEDNodeDef extends NodeDef, LEDNodeOptions {}

// TODO: test if Typescript really is forcing our key to type string
export type ColorForValueMap = Record<any, string>

export type LEDNodeCredentials = Record<string, unknown>

export interface LEDNode extends Node<LEDNodeCredentials> {
  colorForValue: ColorForValueArray

  allowColorForValueInMessage: boolean
  overrideColorForValue: ColorForValueArray | ColorForValueMap
}

export interface EmitMessage extends NodeMessage {
  colorForValue: ColorForValueArray | ColorForValueMap
}

export interface ControllerMessage extends NodeMessage {
  color: string
  glow: boolean
}
