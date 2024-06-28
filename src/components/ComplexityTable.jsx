import React from "react";

const ComplexityTable = () => (
  <div className="complexity-table">
    <table>
      <thead>
        <tr>
          <th>Algorithm</th>
          <th>Time</th>
          <th>Space</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-algorithm">Dijkstras</td>
          <td>O(E + V&times;LogV)</td>
          <td>O(V)</td>
        </tr>
        <tr>
          <td className="text-algorithm">BFS</td>
          <td>
            O(V + E) = O(b<sup>d</sup>)
          </td>
          <td>
            O(V) = O(b<sup>d</sup>)
          </td>
        </tr>
        <tr>
          <td className="text-algorithm">DFS</td>
          <td>
            O(V + E) = O(b<sup>d</sup>)
          </td>
          <td>
            O(V) = O(b<sup>d</sup>)
          </td>
        </tr>
        <tr>
          <td className="text-algorithm">A* Search</td>
          <td>O(E)</td>
          <td>O(V)</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ComplexityTable;