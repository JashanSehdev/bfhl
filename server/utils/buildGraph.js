export function buildGraph(edges) {
    const graph = {};
    const indegree = {};
    const nodes = new Set();

    for (const { parent, child } of edges) {

        nodes.add(parent);
        nodes.add(child);

        if (!graph[parent]) {
            graph[parent] = [];
        }

        graph[parent].push(child);

        indegree[parent] ??= 0;
        indegree[child] ??= 0;

        indegree[child]++;
    }

    return {
        graph,
        indegree,
        nodes: [...nodes]
    };
}