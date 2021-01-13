import { Payload } from '../../../types/node-red-dashboard'

export interface LEDNodeOptions {
  label: string
  labelAlignment?: string | void
  labelPlacement?: string | void

  width?: number | void
  height?: number | void

  order: number

  group: string

  colorForValue: ColorForValueArray

  allowColorForValueInMessage: boolean

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
