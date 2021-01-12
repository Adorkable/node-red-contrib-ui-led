import { EditorRED } from 'node-red'
import { ColorForValue, ValueType } from '../shared/types'
import { colorForValueDefault, defaultsFactory } from './defaults'
import {
  colorFieldClass,
  colorForValueEditContainerId,
  generateValueFormRow,
  rowHandleClass,
  valueFieldClass,
  valueTypeFieldClass
} from './editor'
import { label, labelStyle } from './rendering'
import { LEDEditorNodeInstance } from './types'

declare const RED: EditorRED
declare interface JQuery<TElement extends HTMLElement> {
  elementSizer(options: {
    width: string,
    height: string,
    group: string,
    element?: TElement
  }): void
}

const oneditprepare = function (this: LEDEditorNodeInstance) {
  ($('#node-input-size') as unknown as JQuery<HTMLElement>).elementSizer({
    width: '#node-input-width',
    height: '#node-input-height',
    group: '#node-input-group'
  })

  $('#node-input-add-color').click(() => {
    generateValueFormRow(
      $(colorForValueEditContainerId).children().length + 1,
      {}
    )
    $(colorForValueEditContainerId).scrollTop(
      $(colorForValueEditContainerId).get(0).scrollHeight
    )
  })

  if (!this.colorForValue) {
    this.colorForValue = colorForValueDefault
  }

  for (let index = 0; index < this.colorForValue.length; index++) {
    const rowValue = this.colorForValue[index]
    generateValueFormRow(index + 1, rowValue)
  }

  $(colorForValueEditContainerId).sortable({
    axis: 'y',
    handle: '.' + rowHandleClass,
    cursor: 'move'
  })
}

const oneditsave = function (this: LEDEditorNodeInstance) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const node = this

  const colorsElement = $(colorForValueEditContainerId).children()
  node.colorForValue = []
  colorsElement.each(function (_index) {
    const colorElement = $(this)

    const color =
      colorElement
        .find('.' + colorFieldClass)
        .val()
        ?.toString() || ''
    const value =
      colorElement
        .find('.' + valueFieldClass)
        .val()
        ?.toString() || 'null'
    const valueType = (colorElement
      .find('.' + valueTypeFieldClass)
      .val()
      ?.toString() || 'str') as ValueType
    const settings: ColorForValue = {
      color,
      value,
      valueType
    }
    node.colorForValue.push(settings)
  })
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
  icon: 'icon.png',

  oneditprepare,
  oneditsave
})
