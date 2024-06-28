import React, { useEffect, useState } from "react";
import astar from "./algorithms/astar";
import bfs from "./algorithms/bfs";
import dfs from "./algorithms/dfs";
import dijkstra from "./algorithms/dijkstra";
import ComplexityTable from "./components/ComplexityTable";
import Grid from "./components/Grid";
import generate from "./utils/maze";

const ROWS = 40;
const COLS = 40;
const SPEED = 10;

const App = () => {
  const [grid, setGrid] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(2);
  const [startNodeCol, setStartNodeCol] = useState(2);
  const [finishNodeRow, setFinishNodeRow] = useState(ROWS - 2);
  const [finishNodeCol, setFinishNodeCol] = useState(COLS - 2);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [modifyingState, setModifyingState] = useState('wall');
  const [algorithmTimes, setAlgorithmTimes] = useState({
    bfs: 0,
    dfs: 0,
    dijkstra: 0,
    astar: 0,
  });

  const handleNodeOperation = (row, col) => {
    const _grid = grid.slice();
    if (modifyingState === 'start') {
      const node = _grid[row][col];
      const startNode = _grid[startNodeRow][startNodeCol];

      if (!node.isWall || !node.isFinish) {
        startNode.isStart = false;
        node.isStart = true;

        setStartNodeRow(row);
        setStartNodeCol(col);
      }
    } else if (modifyingState === 'finish') {
      const node = _grid[row][col];
      const finishNode = _grid[finishNodeRow][finishNodeCol];

      if (!node.isWall || !node.isStart) {
        finishNode.isFinish = false;
        node.isFinish = true;

        setFinishNodeRow(row);
        setFinishNodeCol(col);
      }
    } else if (modifyingState === 'wall') {
      const node = _grid[row][col];
      node.isWall = !node.isWall;
    }

    setGrid(_grid);
  }

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === startNodeRow && col === startNodeCol,
      isFinish: row === finishNodeRow && col === finishNodeCol,
      isWall: false,
      isVisited: false,
      previousNode: null,
      distance: Infinity,
      cost: {
        F: Infinity,
        G: Infinity,
        H: Infinity,
      },
    }
  }

  const setUpGrid = () => {
    const _grid = new Array(COLS)
    for (let row = 0; row < ROWS; row++) {
      _grid[row] = new Array(ROWS);
      for (let col = 0; col < COLS; col++) {
        _grid[row][col] = createNode(row, col);
      }
    }

    setGrid(_grid);
  }

  const clearPath = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        const node = grid[i][j];
        node.isVisited = false;
        node.previousNode = null;
        const nodeObject = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeObject) {
          nodeObject.classList.remove('node--visited', 'node--shortest-path');
        }
      }
    }
  }

  const clearBoard = () => {
    setUpGrid();
    clearPath();
  }

  const resetAlgorithmTimes = () => {
    setAlgorithmTimes({
      bfs: 0,
      dfs: 0,
      dijkstra: 0,
      astar: 0,
    });
  }

  const generateMaze = () => {
    resetAlgorithmTimes(); // Reset algorithm times
    let maze = grid.slice();
    maze = generate(maze, ROWS, COLS);
    setGrid(maze);
  }

  const animatePath = (visitedNodesInOrder = [], nodesInShortestPathOrder = []) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish && !node.isWall) {
          const nodeObject = document.getElementById(`node-${node.row}-${node.col}`);
          if (nodeObject) {
            nodeObject.className = 'node node--visited';
          }
        }
      }, SPEED * i)
    }
    setTimeout(() => {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          if (!node.isStart && !node.isFinish && !node.isWall) {
            const nodeObject = document.getElementById(`node-${node.row}-${node.col}`);
            if (nodeObject) {
              nodeObject.className = 'node node--shortest-path';
            }
          }
        }, SPEED * i)
      }
    }, SPEED * visitedNodesInOrder.length)
  }

  const measureAlgorithmTime = (algorithmName, callback) => {
    const startTime = performance.now();
    callback();
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    setAlgorithmTimes(prevTimes => ({
      ...prevTimes,
      [algorithmName]: timeTaken,
    }));
  }

  const findShortestPath = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];

    if (algorithm === 'bfs') {
      measureAlgorithmTime('bfs', () => {
        const [visitedNodesInOrder, nodesInShortestPathOrder] = bfs(grid, startNode, finishNode);
        animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
      });
    } else if (algorithm === 'dfs') {
      measureAlgorithmTime('dfs', () => {
        const [visitedNodesInOrder, nodesInShortestPathOrder] = dfs(grid, startNode, finishNode);
        animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
      });
    } else if (algorithm === 'dijkstra') {
      measureAlgorithmTime('dijkstra', () => {
        const [visitedNodesInOrder, nodesInShortestPathOrder] = dijkstra(grid, startNode, finishNode);
        animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
      });
    } else if (algorithm === 'astar') {
      measureAlgorithmTime('astar', () => {
        const [visitedNodesInOrder, nodesInShortestPathOrder] = astar(grid, startNode, finishNode);
        animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
      });
    }
  }

  useEffect(() => {
    setUpGrid();
  }, [])

  return (
    <div className="container">
      <Grid grid={grid} onNodeClick={handleNodeOperation} />
      <div className="toolbar">
        <div className="buttons">
          <select className="select-algorithm" onChange={(e) => setAlgorithm(e.target.value)}>
            <option disabled value={""}>Select Algorithm</option>
            <option value={'bfs'}>BFS</option>
            <option value={'dfs'}>DFS</option>
            <option value={'dijkstra'}>Dijkstra</option>
            <option value={'astar'}>A* Search</option>
          </select>
          <button className="button-maze" onClick={() => generateMaze()}>Generate Maze</button>
          <button className="button-source" onClick={() => setModifyingState('start')}>Source</button>
          <button className="button-destination" onClick={() => setModifyingState('finish')}>Destination</button>
          <button className="button-wall" onClick={() => setModifyingState('wall')}>Wall</button>
          <button className="button-findpath" onClick={() => findShortestPath()}>Find Path</button>
          <button className="button-clearpath" onClick={() => clearPath()}>Clear Path</button>
          <button className="button-clearboard" onClick={() => clearBoard()}>Clear Board</button>
        </div>
        <ComplexityTable />
      </div>
      <div className="algorithm-times">
        <h3>Algorithm Execution Times:</h3>
        <ul>
          <li>BFS: {algorithmTimes.bfs.toFixed(2)} milliseconds</li>
          <li>DFS: {algorithmTimes.dfs.toFixed(2)} milliseconds</li>
          <li>Dijkstra: {algorithmTimes.dijkstra.toFixed(2)} milliseconds</li>
          <li>A*: {algorithmTimes.astar.toFixed(2)} milliseconds</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
