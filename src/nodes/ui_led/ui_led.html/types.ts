import { EditorNodeInstance, EditorNodeProperties } from 'node-red'
import { LEDNodeOptions } from '../shared/types'

export interface LEDEditorNodeProperties
  extends EditorNodeProperties,
    LEDNodeOptions {}

export type LEDEditorNodeInstance = EditorNodeInstance<LEDEditorNodeProperties>
