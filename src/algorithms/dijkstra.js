const getNeighbours = (grid, node) => {
    const ROWS = grid.length;
    const COLS = grid[0].length;
  
    const { row, col } = node;
    
    const neighbours = [];
    
    const candidates = [
      { i: row - 1, j: col },
      { i: row + 1, j: col },
      { i: row, j: col - 1 },
      { i: row, j: col + 1 },
    ];
  
    for (const { i, j } of candidates) {
      if (i >= 0 && i < ROWS && j >= 0 && j < COLS && !grid[i][j].isWall && !grid[i][j].isVisited) neighbours.push(grid[i][j]);
    }
  
    return neighbours;
  };
  
  const calculatePath = (finishNode) => {
    const path = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return path;
  };
  
  const dijkstra = (grid = [], startNode, finishNode) => {
    const unvisitedNodes = [];
    const visitedNodesInOrder = [];
  
    startNode.distance = 0;
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[0].length; j++) {
        unvisitedNodes.push(grid[i][j]);
      }
    }
  
    while(unvisitedNodes.length) {
      unvisitedNodes.sort((a,b) => a.distance - b.distance);
      const node = unvisitedNodes.shift();
  
      if (node === finishNode) return [visitedNodesInOrder, calculatePath(finishNode)];
  
      if(node.isWall) continue;
  
      node.isVisited = true;
      visitedNodesInOrder.push(node);
  
      const neighbours = getNeighbours(grid, node);
      for(const neighbour of neighbours) {
        neighbour.distance = node.distance + 1;
        neighbour.previousNode = node;
      }
    }
  
    return [visitedNodesInOrder, calculatePath(finishNode)];
  }
  
  export default dijkstra;