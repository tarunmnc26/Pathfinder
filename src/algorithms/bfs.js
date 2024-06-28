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
  
  const bfs = (grid = [], startNode, finishNode) => {
    const queue = [];
    const visitedNodesInOrder = [];
  
    startNode.isVisited = true;
    
    queue.push(startNode);
    while (queue.length) {
      const node = queue.shift();
      
      if (node === finishNode) return [visitedNodesInOrder, calculatePath(finishNode)];
      
      if (node.isWall) continue;
  
      const neighbours = getNeighbours(grid, node);
      for (const neighbour of neighbours) {
        queue.push(neighbour);
        neighbour.previousNode = node;
        neighbour.isVisited = true;
        visitedNodesInOrder.push(neighbour);
      }
    }
    return [visitedNodesInOrder, calculatePath(finishNode)];
  };
  
  export default bfs;