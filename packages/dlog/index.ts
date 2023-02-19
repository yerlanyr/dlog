import { curry, pipe } from 'ramda'
import { Action, createStore, Store } from 'redux'
import type { compose, Middleware } from 'redux'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    __REDUX_DEVTOOLS_EXTENSION__?: (opts: {
      serialize: { options: { undefined: boolean; function: (fn: any) => any } }
    }) => Middleware<any>
  }
}

let reduxStore: Store | undefined = undefined
if (process.env.NODE_ENV === 'development') {
  reduxStore = createStore(
    (state, action?: Action & { payload?: any }) => {
      return action && action.payload
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({
        serialize: {
          options: {
            undefined: true,
            function: function (fn) {
              return fn.toString()
            },
          },
        },
      })
  )
}

/**
 * dlog function that allows log actions that are being dispatched from caballo vivo library using redux devtools
 * @example
 * incAction$.pipe(map(dlog('Increment action')))
 */
export const dlog = curry(function (name, actionReducer) {
  return pipe(actionReducer, (state) => {
    if (process.env.NODE_ENV === 'development') {
      reduxStore?.dispatch({
        type: name,
        payload: state,
      })
    }
    return state
  })
})
