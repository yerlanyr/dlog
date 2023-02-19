import { createStore$, flog } from '@zambezi/caballo-vivo'
import { Map } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { map } from 'rxjs/operators'
import { counter$ } from './counter.js'
import { dec$, inc$ } from './intents.js'

const Counter = ({ state }) => {
  const counterValue = state.get('counter')
  return (
    <>
      <button onClick={() => inc$.next()}>Increment</button>
      {counterValue}
      <button onClick={() => dec$.next()}>Decrement</button>
    </>
  )
}

window.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')
  const toView = (state) => (
    <div>
      <Counter state={state} />
    </div>
  )
  counter$
    .pipe(createStore$(Map()), flog('Render state'), map(toView)) // (6)
    .subscribe((resultTree) => ReactDOM.render(resultTree, rootEl))
})
