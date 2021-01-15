import { EditorNodeInstance } from 'node-red'
import {
  colorFieldClass,
  colorForValueEditContainerId,
  heightId,
  inputErrorClass,
  labelAlignmentId,
  labelId,
  labelPlacementId,
  previewId,
  showGlowId,
  widthId
} from './constants'
import { generateValueFormRow, preview } from './rendering'
import { LEDEditorNodeInstance } from './types'

export const updatePreview = (
  label: string,
  labelPlacement: string,
  labelAlignment: string,
  color: string,
  width: number,
  height: number,
  showGlow: boolean
): void => {
  $('#' + previewId).html(
    preview(
      label,
      labelPlacement,
      labelAlignment,
      color,
      width,
      height,
      showGlow
    )
  )
}

export const setupPreviewUpdating = (node: LEDEditorNodeInstance): void => {
  const latestValues = {
    color:
      node.colorForValue.length > 0 ? node.colorForValue[0].color : 'green',
    width: node.width || 1,
    height: node.height || 1,
    showGlow: node.showGlow,
    label: node.label,
    labelPlacement: node.labelPlacement || 'left',
    labelAlignment: node.labelAlignment || 'left'
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

  $('#' + widthId).on('change', (event) => {
    latestValues.width =
      (event.target as HTMLInputElement).value === '0'
        ? 1
        : parseInt((event.target as HTMLInputElement).value, 10)
    doUpdatePreview()
  })
  $('#' + heightId).on('change', (event) => {
    latestValues.height =
      (event.target as HTMLInputElement).value === '0'
        ? 1
        : parseInt((event.target as HTMLInputElement).value, 10)
    doUpdatePreview()
  })
  $('#' + labelId).on('change', (event) => {
    latestValues.label = (event.target as HTMLInputElement).value
    doUpdatePreview()
  })
  $('#' + labelPlacementId).on('change', (event) => {
    latestValues.labelPlacement = (event.target as HTMLInputElement).value
    doUpdatePreview()
  })
  $('#' + labelAlignmentId).on('change', (event) => {
    latestValues.labelAlignment = (event.target as HTMLInputElement).value
    doUpdatePreview()
  })
  $('#' + showGlowId).on('change', (event) => {
    latestValues.showGlow = (event.target as HTMLInputElement).checked
    doUpdatePreview()
  })

  const colorChanged = (color: string) => {
    latestValues.color =
      color !== undefined && color.length > 0 ? color : 'green'
    doUpdatePreview()
  }
  const colorInputChanged = (event: Event) => {
    colorChanged((event.target as HTMLInputElement).value)
  }
  const listChanged = (list: HTMLOListElement) => {
    if (list.firstChild === null) {
      colorChanged('green')
      return
    }
    for (const child of $(list).children().toArray()) {
      if (child === list.firstChild) {
        const colorInput = $(child).find('.' + colorFieldClass)
        colorChanged(colorInput.val())

        $(child).on('change', colorInputChanged)
      } else {
        $(child).off('change', colorInputChanged)
      }
    }
  }

  $('#' + colorForValueEditContainerId).on('DOMSubtreeModified', (event) => {
    listChanged(event.target as HTMLOListElement)
  })
}

export const addColorForValue = (): void => {
  generateValueFormRow(
    $('#' + colorForValueEditContainerId).children().length + 1,
    {},
    fieldKeyUpValidateNotEmpty
  )
  // TODO: scroll to new element
  $('#' + colorForValueEditContainerId).scrollTop(
    $('#' + colorForValueEditContainerId).get(0).scrollHeight
  )
}

export const setChecked = (query: string, checked: boolean): void => {
  $(query).prop('checked', checked)
}

export const fieldKeyUpValidateNotEmpty = function (
  this: EditorNodeInstance | HTMLElement
): void {
  const value = $(this).val()

  if (value && $(this).hasClass(inputErrorClass)) {
    $(this).removeClass(inputErrorClass)
  } else {
    if (!value) {
      $(this).addClass(inputErrorClass)
    }
  }
}
