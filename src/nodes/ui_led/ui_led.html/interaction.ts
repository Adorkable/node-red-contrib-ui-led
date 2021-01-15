import { EditorNodeInstance, EditorRED } from 'node-red'
import { GroupNodeDef } from '../../../types/node-red-dashboard'
import { LabelAlignment, LabelPlacement, Shape } from '../shared/types'
import {
  colorFieldClass,
  colorForValueEditContainerId,
  heightId,
  inputErrorClass,
  labelAlignmentId,
  labelId,
  labelPlacementId,
  previewId,
  shapeId,
  showGlowId,
  showPreviewId,
  showPreviewShowingClass,
  widthId
} from './constants'
import { getGroupId } from './processing'
import { generateValueFormRow, preview, PreviewConfig } from './rendering'
import { LEDEditorNodeInstance } from './types'

export const togglePreview = (
  showPreviewToggleId: string = showPreviewId,
  previewContainerId: string = previewId
): void => {
  const showPreviewToggle = $('#' + showPreviewToggleId)
  const preview = $('#' + previewContainerId)
  if (showPreviewToggle.hasClass(showPreviewShowingClass)) {
    showPreviewToggle.removeClass(showPreviewShowingClass)
    preview.css('display', 'none')
  } else {
    showPreviewToggle.addClass(showPreviewShowingClass)
    preview.css('display', '')
  }
}

export const updatePreview = (config: PreviewConfig): void => {
  $('#' + previewId).html(preview(config))
}

export const setupPreviewUpdating = (
  node: LEDEditorNodeInstance,
  RED: EditorRED
): void => {
  const latestGroup = RED.nodes.node(getGroupId()) as GroupNodeDef

  // TODO: update on group change in case group width is different
  const latestConfig: PreviewConfig = {
    color:
      node.colorForValue.length > 0 ? node.colorForValue[0].color : 'green',
    width: typeof node.width !== 'undefined' ? node.width : 0,
    maxWidth: latestGroup !== undefined ? latestGroup.width : 0,
    height: typeof node.height !== 'undefined' ? node.height : 0,
    shape: node.shape,
    showGlow: node.showGlow,
    label: node.label,
    labelPlacement: node.labelPlacement || 'left',
    labelAlignment: node.labelAlignment || 'left'
  }

  const doUpdatePreview = () => {
    updatePreview(latestConfig)
  }

  doUpdatePreview()

  $('#' + widthId).on('change', (event) => {
    latestConfig.width = parseInt((event.target as HTMLInputElement).value, 10)
    doUpdatePreview()
  })
  $('#' + heightId).on('change', (event) => {
    latestConfig.height = parseInt((event.target as HTMLInputElement).value, 10)
    doUpdatePreview()
  })
  $('#' + labelId).on('change', (event) => {
    latestConfig.label = (event.target as HTMLInputElement).value
    doUpdatePreview()
  })
  $('#' + labelPlacementId).on('change', (event) => {
    latestConfig.labelPlacement = (event.target as HTMLInputElement)
      .value as LabelPlacement
    doUpdatePreview()
  })
  $('#' + labelAlignmentId).on('change', (event) => {
    latestConfig.labelAlignment = (event.target as HTMLInputElement)
      .value as LabelAlignment
    doUpdatePreview()
  })
  $('#' + shapeId).on('change', (event) => {
    latestConfig.shape = (event.target as HTMLInputElement).value as Shape
    doUpdatePreview()
  })
  $('#' + showGlowId).on('change', (event) => {
    latestConfig.showGlow = (event.target as HTMLInputElement).checked
    doUpdatePreview()
  })

  const colorChanged = (color: string) => {
    latestConfig.color =
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
