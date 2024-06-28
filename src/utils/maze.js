const generate = (grid = [], ROWS = 40, COLS = 40) => {
    const EMPTY = 0;
    const WALL = 1;
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[0].length; j++) {
        grid[i][j].isWall = true;
      }
    }
  
    const lookup = (x, y) => {
      if (x < 0 || y < 0 || x >= COLS || y >= ROWS) {
        return {};
      }
      if (grid[y][x].isWall) return WALL;
      else return EMPTY;
    };
  
    const walls = [];
    const makePassage = (x, y) => {
      grid[y][x].isWall = false;
  
      const candidates = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 },
      ];
      for (const wall of candidates) {
        if (lookup(wall.x, wall.y) === WALL) {
          walls.push(wall);
        }
      }
    };
  
    makePassage((Math.random() * ROWS) | 0, (Math.random() * COLS) | 0);
  
    while (walls.length !== 0) {
      const { x, y } = walls.splice((Math.random() * walls.length) | 0, 1)[0];
  
      const left = lookup(x - 1, y);
      const right = lookup(x + 1, y);
      const top = lookup(x, y - 1);
      const bottom = lookup(x, y + 1);
  
      if (left === EMPTY && right === WALL) {
        grid[y][x].isWall = false;
        makePassage(x + 1, y);
      } else if (right === EMPTY && left === WALL) {
        grid[y][x].isWall = false;
        makePassage(x - 1, y);
      } else if (top === EMPTY && bottom === WALL) {
        grid[y][x].isWall = false;
        makePassage(x, y + 1);
      } else if (bottom === EMPTY && top === WALL) {
        grid[y][x].isWall = false;
        makePassage(x, y - 1);
      }
    }
  
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (grid[i][j].isStart || grid[i][j].isFinish) {
          grid[i][j].isWall = false;
          if (i > 0) grid[i - 1][j].isWall = false;
          if (i < ROWS - 1) grid[i + 1][j].isWall = false;
          if (j > 0) grid[i][j - 1].isWall = false;
          if (j < COLS - 1) grid[i][j + 1].isWall = false;
        }
      }
    }
  
    return grid;
  };
  
  export default generate;