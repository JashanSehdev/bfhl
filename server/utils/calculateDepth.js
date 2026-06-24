export function calculateDepth(graph, root) {

    function dfs(node) {

        const children = graph[node] || [];

        if (children.length === 0) {
            return 1;
        }

        let maxDepth = 0;

        for (const child of children) {
            maxDepth = Math.max(maxDepth, dfs(child));
        }

        return maxDepth + 1;
    }

    return dfs(root);
}