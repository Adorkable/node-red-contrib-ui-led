import { Node, NodeMessage } from 'node-red'
import { IChildScope } from '../angular'

export declare type Payload = any
export declare interface PayloadUpdate {
  update: true
  
  /**
   * if this update includes a new value
   */
  newPoint: boolean
  /**
   * updated value
   */
  updatedValues: Payload
} 

export declare interface UITemplateScope extends IChildScope {
  msg: NodeMessage | void

  send: (msg: NodeMessage) => void

  theme: Theme | void

  width: string | void
  height: string | void
  label: string | void

  flag: boolean | void

  $destroy: () => void
}

// TODO: fill out types: https://github.com/node-red/node-red-dashboard/blob/d3bbcd5e0b24d9f0cf1425e1790e3c9bfcc28f0d/src/services/events.js
export declare interface UiEvents {
  id: string
  connect: (onuiloaded: any, replaydone: any) => void
  emit: (event: any, msg: any) => void

  /**
   * @returns cancel function
   */
  on: (event: any, handler: any) => () => void
} 

export declare type Convert = (value: Payload, oldValue: Payload, msg: NodeMessage, controlStep: number) => Payload | PayloadUpdate | undefined

export declare type CustomMessage = NodeMessage & Record<string, any>

export declare interface BeforeEmitMessage extends CustomMessage {
  ui_control?: Record <string, any> | void
}
export declare interface Emit extends Record<string, any> {
  msg: Payload

  id?: number | undefined
} 
export declare type BeforeEmit = (msg: BeforeEmitMessage, value: Payload) => Emit

export declare type ConvertBack = (value: Payload) => Payload

export declare type BeforeSend = (
    toSend: { payload: Payload },
    msg: CustomMessage
  ) => NodeMessage | void

export declare type InitController = (scope: UITemplateScope, events: UiEvents) => void

export declare interface WidgetOptions<TCreds extends Record<string, unknown> = Record<string, unknown>> {
  /** [node] - the node that represents the control on a flow */
  node: Node<TCreds>

  /** format - HTML code of widget */
  format: string

  /** [group] - group name (optional if templateScope = 'global') */
  group?: string | void

  /** [width] - width of widget (default automatic) */
  width?: number | void

  /** [height] - height of widget (default automatic) */
  height?: number | void

  /** [order] - property to hold the placement order of the widget */
  order: number

  /** [templateScope] - scope of widget/global or local (default local) */
  templateScope?: 'global' | string | void

  /**
   *  [emitOnlyNewValues] - `boolean` (default true).
   * If true, it checks if the payload changed before sending it
   * to the front-end. If the payload is the same no message is sent.
   */
  emitOnlyNewValues?: boolean | void

  /**
   *  [forwardInputMessages] - `boolean` (default true).
   * If true, forwards input messages to the output
   */
  forwardInputMessages?: boolean | void

  /**
   * storeFrontEndInputAsState] - `boolean` (default true).
   * If true, any message received from front-end is stored as state
   */
  storeFrontEndInputAsState?: boolean | void

  /**
   * [persistantFrontEndValue] - `boolean` (default true).
   * If true, last received message is send again when front end reconnect.
   */
  persistantFrontEndValue?: boolean | void

  /** 
   * [convert] - callback to convert the value before sending it to the front-end 
   * @returns `Payload`, `PayloadUpdate` or `undefined`. If `undefined` is returned `oldValue` is used and marked as a new value
  */
  convert?: Convert | void

  /** [beforeEmit] - callback to prepare the message that is emitted to the front-end */
  beforeEmit?: BeforeEmit | void

  /** [convertBack] - callback to convert the message from front-end before sending it to the next connected node */
  convertBack?: ConvertBack | void

  /** [beforeSend] - callback to prepare the message that is sent to the output */
  beforeSend?: BeforeSend | void

  /** [initController] - callback to initialize in controller */
  initController?: InitController | void
}

export declare interface NodeRedUI<TCreds extends Record<string, unknown> = Record<string, unknown>> {
  addWidget(options: WidgetOptions<TCreds>): () => void
}

export declare interface GroupNodeDef {
  width: number,
  height: number
}

export declare interface GroupNodeInstance extends Node {
  config: GroupNodeDef
}

// TODO: fill in
export declare type Theme = any