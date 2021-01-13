import { LEDNodeDef } from './types'

// TODO: switch from _ to - to ensure we don't ever collide with any class and to make more readable as different than a description (led_container vs led-31343, etc)
export const composeLEDElementIdTemplate = (): string => {
  return String.raw`led_{{$id}}`
}

/**
 * Generate our dashboard HTML code
 * @param {object} config - The node's config instance
 * @param {object} ledStyle - Style attribute of our LED span in in-line CSS format
 */
export const HTML = (config: LEDNodeDef, ledStyle: string): string => {
  // text-align: ` + config.labelAlignment + `

  const hasName = () => {
    return typeof config.label === 'string' && config.label !== ''
  }
  const name = () => {
    if (hasName()) {
      return `<span class=\"name\">` + config.label + `</span>`
    }
    return ''
  }
  const optionalName = (display: boolean) => {
    if (display) {
      return name()
    }
    return ''
  }

  const controlClassTemplate = String.raw`led_{{$id}}`

  const controlStyle = String.raw`
    div.${controlClassTemplate} {
      display: flex;
      flex-direction: row;

      justify-content: ${hasName() ? 'space-between' : 'center'};
      align-items: center;

      height: 100%;
      position: relative;
    }`

  const ledContainerPadding = '9px'
  const ledContainerStyle = String.raw`
    div.led_container {
      height: calc(100% - ${ledContainerPadding} * 2);
      text-align: center;
      padding: ${ledContainerPadding};
    }`

  const ledRatioFixStyle = String.raw`
    div.led_ratio_fix {
      display: inline-block;
      position: relative;
      height: 100%;
      width: inherit;
      left: 0;
      padding-bottom: 0;
    }`

  const ledRatioFixClearStyle = String.raw`
    .clear {
      clear: both;
    }
    img.clear {
      filter: opacity(0);
      height: 100%;
      width: auto;
      background: transparent;
    }`

  const ledContentsStyle = String.raw`
    div.led_contents {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width:100%;
      border-radius: 50%;
    }`

  // TODO: wrap and hide
  const labelStyle = String.raw`
    div.${controlClassTemplate} > span.name {
		  flex-grow: 1;
			text-align: ${config.labelAlignment};
      margin-${config.labelPlacement === 'right' ? 'left' : 'right'}: 6px;
		}`

  const style = String.raw`<style>
      ${controlStyle}
      ${ledContainerStyle}
      ${ledRatioFixStyle}
      ${ledRatioFixClearStyle}
      ${ledContentsStyle}
      ${labelStyle}
    </style>`

  const ledContentsElement = String.raw`
    <div 
      class='led_contents' 
      id='${composeLEDElementIdTemplate()}' 
      style='${ledStyle}'></div>`

  const clearImageElement = String.raw`<img class='clear' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5QTA5Qjk3OUUzNjExRTJCQTNCOEE1OUQ4MkIxNUMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI5QTA5Qjk4OUUzNjExRTJCQTNCOEE1OUQ4MkIxNUMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjlBMDlCOTU5RTM2MTFFMkJBM0I4QTU5RDgyQjE1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjlBMDlCOTY5RTM2MTFFMkJBM0I4QTU5RDgyQjE1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ceJHZAAAAD0lEQVR42mL4+fMWQIABAAW7As04lLnmAAAAAElFTkSuQmCC'>`

  const ledElement = String.raw`
    <div class='led_container'>
      <div class='led_ratio_fix'>
          ${clearImageElement}
          ${ledContentsElement}
      </div>
    </div>`

  const allElements = String.raw`
    <div class="${controlClassTemplate}">
      ${optionalName(config.labelPlacement !== 'right')}
      ${ledElement}
      ${optionalName(config.labelPlacement === 'right')}
    </div>`
  return style + allElements
}

export const ledStyle = (color: string, glow: boolean): string => {
  if (glow) {
    return `
      background-color: ${color};
      box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ${color} 0 -1px 4px, ${color} 0 0px 12px, ${color} 0 0px 12px;`
  } else {
    // TODO: duplicate code because of execution scope, fix this shit :|
    return `
      background-color: ${color}; 
      box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ${color} 0 -1px 4px;`
  }
}
