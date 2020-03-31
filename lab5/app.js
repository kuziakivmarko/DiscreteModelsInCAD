const computeIsomorphisms = require('graph-isomorphisms');

const G = [[1, 2], [2, 3], [3, 5], [5, 6], [6, 1]];
console.log('Graph A-A is a isomorphic:', computeIsomorphisms(G, G).length === 5);

const I = [[42, 666], [666, 1], [1, 33], [33, 44], [44, 42]];
console.log('Graph A-B is a isomorphic:', computeIsomorphisms(G, I).length > 0);