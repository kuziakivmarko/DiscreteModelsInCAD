const GraphEdge = require('./GraphEdge');
const Graph = require('./Graph');
const GraphVertex = require('./GraphVertex');
const eulerianPath = require('./eulerianPath');

function eulerianStart() {
  const vertexA = new GraphVertex('A');
  const vertexB = new GraphVertex('B');
  const vertexC = new GraphVertex('C');
  const vertexD = new GraphVertex('D');
  const vertexE = new GraphVertex('E');
  const vertexF = new GraphVertex('F');
  const vertexG = new GraphVertex('G');

  const edgeAB = new GraphEdge(vertexA, vertexB);
  const edgeAD = new GraphEdge(vertexA, vertexD);
  const edgeAE = new GraphEdge(vertexA, vertexE);
  const edgeBC = new GraphEdge(vertexB, vertexC);
  const edgeBD = new GraphEdge(vertexB, vertexD);
  const edgeBF = new GraphEdge(vertexB, vertexF);
  const edgeCE = new GraphEdge(vertexC, vertexE);
  const edgeCF = new GraphEdge(vertexC, vertexF);
  const edgeCG = new GraphEdge(vertexC, vertexG);
  const edgeDE = new GraphEdge(vertexD, vertexE);
  const edgeEF = new GraphEdge(vertexE, vertexF);
  const edgeFG = new GraphEdge(vertexF, vertexG);

  const graph = new Graph();

  graph
    .addEdge(edgeAB)
    .addEdge(edgeAD)
    .addEdge(edgeAE)
    .addEdge(edgeBC)
    .addEdge(edgeBD)
    .addEdge(edgeBF)
    .addEdge(edgeCE)
    .addEdge(edgeCF)
    .addEdge(edgeCG)
    .addEdge(edgeDE)
    .addEdge(edgeEF)
    .addEdge(edgeFG);

  const eulerianPathSet = eulerianPath(graph);
  console.log(eulerianPathSet.toString());;
}

eulerianStart();
