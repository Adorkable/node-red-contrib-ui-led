export declare const WebKitMutationObserver: MutationObserver

export type ObserveCallback = (event: Event | MutationRecord[]) => void

// Based on: https://stackoverflow.com/a/14570614
export const observeDOMFactory = (): ((
  observe: Document,
  callback: ObserveCallback
) => void) => {
  const MutationObserver = window.MutationObserver || WebKitMutationObserver

  return (observe: Document, callback: ObserveCallback) => {
    if (!observe || !(observe.nodeType === 1)) {
      return
    }

    if (MutationObserver) {
      const observer = new MutationObserver((mutations, observer) => {
        observer.disconnect()
        callback(mutations)
      })

      observer.observe(observe, {
        childList: true,
        subtree: true
      })
    } else if (window.addEventListener !== undefined) {
      const options = {
        capture: false,
        once: true
      }
      observe.addEventListener('DOMNodeInserted', callback, options)
      observe.addEventListener('DOMNodeRemoved', callback, options)
    }
  }
}
