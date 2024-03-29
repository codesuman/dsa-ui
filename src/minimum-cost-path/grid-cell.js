import React from 'react';

function GridCell({ cost, cumulativeCost }) {
  return (
    <td>
      <div className="cell">
        {cost}
        {cumulativeCost !== undefined && (
          <div className="cumulative-cost">{cumulativeCost}</div>
        )}
      </div>
    </td>
  );
}

export default GridCell;
