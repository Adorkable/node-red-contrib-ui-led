import { EditorRED } from 'node-red'
import { GroupNodeDef } from '../../../types/node-red-dashboard'
import { ColorForValueArray, ValueType } from '../shared/types'
import {
  colorFieldClass,
  colorForValueEditContainerId,
  groupId,
  valueFieldClass,
  valueTypeFieldClass
} from './constants'
import { LEDEditorNodeInstance } from './types'

const WidthAutosize = 0

export function getSelectedGroupNodeDef(
  node: LEDEditorNodeInstance,
  RED: EditorRED
): GroupNodeDef | undefined {
  const group =
    $('#' + groupId)
      .val()
      ?.toString() || node.group
  if (!group) {
    return undefined
  }

  return RED.nodes.node(group) as GroupNodeDef | undefined
}

export const willFitInGroup = (
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

export const willFitWithLabel = (
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

export const validateWidthFactory = (RED: EditorRED) => {
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

export const validateLabelFactory = (RED: EditorRED) => {
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

export const validateColorForValueFactory = (RED: EditorRED) => {
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

export const getColorForValueFromContainer = (
  containerId: string = colorForValueEditContainerId
): ColorForValueArray => {
  const colorsElement = $('#' + containerId).children()
  return colorsElement
    .map((index, element) => {
      const jElement = $(element)
      const color =
        jElement
          .find('.' + colorFieldClass)
          .val()
          ?.toString() || ''
      const value =
        jElement
          .find('.' + valueFieldClass)
          .val()
          ?.toString() || 'null'
      const valueType = (jElement
        .find('.' + valueTypeFieldClass)
        .val()
        ?.toString() || 'str') as ValueType
      return {
        color,
        value,
        valueType
      }
    })
    .toArray()
}

export const getGroupId = (): string => {
  return $('#' + groupId).val()
}
