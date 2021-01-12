import { Node, NodeMessage } from 'node-red'

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

  /** [convert] - callback to convert the value before sending it to the front-end */
  convert?: (value: any) => any

  /** [beforeEmit] - callback to prepare the message that is emitted to the front-end */
  beforeEmit?: (msg: NodeMessage & Record<string, any>, value: any) => any

  /** [convertBack] - callback to convert the message from front-end before sending it to the next connected node */
  convertBack?: (value: any) => any

  /** [beforeSend] - callback to prepare the message that is sent to the output */
  beforeSend?: (
    toSend: { payload: any },
    msg: NodeMessage & Record<string, any>
  ) => NodeMessage

  /** [initController] - callback to initialize in controller */
  initController?: any
}

export declare interface NodeRedUI<TCreds extends Record<string, unknown> = Record<string, unknown>> {
  addWidget(options: WidgetOptions<TCreds>): () => void
}
