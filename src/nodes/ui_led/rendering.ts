import { control } from './shared/rendering'
import { LEDNodeDef } from './types'

// TODO: switch from _ to - to ensure we don't ever collide with any class and to make more readable as different than a description (led_container vs led-31343, etc)
export const composeLEDElementIdTemplate = (): string => {
  return String.raw`led_{{$id}}`
}
export const controlClassTemplate = String.raw`led_{{$id}}`

/**
 * Generate our dashboard HTML code
 * @param {object} config - The node's config instance
 * @param {object} ledStyle - Style attribute of our LED span in in-line CSS format
 */
export const HTML = (
  config: LEDNodeDef,
  color: string,
  glow: boolean,
  sizeMultiplier: number
): string => {
  // text-align: ` + config.labelAlignment + `

  return control(
    controlClassTemplate,
    composeLEDElementIdTemplate(),
    config.label,
    config.labelPlacement || 'left',
    config.labelAlignment || 'left',
    config.shape || 'circle',
    color,
    glow,
    sizeMultiplier
  )
}
