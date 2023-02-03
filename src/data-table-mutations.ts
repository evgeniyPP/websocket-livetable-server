import { DataTable, TableShift } from './data-table';
import { getRandomInt, getRandomSentence } from './helpers';

interface MutationConfig {
  minCount: number;
  maxCount: number;
}

export function insertRows(dataTable: DataTable, { minCount, maxCount }: MutationConfig) {
  const insertedRowsCount = getRandomInt(minCount, maxCount);
  const rows = new Array(insertedRowsCount).fill('').map(getRandomSentence);

  dataTable.insert(rows);
}

export function deleteRows(dataTable: DataTable, { minCount, maxCount }: MutationConfig) {
  const table = dataTable.getTable();
  const deletedRowsCount = getRandomInt(minCount, maxCount);

  let deletedRowsIndices: number[] = [];

  if (deletedRowsCount >= table.length) {
    deletedRowsIndices = table.map(item => item.id);
  } else {
    while (deletedRowsIndices.length < deletedRowsCount) {
      const id = table[Math.floor(Math.random() * table.length)].id;
      if (!deletedRowsIndices.includes(id)) deletedRowsIndices.push(id);
    }
  }

  dataTable.delete(deletedRowsIndices);
}

export function updateRows(dataTable: DataTable, { minCount, maxCount }: MutationConfig) {
  const table = dataTable.getTable();
  const updatedRowsCount = getRandomInt(minCount, maxCount);

  let updatedRowsIndices: number[] = [];

  if (updatedRowsCount >= table.length) {
    updatedRowsIndices = table.map(item => item.id);
  } else {
    while (updatedRowsIndices.length < updatedRowsCount) {
      const id = table[Math.floor(Math.random() * table.length)].id;
      if (!updatedRowsIndices.includes(id)) updatedRowsIndices.push(id);
    }
  }

  const updatedData = updatedRowsIndices.map(id => ({ id, text: getRandomSentence() }));
  dataTable.update(updatedData);
}

export function moveRows(dataTable: DataTable, { minCount, maxCount }: MutationConfig) {
  const tableLength = dataTable.getTable().length;

  if (tableLength < 2) return;

  const movedRowsCount = getRandomInt(minCount, maxCount);
  const shifts: TableShift[] = [];

  while (shifts.length < movedRowsCount) {
    const to = Math.floor(Math.random() * tableLength);
    const from = Math.floor(Math.random() * tableLength);
    if (to !== from) shifts.push({ to, from });
  }

  dataTable.move(shifts);
}

export function startTableMutations(
  table: DataTable,
  {
    insertPeriod,
    deletePeriod,
    updatePeriod,
    movePeriod,
  }: {
    insertPeriod: number;
    deletePeriod: number;
    updatePeriod: number;
    movePeriod: number;
  }
) {
  setInterval(updateRows, updatePeriod, table, { minCount: 1, maxCount: 5 });
  setInterval(moveRows, movePeriod, table, { minCount: 1, maxCount: 5 });
  setInterval(insertRows, insertPeriod, table, { minCount: 1, maxCount: 5 });
  setTimeout(() => {
    setInterval(deleteRows, deletePeriod, table, { minCount: 1, maxCount: 5 });
  }, insertPeriod / 2);
}
