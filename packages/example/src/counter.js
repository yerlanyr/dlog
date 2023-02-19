import { map, merge, startWith } from 'rxjs'
import { dec$, inc$ } from './intents.js'
import { dlog } from 'dlog'

const incAction$ = inc$.pipe(
  map(() => (state) => state.update('counter', (v) => v + 1))
)
const decAction$ = dec$.pipe(
  map(() => (state) => state.update('counter', (v) => v - 1))
)

export const counter$ = merge(
  incAction$.pipe(map(dlog('Inc counter'))),
  decAction$.pipe(map(dlog('Dec counter')))
).pipe(startWith((state) => state.set('counter', 0)))
