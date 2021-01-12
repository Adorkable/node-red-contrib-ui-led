import { EditorNodeInstance } from 'node-red'
import { SupportedValueTypes } from '../shared/types'

export const colorForValueEditContainerId =
  '#node-input-colorForValue-container'
export const contextPrefix = 'node-input-colorForValue'

export const rowHandleClass = contextPrefix + '-handle'
export const colorFieldClass = contextPrefix + '-color'
export const valueFieldClass = contextPrefix + 'value'
export const valueTypeFieldClass = contextPrefix + '-valueType'
export const inputErrorClass = 'input-error'

export const fieldKeyUpValidateNotEmpty = function (
  this: EditorNodeInstance | HTMLElement
) {
  const value = $(this).val()

  if (value && $(this).hasClass(inputErrorClass)) {
    $(this).removeClass(inputErrorClass)
  } else {
    if (!value) {
      $(this).addClass(inputErrorClass)
    }
  }
}

export const generateValueFormRow = (index: number, value: any) => {
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

  $(colorForValueEditContainerId).append(container)
}
