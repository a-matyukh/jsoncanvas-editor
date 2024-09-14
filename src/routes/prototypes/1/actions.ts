import { get } from 'svelte/store'
import * as Canvas from './jsoncanvas'
import { current_state, add, selected_node_id } from "./store"

export function add_node() {
    const new_canvas = Canvas.create_node(get(current_state))
    add(new_canvas)
}

export function patch_node(payload: object) {
    const new_canvas = Canvas.patch_node(get(current_state), get(selected_node_id), payload)
    add(new_canvas)
}

export function remove_node() {
    const new_canvas = Canvas.remove_node(get(current_state), get(selected_node_id))
    add(new_canvas)
}