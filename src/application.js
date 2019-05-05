import '@babel/polyfill';

const values = [8, 3, 2, 9, 11, 15, 5, 1, 7, 6, 13, 4, 12, 10, 14];

const generatePlayingField = () => {
  const tableEl = document.createElement('table');

  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === 3 && j === 3) {
        cell.classList.add('table-active');
      } else {
        cell.textContent = values[i + j * 4];
      }
    }
  }
  return tableEl;
};

export default () => {
  const makeStep = (c) => {
    // cell
    const cell = c;
    const { cellIndex } = cell;

    // row
    const row = cell.parentElement;
    const { rowIndex } = row;

    // table's body
    const rows = row.closest('tbody').rows;
    const { cells } = row;

    // cell' siblings
    let leftSiblingCell = null;
    let rightSiblingCell = null;
    let topSiblingCell = null;
    let bottomSiblingCell = null;

    if (cells[cellIndex - 1]) {
      leftSiblingCell = rows[rowIndex].cells[cellIndex - 1];
    }

    if (cells[cellIndex + 1]) {
      rightSiblingCell = rows[rowIndex].cells[cellIndex + 1];
    }

    if (cells[rowIndex - 1]) {
      topSiblingCell = rows[rowIndex - 1].cells[cellIndex];
    }

    if (cells[rowIndex + 1]) {
      bottomSiblingCell = rows[rowIndex + 1].cells[cellIndex];
    }

    const isActive = cell => cell.classList.contains('table-active');
    const setData = (currentCell, siblingCell) => {
      siblingCell.classList.remove('table-active');
      siblingCell.textContent = currentCell.textContent;

      currentCell.textContent = '';
      currentCell.classList.add('table-active');
    };

    if (rightSiblingCell && isActive(rightSiblingCell)) {
      setData(cell, rightSiblingCell);
    }

    if (leftSiblingCell && isActive(leftSiblingCell)) {
      setData(cell, leftSiblingCell);
    }

    if (topSiblingCell && isActive(topSiblingCell)) {
      setData(cell, topSiblingCell);
    }

    if (bottomSiblingCell && isActive(bottomSiblingCell)) {
      setData(cell, bottomSiblingCell);
    }
  };
  const clickHandler = (evt) => {
    const { target } = evt;
    makeStep(target);
  };
  document.querySelector('.gem-puzzle').append(generatePlayingField());
  document.addEventListener('click', clickHandler);
};
