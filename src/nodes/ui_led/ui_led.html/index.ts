import { element } from 'angular'
import { EditorRED } from 'node-red'
import { control } from '../shared/rendering'
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
    width: string
    height: string
    group: string
    element?: TElement
  }): void
}

const previewId = '#ui_led-preview'
const updatePreview = function (
  label: string,
  labelPlacement: string,
  labelAlignment: string,
  color: string,
  width: number,
  height: number,
  showGlow: boolean
) {
  const previewsContainerStyle = String.raw`
    .previewsContainer {
      width: 100%;
      justify-content: space-around;
      height: ${48 * height}px; 
      display: flex; 
      flex-direction: row;
    }
    .previewContainer {
      justify-content: center;
      height: 100%;
      display: flex; 
      flex-direction: row;
      border: 1px solid #d3d3d36b;
      border-radius: 5px;
      min-width: ${width * 140}px;
      padding-left: 10px;
    }
  `

  $(previewId).html(String.raw`
    <style>
      ${previewsContainerStyle}
    </style>
    <div class='previewsContainer'>
      <div class='previewContainer'>
        ${control(
          'preview-no_glow',
          '',
          label,
          labelPlacement,
          labelAlignment,
          'gray',
          false,
          height
        )}
      </div>
      <div class='previewContainer'>
        ${control(
          'preview-glow',
          '',
          label,
          labelPlacement,
          labelAlignment,
          color,
          showGlow ? true : false,
          height
        )}
      </div>
    </div>
`)
}

const oneditprepare = function (this: LEDEditorNodeInstance) {
  ;(($('#node-input-size') as unknown) as JQuery<HTMLElement>).elementSizer({
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

  if (typeof this.colorForValue === 'undefined') {
    this.colorForValue = colorForValueDefault
  }

  if (typeof this.showGlow === 'undefined') {
    this.showGlow = true
    $('#node-input-showGlow').prop('checked', true)
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

  const latestValues = {
    color:
      this.colorForValue.length > 0 ? this.colorForValue[0].color : 'green',
    width: this.width || 1,
    height: this.height || 1,
    showGlow: this.showGlow,
    label: this.label,
    labelPlacement: this.labelPlacement || 'left',
    labelAlignment: this.labelAlignment || 'left'
  }

  const doUpdatePreview = () => {
    updatePreview(
      latestValues.label,
      latestValues.labelPlacement,
      latestValues.labelAlignment,
      latestValues.color,
      latestValues.width,
      latestValues.height,
      latestValues.showGlow
    )
  }

  doUpdatePreview()

  $('#node-input-width').on('change', (event) => {
    latestValues.width =
      (event.target as HTMLInputElement).value === '0'
        ? 1
        : parseInt((event.target as HTMLInputElement).value, 10)
    doUpdatePreview()
  })
  $('#node-input-height').on('change', (event) => {
    latestValues.height =
      (event.target as HTMLInputElement).value === '0'
        ? 1
        : parseInt((event.target as HTMLInputElement).value, 10)
    doUpdatePreview()
  })
  $('#node-input-label').on('change', (event) => {
    latestValues.label = (event.target as HTMLInputElement).value
    doUpdatePreview()
  })
  $('#node-input-labelPlacement').on('change', (event) => {
    latestValues.labelPlacement = (event.target as HTMLInputElement).value
    doUpdatePreview()
  })
  $('#node-input-labelAlignment').on('change', (event) => {
    latestValues.labelAlignment = (event.target as HTMLInputElement).value
    doUpdatePreview()
  })
  $('#node-input-showGlow').on('change', (event) => {
    latestValues.showGlow = (event.target as HTMLInputElement).checked
    doUpdatePreview()
  })
  $('#node-input-colorForValue-container').on('DOMSubtreeModified', (event) => {
    const list = event.target as HTMLOListElement
    if (list.firstChild === null) {
      latestValues.color = 'green'
    } else {
      latestValues.color = $(list.firstChild)
        .find('.node-input-colorForValue-color')
        .val()
      if (latestValues.color.length === 0) {
        latestValues.color = 'green'
      }
    }
    doUpdatePreview()
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
  icon: 'ui_led.png',

  oneditprepare,
  oneditsave
})
