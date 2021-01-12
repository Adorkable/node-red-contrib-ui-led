declare let WebKitMutationObserver: any

// Based on: https://stackoverflow.com/a/14570614
export const observeDOMFactory = () => {
  const MutationObserver = window.MutationObserver || WebKitMutationObserver

  return (
    observe: any,
    callback: (event: Event | MutationRecord[]) => void
  ) => {
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
