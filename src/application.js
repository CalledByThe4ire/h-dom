import '@babel/polyfill';
import _ from 'lodash';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const generatePlayingField = (data) => {
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
        cell.textContent = data[i + j * 4];
      }
    }
  }
  return tableEl;
};

export default (randomize = _.shuffle) => {
  document
    .querySelector('.gem-puzzle')
    .append(generatePlayingField(randomize(values)));

  const table = document.querySelector('.table-bordered');

  const model = {
    activeCellCoords: {
      rowIndex: 3,
      cellIndex: 3,
    },
  };

  const getCell = (coords) => {
    const { rowIndex, cellIndex } = coords;
    return table.rows[rowIndex].cells[cellIndex];
  };

  const updateView = () => {
    const activeCell = table.querySelector('.table-active');
    // eslint-disable-next-line
    const newCell = getCell(proxiedModel.activeCellCoords);
    activeCell.textContent = newCell.textContent;
    newCell.textContent = '';
    activeCell.classList.remove('table-active');
    newCell.classList.add('table-active');
  };

  const handler = {
    set: (target, prop, newValue) => {
      if (prop in target) {
        target[prop] = newValue; // eslint-disable-line no-param-reassign
        updateView();
        return true;
      }
      return false;
    },
  };

  const proxiedModel = new Proxy(model, handler);

  const updateModel = ({ key }) => {
    const updateModelRow = (
      flag,
      activeCell = table.querySelector('.table-active'),
    ) => {
      const activeRow = activeCell.parentElement.rowIndex;
      let calculatedRow = null;

      if (flag === 'up') {
        calculatedRow = activeRow + 1;
      } else if (flag === 'down') {
        calculatedRow = activeRow - 1;
      }

      if (table.rows[calculatedRow]) {
        const newCellCoords = {
          ...proxiedModel.activeCellCoords,
          rowIndex: calculatedRow,
        };
        proxiedModel.activeCellCoords = newCellCoords;
      }
    };

    const updateModelCell = (
      flag,
      activeCell = table.querySelector('.table-active'),
    ) => {
      let siblingCell = null;

      if (flag === 'left') {
        siblingCell = activeCell.cellIndex + 1;
      } else if (flag === 'right') {
        siblingCell = activeCell.cellIndex - 1;
      }

      if (activeCell.parentElement.cells[siblingCell]) {
        const newCellCoords = {
          ...proxiedModel.activeCellCoords,
          cellIndex: siblingCell,
        };
        proxiedModel.activeCellCoords = newCellCoords;
      }
    };

    switch (key) {
      case 'ArrowDown':
        updateModelRow('down');
        break;

      case 'ArrowUp':
        updateModelRow('up');
        break;

      case 'ArrowLeft':
        updateModelCell('left');
        break;

      case 'ArrowRight':
        updateModelCell('right');
        break;

      default:
        throw new Error('Invalid Case');
    }
  };

  document.addEventListener('keyup', updateModel);
};
