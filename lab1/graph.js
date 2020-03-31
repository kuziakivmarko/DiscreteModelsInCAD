const Edge = require('./edge');

class Graph {

  constructor(edges) {
    this.edges = [];
    if (edges) {
      this.fillEdges(edges);
    }
    this.updatePointList();
  }

  addEdge(edge) {
    if (!this.edges.includes(edge)) {
      this.edges.push(edge);
      this.pointsList.add(edge.a);
      this.pointsList.add(edge.b);
    }
  }

  updatePointList() {
    this.pointsList = new Set();
    this.edges.forEach(edge => {
      this.pointsList.add(edge.a);
      this.pointsList.add(edge.b);
    });
  }

  _charLoop(callback, charFrom = 'A', charTo = 'Z') {
    const charFromCode = charFrom.charCodeAt(0);
    const charToCode = charTo.charCodeAt(0);
    const isReversed = charToCode < charFromCode;
    for (let current = charFromCode;
         isReversed ? current >= charToCode : current <= charToCode;
         isReversed ? current-- : current++) {
      const char = String.fromCodePoint(current);
      if (callback(char)) return;
    }
  }

  getStartPoint() {
    let point = undefined;
    this._charLoop((char) => {
      if (this.pointsList.includes(char)) return point = char;
    });
    return point || ' ';
  }

  getEndPoint() {
    let point = undefined;
    this._charLoop((char) => {
      if (this.pointsList.includes(char)) return point = char;
    }, 'Z', 'A');
    return point || ' ';
  }

  getAdjacentEdges(point) {
    const adjacentEdges = [];
    this.edges.forEach(el => {
      if (el.hasPoint(point)) {
        adjacentEdges.push(el);
      }
    });
    return adjacentEdges;
  }

  fillEdges(edges) {
    edges.forEach(edge => this.edges.push(new Edge(...edge)));
  }

  includesEdgePoint(edge) {
    return this.pointsList.has(edge.a) || this.pointsList.has(edge.b);
  }

  hasPoint(point) {
    return this.pointsList.has(point);
  }

  sortedPoints() {
    return Array.from(this.pointsList).sort();
  }

  getWeight() {
    return this.edges.reduce((acc, el) =>
      ({weight: acc.weight + el.weight}), ({weight: 0})).weight;
  }
}

module.exports = Graph;
