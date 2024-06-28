import Node from "./Node";

const Grid = ({ grid = [], onNodeClick }) => {
  return (
    <div id="grid" className="grid">
      {grid.map(_ => {
        return _.map(cell => {
          return (
            <Node key={`node-${cell.row}-${cell.col}`} {...cell} onNodeClick={onNodeClick} />
          )
        })
      })}
    </div>
  )
}

export default Grid;