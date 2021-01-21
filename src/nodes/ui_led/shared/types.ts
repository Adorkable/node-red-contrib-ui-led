import { Payload } from '../../../types/node-red-dashboard'

export type LabelPlacement = 'left' | 'right'
export type LabelAlignment = 'left' | 'center' | 'right'
export type Shape = 'circle' | 'square'

export interface LEDNodeOptions {
  label: string
  labelPlacement?: LabelPlacement | void
  labelAlignment?: LabelAlignment | void

  width?: number | void
  height?: number | void

  order: number

  group: string

  colorForValue: ColorForValueArray

  allowColorForValueInMessage: boolean

  shape: Shape

  showGlow: boolean
}

// Copied from node-red :P
export type ValueType =
  // | 'msg'
  // | 'flow'
  // | 'global'
  'str' | 'num' | 'bool' | 'json' | 'bin'
// | 're'
// | 'date'
// | 'jsonata'
// | 'env'

export const SupportedValueTypes: ValueType[] = [
  'str',
  'num',
  'bool',
  'json',
  'bin'
] // TODO: add further support

export type ColorForValue = {
  color: string
  value: Payload
  valueType: ValueType
}

export type ColorForValueArray = ColorForValue[]
