import { curry, pipe } from 'ramda'
import { createStore } from 'redux'

let reduxStore = undefined
if (process.env.NODE_ENV === 'development') {
  reduxStore = createStore(
    (state, action) => {
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

export const dlog = curry(function (name, actionReducer) {
  return pipe(actionReducer, (state) => {
    if (process.env.NODE_ENV === 'development') {
      reduxStore.dispatch({
        type: name,
        payload: state,
      })
    }
    return state
  })
})
