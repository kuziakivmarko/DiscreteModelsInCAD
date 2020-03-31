const Graph = require('./graph');
const Forest = require('./forest');
const data = require('./data');

start(new Graph(data));

function start(graph = new Graph()) {
  const forest = new Forest();
  graph.sortedPoints().forEach(graphPoint => {
    if (!forest.hasPoint(graphPoint)) {
      let minEdge = undefined;
      graph.edges.forEach(edge => {
        if (edge.hasPoint(graphPoint) && (!minEdge || edge.weight < minEdge.weight)) {
          minEdge = edge;
        }
      });
      if (minEdge) {
        forest.addEdge(minEdge);
      }
    }
  });

  let resultGraph = forest.toTree(graph);

  function getPrintedResult(resultGraph) {
    return resultGraph.edges.map(edge => `(${edge.a}-${edge.weight}-${edge.b})`).join(' => ');
  }

  console.log('result: ', getPrintedResult(resultGraph));
  console.log('result tree weight: ', resultGraph.getWeight());
}
