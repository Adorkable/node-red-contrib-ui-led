import { NodePropertiesDef } from '@node-red/editor-client'
import { EditorRED } from 'node-red'
import { GroupNodeDef } from '../../../types/node-red-dashboard'
import { ColorForValueArray } from '../shared/types'
import { LEDEditorNodeInstance, LEDEditorNodeProperties } from './types'

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

const WidthAutosize = 0

function getSelectedGroupNodeDef(
  node: LEDEditorNodeInstance,
  RED: EditorRED
): GroupNodeDef | undefined {
  const group = $('#node-input-group').val()?.toString() || node.group
  if (!group) {
    return undefined
  }

  return RED.nodes.node(group) as GroupNodeDef | undefined
}

const willFitInGroup = (
  width: number,
  groupNode: GroupNodeDef | undefined
): boolean => {
  if (width === WidthAutosize) {
    return true
  }

  if (!groupNode) {
    return true
  }

  if (width > groupNode.width) {
    return false
  }

  return true
}

const willFitWithLabel = (
  width: number,
  label: string,
  groupNode: GroupNodeDef | undefined
): boolean => {
  if (label.length === 0) {
    return true
  }

  if (groupNode && groupNode.width === 1) {
    return false
  }

  if (width === 1) {
    return false
  }

  return true
}

const validateWidthFactory = (RED: EditorRED) => {
  return function (
    this: LEDEditorNodeInstance,
    newValue: string | number
  ): boolean {
    let newWidthValue: number
    if (typeof newValue === 'number') {
      newWidthValue = newValue
    } else if (typeof newValue === 'string') {
      newWidthValue = parseInt(newValue, 10)
    } else {
      return false
    }

    const groupNode = getSelectedGroupNodeDef(this, RED)

    const fitsInGroup = willFitInGroup(newWidthValue, groupNode)
    const fitsWithLabel = willFitWithLabel(newWidthValue, this.label, groupNode)

    $('#node-input-size').toggleClass('input-error', !fitsInGroup)
    $('#node-input-label').toggleClass('input-error', !fitsWithLabel)
    return fitsInGroup
  }
}

const validateLabelFactory = (RED: EditorRED) => {
  return function (this: LEDEditorNodeInstance, newValue: string): boolean {
    if (newValue.length === 0) {
      return true
    }

    const groupNode = getSelectedGroupNodeDef(this, RED)
    const fitsWithLabel = willFitWithLabel(
      this.width || WidthAutosize,
      newValue,
      groupNode
    )

    $('#node-input-label').toggleClass('input-error', !fitsWithLabel)
    return fitsWithLabel
  }
}

const validateColorForValueFactory = (RED: EditorRED) => {
  return function (
    this: LEDEditorNodeInstance,
    newValue: string | ColorForValueArray
  ): boolean {
    let useNewValue: ColorForValueArray
    if (typeof newValue === 'string') {
      useNewValue = JSON.parse(newValue)
    } else {
      useNewValue = newValue
    }
    // TODO: check for duplicate values
    for (let index = 0; index < useNewValue.length; index++) {
      const colorForValue = useNewValue[index]
      if (!colorForValue.color || colorForValue.color.length === 0) {
        return false
      }
      // We're allowing undefined as a valid value
      // if (colorForValue.value === undefined) {
      //     return false;
      // }
      if (!colorForValue.valueType) {
        // || colorForValue.color.valueType === 0) {
        return false
      }
      if (!RED.validators.typedInput(colorForValue.valueType)) {
        console.log('Typed', colorForValue.valueType)
        return false
      }
    }
    return true
  }
}

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
