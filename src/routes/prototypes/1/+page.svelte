<main>
    <header>
        <p>
            Actions: 
            <button on:click={add_node}>add_node</button>
            <button on:click={() => patch_node({text: "Wow!!!"})}>patch_node: edit</button>
            <button on:click={() => patch_node({x: 12, y: 34})}>patch_node: position</button>
            <button on:click={() => patch_node({width: 521, height: 193})}>patch_node: size</button>
            <button on:click={remove_node}>remove_node</button>
        </p>
        <p>
            History: 
            <button on:click={() => undo()} disabled={$is_first_state}>undo</button>
            {$current_state_index}
            <button on:click={() => redo()} disabled={$is_last_state}>redo</button>
        </p>
    </header>
    <article>
        <section>
            <SvelteFlow {nodes} {edges}>
                <Background />
                <Controls />
            </SvelteFlow>
        </section>
        <div>
            <pre>{JSON.stringify($current_state, null, 4)}</pre>
        </div>
    </article>
</main>

<style>
:global(.svelte-flow__attribution)  {
    opacity: 0;
}
:global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
}
header {
    padding: 10px 20px;
    border-bottom: 1px solid #f5f5f5;
}
main {
    height: 100vh;
}
article {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
section {
    height: 85vh;
}

</style>

<script lang="ts">
import { writable } from 'svelte/store'
import { SvelteFlow, Background, Controls } from '@xyflow/svelte'
import '@xyflow/svelte/dist/style.css'

import { add_node, patch_node, remove_node } from "./actions"
import { nodes, current_state, current_state_index, is_first_state, is_last_state, undo, redo } from "./store"
const edges = writable([])
</script>