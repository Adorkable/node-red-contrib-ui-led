import 'angular'

// TODO: fill out
export declare interface IScopeWatcher {
  eq: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  exp: Function | string
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  get: Function
  last: string | void
}

// TODO: fill out
export declare interface IChildScope extends ng.IScope {
  $$ChildScope: ng.IScope | null
  $$childHead: ng.IScope | null
  $$childTail: ng.IScope | null

  $$listenerCount: any
  $$listeners: any

  $$nextSibling: IChildScope | null
  $$prevSibling: IChildScope | null

  $$suspended: boolean

  $$watchers: IScopeWatcher[]
  $$watchersCount: number
}