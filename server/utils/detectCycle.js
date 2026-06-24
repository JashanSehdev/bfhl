export function detectCycle(graph, component) {

    const visited = new Set();
    const recStack = new Set();

    function dfs(node) {

        visited.add(node);
        recStack.add(node);

        for (const child of graph[node] || []) {

            if (!component.includes(child)) {
                continue;
            }

            if (!visited.has(child)) {
                if (dfs(child)) {
                    return true;
                }
            }
            else if (recStack.has(child)) {
                return true;
            }
        }

        recStack.delete(node);

        return false;
    }

    for (const node of component) {

        if (!visited.has(node)) {
            if (dfs(node)) {
                return true;
            }
        }
    }

    return false;
}