import { EditorRED } from 'node-red'
import { colorForValueDefault, defaultsFactory } from './defaults'
import {
  addColorForValueId,
  colorForValueEditContainerId,
  groupId,
  heightId,
  rowHandleClass,
  showGlowId,
  sizeId,
  widthId
} from './constants'
import {
  addColorForValue,
  fieldKeyUpValidateNotEmpty,
  setChecked,
  setupPreviewUpdating
} from './interaction'
import { generateValueFormRow, label, labelStyle } from './rendering'
import { LEDEditorNodeInstance } from './types'
import { getColorForValueFromContainer } from './processing'

declare const RED: EditorRED

const setupColorForValue = (node: LEDEditorNodeInstance) => {
  for (let index = 0; index < node.colorForValue.length; index++) {
    const rowValue = node.colorForValue[index]
    generateValueFormRow(index + 1, rowValue, fieldKeyUpValidateNotEmpty)
  }

  $('#' + colorForValueEditContainerId).sortable({
    axis: 'y',
    handle: '.' + rowHandleClass,
    cursor: 'move'
  })

  $('#' + addColorForValueId).on('click', addColorForValue)
}

const oneditprepare = function (this: LEDEditorNodeInstance) {
  // TODO: why isn't this picking up on the interface definition additions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;($('#' + sizeId) as any).elementSizer({
    width: '#' + widthId,
    height: '#' + heightId,
    group: '#' + groupId
  })

  if (typeof this.colorForValue === 'undefined') {
    this.colorForValue = colorForValueDefault
  }

  if (typeof this.showGlow === 'undefined') {
    this.showGlow = true
    setChecked('#' + showGlowId, this.showGlow)
  }

  setupColorForValue(this)

  setupPreviewUpdating(this)
}

const oneditsave = function (this: LEDEditorNodeInstance) {
  this.colorForValue = getColorForValueFromContainer()
}

RED.nodes.registerType('ui_led', {
  category: 'dashboard',
  paletteLabel: 'led',
  color: 'rgb(63, 173, 181)',
  defaults: defaultsFactory(RED),
  inputs: 1,
  inputLabels: 'value',
  outputs: 0,
  align: 'right',
  label: label,
  labelStyle: labelStyle,
  icon: 'ui_led.png',

  oneditprepare,
  oneditsave
})
