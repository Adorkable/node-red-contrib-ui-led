import { EditorNodeInstance } from 'node-red'

export const label = function (this: EditorNodeInstance): string {
  return this.name || 'led'
}

export const labelStyle = function (this: EditorNodeInstance): string {
  return this.name ? 'node_label_italic' : ''
}
