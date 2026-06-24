export function getComponents(graph, nodes) {

    const visited = new Set();
    const components = [];

    function dfs(node, component) {

        visited.add(node);
        component.push(node);

        for (const child of graph[node] || []) {
            if (!visited.has(child)) {
                dfs(child, component);
            }
        }

        for (const parent in graph) {
            if ((graph[parent] || []).includes(node)) {
                if (!visited.has(parent)) {
                    dfs(parent, component);
                }
            }
        }
    }

    for (const node of nodes) {

        if (!visited.has(node)) {

            const component = [];

            dfs(node, component);

            components.push(component);
        }
    }

    return components;
}