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
  
  const calculateCost = (node1, node2) => Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
  
  const astar = (grid = [], startNode, finishNode) => {
    const closedlist = [];
    const openlist = [];
  
    startNode.cost = {
      F: 0,
      G: 0,
      H: 0,
    };
  
    openlist.push(startNode);
  
    while (openlist.length) {
      openlist.sort((a, b) => a.cost.F - b.cost.F);
      const node = openlist.shift();
  
      closedlist.push(node);
  
      if (node.isWall) continue;
  
      if (node === finishNode) return [closedlist, calculatePath(finishNode)];
  
      const neighbours = getNeighbours(grid, node);
  
      for (const neighbour of neighbours) {
        neighbour.isVisited = true;
        if (closedlist.includes(neighbour)) continue;
  
        neighbour.cost.G = node.cost.G + calculateCost(neighbour, node);
        neighbour.cost.H = calculateCost(neighbour, finishNode);
  
        neighbour.cost.F = neighbour.cost.G + neighbour.cost.H;
  
        if (openlist.includes(neighbour)) {
          if(neighbour.cost.G > node.cost.G) continue;
        }
  
        neighbour.previousNode = node;
        openlist.push(neighbour);
      }
    }
    return [closedlist, calculatePath(finishNode)];
  }
  
  export default astar;