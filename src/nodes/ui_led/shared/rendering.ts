const glowSize = 7

export const ledStyle = (
  color: string,
  glow: boolean,
  sizeMultiplier: number
): string => {
  if (glow) {
    return `
      background-color: ${color};
      box-shadow:
        inset #ffffff1f 0px 0px 1px 1px, 
        #ffffff8e 0px 0px ${glowSize * sizeMultiplier}px 0px,
        inset ${color} 0 -1px ${2 * sizeMultiplier}px, 
        ${color} 0 0px ${glowSize * sizeMultiplier}px, 
        ${color} 0 0px ${glowSize * sizeMultiplier}px;`
  } else {
    // TODO: duplicate code because of execution scope, fix this shit :|
    return `
      background-color: ${color}; 
      box-shadow:
        inset #ffffff8c 0px 1px 2px,
        inset #00000033 0 -1px 1px 1px,
        inset ${color} 0 -1px 4px;`
  }
}

export const ledElement = (
  controlClass: string,
  ledId: string,
  color: string,
  glow: boolean,
  sizeMultiplier: number
): string => {
  const showCurveReflection = false // TODO: Needs visual work and potentially make an option for poeple who like the old style better

  const ledContainerPadding = `${(glowSize + 4) * sizeMultiplier}px`

  // TODO: if show glow is turned off we should not include this padding for the glow?
  const ledContainerStyle = String.raw`
    div.${controlClass}.led_container {
      right: 0px;
      height: calc(100% - ${ledContainerPadding} * 2);
      text-align: center;
      padding: ${ledContainerPadding};
    }`

  const ledRatioFixStyle = String.raw`
    div.${controlClass}.led_ratio_fix {
      display: inline-block;
      position: relative;
      height: 100%;
      width: inherit;
      left: 0;
      padding-bottom: 0;
    }`

  const ledRatioFixClearStyle = String.raw`
    .${controlClass}.clear {
      clear: both;
    }
    img.${controlClass}.clear {
      filter: opacity(0);
      height: 100%;
      width: auto;
      background: transparent;
    }`

  const ledContentsStyle = String.raw`
    div.${controlClass}.led_contents {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width:100%;
      border-radius: 50%;
    }`

  const ledCurveShineReflectionStyle = String.raw`
    .${controlClass}.curveShine {
      width: 70%; 
      height: 70%; 
      background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,255,31,0) 60%);'
    }`
  const styles = String.raw`
        ${ledContainerStyle}
        ${ledRatioFixStyle}
        ${ledRatioFixClearStyle}
        ${ledContentsStyle}
        ${ledCurveShineReflectionStyle}
    `

  const ledCurveReflection = String.raw`
        <div class='${controlClass} curveShine'></div>`

  const ledContentsElement = String.raw`
    <div 
      class='${controlClass} led_contents' 
      id='${ledId}' 
      style='${ledStyle(color, glow, sizeMultiplier)}'>
      ${showCurveReflection ? ledCurveReflection : ''}
    </div>`

  const clearImageElement = String.raw`<img class='${controlClass} clear' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5QTA5Qjk3OUUzNjExRTJCQTNCOEE1OUQ4MkIxNUMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI5QTA5Qjk4OUUzNjExRTJCQTNCOEE1OUQ4MkIxNUMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjlBMDlCOTU5RTM2MTFFMkJBM0I4QTU5RDgyQjE1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjlBMDlCOTY5RTM2MTFFMkJBM0I4QTU5RDgyQjE1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ceJHZAAAAD0lEQVR42mL4+fMWQIABAAW7As04lLnmAAAAAElFTkSuQmCC'>`

  return String.raw`
    <style>
        ${styles}
    </style>
    <div class='${controlClass} led_container'>
      <div class='${controlClass} led_ratio_fix'>
          ${clearImageElement}
          ${ledContentsElement}
      </div>
    </div>`
}

export const control = (
  controlClass: string,
  ledId: string,
  label: string,
  labelPlacement: string,
  labelAlignment: string,
  color: string,
  glow: boolean,
  sizeMultiplier: number
): string => {
  const hasName = () => {
    return typeof label === 'string' && label !== ''
  }

  const name = () => {
    if (hasName()) {
      return `<span class=\"name\">` + label + `</span>`
    }
    return ''
  }

  const optionalName = (display: boolean) => {
    if (display) {
      return name()
    }
    return ''
  }

  const controlStyle = String.raw`
    div.${controlClass}.control {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      justify-content: ${hasName() ? 'space-between' : 'center'};
      align-items: center;

      height: 100%;
      width: 100%;
      position: relative;

      overflow: hidden;
    }`

  const labelStyle = String.raw`
    div.${controlClass} > span.name {
      text-align: ${labelAlignment};
      margin-left: 6px;
      margin-right: 6px;
      overflow-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
    }`

  const style = String.raw`<style>
      ${controlStyle}
      ${labelStyle}
    </style>`

  const allElements = String.raw`
    <div class="${controlClass} control">
      ${optionalName(labelPlacement !== 'right')}
      ${ledElement(controlClass, ledId, color, glow, sizeMultiplier)}
      ${optionalName(labelPlacement === 'right')}
    </div>`
  return style + allElements
}
