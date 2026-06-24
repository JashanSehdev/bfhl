import { validateEdges } from "../utils/validateEdges.js";
import { filterMultiParent } from "../utils/filterMultiParent.js";
import { buildGraph } from "../utils/buildGraph.js";
import { detectCycle } from "../utils/detectCycle.js";
import { getComponents } from "../utils/getComponents.js";
import { findRoot } from "../utils/findRoot.js";
import { buildTree } from "../utils/buildTree.js";
import { calculateDepth } from "../utils/calculateDepth.js";


export const processHierarchy = (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      message: "data must be an array",
    });
  }

  const { validEdges, invalidEntries, duplicateEdges } = validateEdges(data);

  const filteredEdges = filterMultiParent(validEdges);
  const graphData = buildGraph(filteredEdges);

  const components = getComponents(graphData.graph, graphData.nodes);

  const hierarchies = [];

for (const component of components) {

    const hasCycle = detectCycle(graphData.graph, component);

    const root = findRoot(component, graphData.indegree);

    if (hasCycle) {

        hierarchies.push({
            root,
            tree: {},
            has_cycle: true
        });

        continue;
    }

    const tree = buildTree(graphData.graph, root);

    const depth = calculateDepth(graphData.graph, root);

    hierarchies.push({
        root,
        tree,
        depth
    });
}

let totalTrees = 0;
let totalCycles = 0;

let largestDepth = -1;
let largestTreeRoot = "";

for (const hierarchy of hierarchies) {

    if (hierarchy.has_cycle) {
        totalCycles++;
        continue;
    }

    totalTrees++;

    if (
        hierarchy.depth > largestDepth ||
        (
            hierarchy.depth === largestDepth &&
            hierarchy.root < largestTreeRoot
        )
    ) {
        largestDepth = hierarchy.depth;
        largestTreeRoot = hierarchy.root;
    }
}

const summary = {
    total_trees: totalTrees,
    total_cycles: totalCycles,
    largest_tree_root: largestTreeRoot
};

  return res.json({
    user_id: "jashansehdev_27052005",
    email_id: "jashan0613.be23@chitkara.edu.in",
    college_roll_number: "2310990613",

    hierarchies,

    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,

    summary
});
};
