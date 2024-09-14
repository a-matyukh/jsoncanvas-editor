import { derived, get, writable } from "svelte/store"
import * as Canvas from './jsoncanvas'
import type { JSONCanvas, Node } from './jsoncanvas'

let states = writable<JSONCanvas[]>([Canvas.create()])

export let current_state_index = writable<number>(0)
export let current_state = derived([states, current_state_index], ([$states, $current_state_index]) => $states[$current_state_index])

export let is_empty = derived(states, ($states) => $states.length === 0)
export let is_first_state = derived(current_state_index, ($current_state_index) => $current_state_index === 0)
export let is_last_state = derived([states, current_state_index], ([$states, $current_state_index]) => $current_state_index === $states.length - 1)

export function add(state: JSONCanvas) {
    if (!get(is_last_state)) {
        states.update(s => [...s, JSON.parse(JSON.stringify(get(current_state)))])
    }
    states.update(s => [...s, structuredClone(state)])
    current_state_index.set(get(states).length - 1)
}
export function undo() {
    if (!get(is_first_state)) current_state_index.update(i => i - 1)
}
export function redo() {
    if (!get(is_last_state)) current_state_index.update(i => i + 1)
}

////////////////////////

export let selected_node_id = derived(current_state, ($current_state) => $current_state.nodes.at(-1)?.id || undefined)
// export let selected_node_id = writable<string | undefined>()
// export const select = (id: string | undefined) => selected_node_id.set(id)

////////////////////////

// Предоставляет адаптированную для svelte-flow структуру
interface SvelteFlowNode {
    id: string
    position: { x: number, y: number },
    data: { label: string }
}
export const nodesConverter = (nodes: Node[]): SvelteFlowNode[] => nodes.map(n => ({
    id: n.id,
    position: { x: n.x, y: n.y },
    width: n.width,
    height: n.height,
    data: { label: n.text },
}))

export let nodes = writable<SvelteFlowNode[]>([])
current_state.subscribe(state => {
    nodes.set(nodesConverter(state.nodes))
    // selected_node_id.set(state.nodes.at(-1).id)
})