// types
enum CanvasColor {
    RED = "red",
    ORANGE = "orange",
    YELLOW = "yellow",
    GREEN = "green",
    CYAN = "cyan",
    PURPLE = "purple"
}
export interface Node {
    id: string
    x: number
    y: number
    type: string
    text: string
    width: number
    height: number
    color?: CanvasColor
}
type EdgeSide = "top" | "right" | "bottom" | "left"
type EdgeEnd = "none" | "arrow"
interface Edge {
    id: string
    fromNode: string
    fromSide?: EdgeSide
    fromEnd?: EdgeEnd
    toNode: string
    toSide?: EdgeSide
    toEnd?: EdgeEnd
    color?: CanvasColor
    label?: string
}

export interface JSONCanvas {
    nodes: Node[]
    edges: Edge[]
}


/////// library

export const create = (): JSONCanvas => ({
    nodes: [],
    edges: []
})
const create_new_node = (payload?: object): Node => ({
    id: crypto.randomUUID(),
    type: 'text',
    text: 'Hello, World!',
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    ...payload
})

export const create_node = (canvas: JSONCanvas): JSONCanvas => {
    const new_node: Node = create_new_node()
    let clonedCanvas = structuredClone(canvas)
    clonedCanvas.nodes.push(new_node)
    return clonedCanvas
}
export const add_node = (canvas: JSONCanvas, node: Node): JSONCanvas => {
    let clonedCanvas = structuredClone(canvas)
    if (clonedCanvas.nodes.find(n => n.id === node.id)) {
        throw new Error("A node with the same ID already exists in this.nodes")
    }
    clonedCanvas.nodes.push(node)
    return clonedCanvas
}
export const patch_node = (canvas: JSONCanvas, id: string, payload: object): JSONCanvas => {
    let clonedCanvas = structuredClone(canvas)
    clonedCanvas.nodes = clonedCanvas.nodes.map(n => {
        if (n.id === id) n = {...n, ...payload}
        return n
    })
    return clonedCanvas
}
export const remove_node = (canvas: JSONCanvas, id: string): JSONCanvas => {
    let clonedCanvas = structuredClone(canvas)
    clonedCanvas.nodes = clonedCanvas.nodes.filter(n => n.id !== id)
    clonedCanvas.edges = clonedCanvas.edges.filter(e => e.fromNode !== id && e.toNode !== id)
    return clonedCanvas
}