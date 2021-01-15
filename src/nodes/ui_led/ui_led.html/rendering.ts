import { EditorNodeInstance } from 'node-red'
import { Payload } from '../../../types/node-red-dashboard'
import { control } from '../shared/rendering'
import {
  LabelAlignment,
  LabelPlacement,
  SupportedValueTypes
} from '../shared/types'
import {
  colorFieldClass,
  colorForValueEditContainerId,
  contextPrefix,
  inputErrorClass,
  previewContainerClass,
  previewsContainerClass,
  rowHandleClass,
  valueFieldClass,
  valueTypeFieldClass
} from './constants'

export const label = function (this: EditorNodeInstance): string {
  return this.name || 'led'
}

export const labelStyle = function (this: EditorNodeInstance): string {
  return this.name ? 'node_label_italic' : ''
}

export interface PreviewConfig {
  color: string
  width: number
  maxWidth: number
  height: number
  showGlow: boolean
  label: string
  labelPlacement: LabelPlacement
  labelAlignment: LabelAlignment
}

export const preview = (config: PreviewConfig): string => {
  const previewsContainerStyle = String.raw`
    .${previewsContainerClass} {
      width: calc(100% - 6px * 2);
      justify-content: space-around;
      height: ${config.height !== 0 ? `${42 * config.height + 8}px` : '50px'}; 
      display: flex; 
      flex-direction: row;
      background-color: #f7f7f7;
      box-shadow: inset black 0px 0px 2px 0px;
      padding: 6px;
      overflow-x: scroll; 
      border: 1px solid #00000026;
    }
    .${previewContainerClass} {
      justify-content: center;
      height: 100%;
      display: flex; 
      flex-direction: row;
      min-width: ${config.width === 0 ? `42px` : ''};
      width: ${config.width !== 0 ? `${config.width * 42}px` : '100%'};
      max-width: ${config.maxWidth !== 0 ? `${config.maxWidth * 42}px` : ''};
      padding-left: 3px;
      padding-right: 3px;
      background-color: white;
      border: 1px solid #d3d3d3;
      border-radius: 5px;
    }
  `
  return String.raw`
    <style>
      ${previewsContainerStyle}
    </style>
    <div class='${previewsContainerClass}'>
      <div class='${previewContainerClass}'>
        ${control(
          'preview-no_glow',
          '',
          config.label,
          config.labelPlacement,
          config.labelAlignment,
          'gray',
          false,
          config.height !== 0 ? config.height : 1
        )}
      </div>
      <div class='${previewContainerClass}'>
        ${control(
          'preview-glow',
          '',
          config.label,
          config.labelPlacement,
          config.labelAlignment,
          config.color,
          config.showGlow ? true : false,
          config.height !== 0 ? config.height : 1
        )}
      </div>
    </div>
`
}

export const generateValueFormRow = (
  index: number,
  value: Payload,
  fieldKeyUpValidateNotEmpty: (this: EditorNodeInstance | HTMLElement) => void
): void => {
  const requiredFieldClasses: string[] = []

  const containerId = 'ValueFormRow-' + index
  //   const elementByClassInContainer = (elementClass) => {
  //     return '#' + containerId + ' .' + elementClass
  //   }

  const container = $('<li id="' + contextPrefix + '-' + containerId + '" />', {
    style:
      'background: #fff; margin:0; padding:8px 0px 0px; border-bottom: 1px solid #ccc;'
  })
  const row = $('<div/>', {
    style:
      'width: 100%; display: flex; flex-direction: row; align-items: center; padding-bottom: 8px;'
  }).appendTo(container)

  $('<i/>', {
    class: rowHandleClass + ' fa fa-bars',
    style: 'color: #eee; cursor: move; margin-left: 3px;'
  }).appendTo(row)

  const valueWrapper = $('<div/>', {
    style: 'min-width:30%; flex-grow:1; margin-left:10px;'
  })

  const valueField = $('<input/>', {
    type: 'text',
    class: valueFieldClass,
    // style: "min-width: 30%; flex-grow: 1; margin-left: 30px;",
    style: 'width: 100%',
    placeholder: 'Value',
    value: value.value
  }).appendTo(valueWrapper)
  const valueTypeField = $('<input/>', {
    type: 'hidden',
    class: valueTypeFieldClass,
    value: value.valueType
  }).appendTo(valueWrapper)
  valueWrapper.appendTo(row)

  valueField.typedInput({
    default: 'bool',
    typeField: valueTypeField,
    types: SupportedValueTypes
  })

  let rowColorFieldClass = colorFieldClass
  if (!value.color) {
    rowColorFieldClass = rowColorFieldClass + ' ' + inputErrorClass
  }
  const colorField = $('<input/>', {
    class: rowColorFieldClass,
    type: 'text',
    style: 'width:35%; margin-left:10px;',
    placeholder: 'Color',
    required: true,
    value: value.color
  }).appendTo(row)

  requiredFieldClasses.push(colorFieldClass)

  colorField.keyup(fieldKeyUpValidateNotEmpty)

  const deleteButton = $('<a/>', {
    href: '#',
    class: 'editor-button editor-button-small',
    style: 'margin-left:13px; width: 20px; margin-right: 10px; right: 0px'
  }).appendTo(row)

  $('<i/>', {
    class: 'fa fa-remove',
    style: ''
  }).appendTo(deleteButton)

  deleteButton.click(() => {
    for (
      let requiredIndex = 0;
      requiredIndex < requiredFieldClasses.length;
      requiredIndex++
    ) {
      container
        .find('.' + requiredFieldClasses[requiredIndex])
        .removeAttr('required')
    }
    container.css({ background: '#fee' })
    container.fadeOut(300, function () {
      $(this).remove()
    })
  })

  $('#' + colorForValueEditContainerId).append(container)
}
