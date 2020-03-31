const ds = require('datascript');
const R = require('ramda');

// input: list of edge (source, target) node id's [ [n1, n2], ... ]
const empty = ds.empty_db();

function mkDB (edges) {
    const content = edges.map(function (edge, idx) {
        const s = edge[0];
        const t = edge[1];
        return { ':db/id': idx + 1, s: -s, t: -t }
    });
    return ds.db_with(empty, content)
}

function mkQuery (edges) {
    // ?n1 ?n2 ...
    const nstr = R.pipe(
        R.flatten(),
        R.uniq(),
        R.map(n => `?n${n}`),
        R.join(' ')
    )(edges);

    // ?e1 ?e2 ...
    const estr = R.pipe(
        R.mapObjIndexed((edge, i) => `?e${i + 1}`),
        R.values(),
        R.join(' ')
    )(edges);

    // [?e1 "s" ?n1] [?e1 "t" ?n2] ...
    const topostr = R.pipe(
        R.mapObjIndexed(function (edge, idx) {
            const s = edge[0];
            const t = edge[1];
            const i = idx + 1;
            return `[?e${i} "s" ?n${s}] [?e${i} "t" ?n${t}] `
        }),
        R.values(),
        R.join(' ')
    )(edges);
    return `[:find ${nstr} ${estr} :in $ :where ${topostr}]`
}

// this trick only works because we use negative nrs for nodes
// TODO still wondering if I'm checking everything though... prob. not
function isPermutation (assignment) {
    return R.equals(
        R.length(R.uniq(assignment)),
        R.length(assignment)
    )
}

/** usage:
 const graphCheck = require('graphcheck')
 const g1 = [[1,2],[2,3],[1,3]]
 const g2 = [[4,3],[4,21],[21,3]]
 (graphCheck(g1, g2).length > 0) // => true
 */
module.exports = function (edges_graph1, edges_graph2) {
    const db = mkDB(edges_graph1);
    const q = mkQuery(edges_graph2);
    // console.log(q)
    // we consider the graphs similar if we can find at least one assigment
    // without overlap
    return R.filter(isPermutation, ds.q(q, db))
};
