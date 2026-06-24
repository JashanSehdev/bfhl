export function filterMultiParent(validEdges) {
    const childToParent = new Map();

    const filteredEdges = [];

    for (const edge of validEdges) {
        const { parent, child } = edge;

        if (childToParent.has(child)) {
            continue;
        }

        childToParent.set(child, parent);
        filteredEdges.push(edge);
    }

    return filteredEdges;
}