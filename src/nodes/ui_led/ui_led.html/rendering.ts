import { EditorNodeInstance } from 'node-red'

export const label = function (this: EditorNodeInstance) {
  return this.name || 'led'
}

export const labelStyle = function (this: EditorNodeInstance) {
  return this.name ? 'node_label_italic' : ''
}
