import { LEDNodeDef } from './types'

/**
 * Generate our dashboard HTML code
 * @param {object} config - The node's config instance
 * @param {object} ledStyle - Style attribute of our LED span in in-line CSS format
 */
export const HTML = (config: LEDNodeDef, ledStyle: string): string => {
  // text-align: ` + config.labelAlignment + `
  const name = () => {
    if (typeof config.label === 'string' && config.label !== '') {
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

  return (
    String.raw`
        	<style>
				div.led_{{$id}} {
				    display: flex;
				    flex-direction: row;

				    justify-content: space-between;
			        align-items: center;

			        height: 100%;
				}
				div.led_{{$id}} > span.led {
				    width: 24px;
				    height: 24px;
				    border-radius: 50%;
				    margin: 6px;
				}
				div.led_{{$id}} > span.name {
					flex-grow: 1;
					text-align: ` +
    config.labelAlignment +
    `;
				    margin-` +
    config.labelPlacement +
    `: 6px;
				}
			</style>
			<div class="led_{{$id}}">
				` +
    optionalName(config.labelPlacement !== 'right') +
    `
				<span class="led" id="led_{{$id}}" style="` +
    ledStyle +
    `"></span>
				` +
    optionalName(config.labelPlacement === 'right') +
    `
			</div>`
  )
}

export const ledStyle = (color: string, glow: boolean): string => {
  if (glow) {
    return (
      `background-color: ` +
      color +
      `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` +
      color +
      ` 0 -1px 4px, ` +
      color +
      ` 0 0px 12px, ` +
      color +
      ` 0 0px 12px;`
    )
  } else {
    // TODO: duplicate code because of execution scope, fix this shit :|
    return (
      `background-color: ` +
      color +
      `; box-shadow: inset #ffffff8c 0px 1px 2px, inset #00000033 0 -1px 1px 1px, inset ` +
      color +
      ` 0 -1px 4px;`
    )
  }
}
