import { NodePropertiesDef } from '@node-red/editor-client'
import { EditorRED } from 'node-red'
import { ColorForValueArray } from '../shared/types'
import {
  validateColorForValueFactory,
  validateLabelFactory,
  validateWidthFactory
} from './processing'
import { LEDEditorNodeProperties } from './types'

export const colorForValueDefault: ColorForValueArray = [
  {
    color: 'red',
    value: false,
    valueType: 'bool'
  },
  {
    color: 'green',
    value: true,
    valueType: 'bool'
  }
]

export const defaultsFactory = (
  RED: EditorRED
): NodePropertiesDef<LEDEditorNodeProperties> => {
  return {
    order: { value: 0 },
    group: { value: 'ui_group', type: 'ui_group', required: true },
    width: {
      value: 0,
      validate: validateWidthFactory(RED)
    },
    height: { value: 0 },
    label: {
      value: '',
      validate: validateLabelFactory(RED)
    },
    labelPlacement: { value: 'left' },
    labelAlignment: { value: 'left' },

    colorForValue: {
      required: true,
      // TODO: switch to object sorted by value
      value: colorForValueDefault,
      validate: validateColorForValueFactory(RED)
    },
    allowColorForValueInMessage: { value: false },

    showGlow: { value: true },

    name: { value: '' }
  }
}
