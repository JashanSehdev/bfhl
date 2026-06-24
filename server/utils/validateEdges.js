export function validateEdges(data) {
    const invalidEntries = [];
    const duplicateEdges = [];

    const seenEdges = new Set();
    const validEdges = [];

    const regex = /^[A-Z]->[A-Z]$/;

    for (let entry of data) {
        entry = entry.trim();

        if (!regex.test(entry)) {
            invalidEntries.push(entry);
            continue;
        }

        const [parent, child] = entry.split("->");

        if (parent === child) {
            invalidEntries.push(entry);
            continue;
        }

        if (seenEdges.has(entry)) {
            duplicateEdges.push(entry);
            continue;
        }

        seenEdges.add(entry);
        validEdges.push({
            parent,
            child
        });
    }

    return {
        validEdges,
        invalidEntries,
        duplicateEdges
    };
}