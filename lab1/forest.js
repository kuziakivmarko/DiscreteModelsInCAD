const Graph = require('./graph');

class Forest {

  constructor() {
    this.graphs = [];
  }

  addEdge(edge) {
    for (let i = 0; i < this.graphs.length; i++) {
      const graph = this.graphs[i];
      if (graph.includesEdgePoint(edge)) {
        graph.addEdge(edge);
        for (let j = i + 1; j < this.graphs.length; j++) {
          const otherGraph = this.graphs[j];
          if (otherGraph.pointsList.has(edge.a) || otherGraph.pointsList.has(edge.b)) {
            this._combine(graph, otherGraph);
            this.graphs.splice(j, 1);
            return;
          }
        }
        return;
      }
    }
    const newGraph = new Graph();
    newGraph.addEdge(edge);
    this.graphs.push(newGraph);
  }

  _combine(graph, otherGraph) {
    otherGraph.edges.forEach(edge => graph.addEdge(edge));
  }

  hasPoint(point) {
    return this.graphs.some(graph => graph.hasPoint(point));
  }

  toTree(graph) {
    while (this.graphs.length > 1) {
      const [firstPointList, ...restPointLists] = this.graphs.map(graph => graph.sortedPoints());
      let minEdge = undefined;

      graph.edges.forEach(edge => restPointLists.forEach(otherGraphPointsList =>
        otherGraphPointsList.forEach(point => firstPointList.forEach(firstGraphPointListPoint => {
          if (edge.hasPoint(firstGraphPointListPoint) && edge.hasPoint(point)
            && (!minEdge || edge.weight < minEdge.weight)) {
            minEdge = edge;
          }
        }))));

      if (minEdge) {
        this.addEdge(minEdge);
      } else {
        break;
      }
    }

    return this.graphs[0];
  }

}

module.exports = Forest;
