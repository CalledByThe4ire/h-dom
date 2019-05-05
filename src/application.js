import '@babel/polyfill';
import _ from 'lodash';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default (randomize = _.shuffle) => {const defaultCellIndex = 3;
  const defaultRowIndex = 3;
  let currentPosition = { cellIndex: defaultCellIndex, rowIndex: defaultRowIndex };
  const root = document.querySelector('.gem-puzzle');
  const tableEl = document.createElement('table');
  tableEl.className = 'table-bordered';
  document.addEventListener('keyup', (e) => {
    let newPosition;
    const { cellIndex, rowIndex } = currentPosition;
    switch (e.key) {
      case 'ArrowLeft':
        newPosition = { ...currentPosition, cellIndex: cellIndex + 1 };
        break;
      case 'ArrowUp':
        newPosition = { ...currentPosition, rowIndex: rowIndex + 1 };
        break;
      case 'ArrowRight':
        newPosition = { ...currentPosition, cellIndex: cellIndex - 1 };
        break;
      case 'ArrowDown':
        newPosition = { ...currentPosition, rowIndex: rowIndex - 1 };
        break;
      default:
        return;
    }
    const row = tableEl.rows.item(newPosition.rowIndex);
    if (row) {
      const cell = row.cells.item(newPosition.cellIndex);
      if (cell) {
        const point = tableEl.rows.item(rowIndex).cells.item(cellIndex);
        point.textContent = cell.textContent;
        point.classList.remove('table-active');
        cell.textContent = '';
        cell.classList.add('table-active');
        currentPosition = newPosition;
      }
    }
  });
  root.append(tableEl);
  const randomValues = randomize(values);
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === defaultCellIndex && j === defaultRowIndex) {
        cell.classList.add('table-active');
      }
      cell.textContent = randomValues[i + (j * 4)];
    }
  }
};
