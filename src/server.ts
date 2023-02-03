import WebSocket from 'ws';

import { DataTable } from './data-table';
import { insertRows, startTableMutations } from './data-table-mutations';

const table = new DataTable();
insertRows(table, { minCount: 10, maxCount: 10 });
startTableMutations(table, {
  insertPeriod: 10000,
  deletePeriod: 10000,
  updatePeriod: 10000,
  movePeriod: 10000,
});

const server = new WebSocket.Server({ port: 3001 });
server.on('connection', client => {
  console.log('client is connected');
  client.send(JSON.stringify([{ type: 'data', data: table.getTable() }]));
});

const onTableChange = (changes: { type: string; data: unknown }[]) => {
  console.clear();
  console.table(table.getTable());

  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(changes));
    }
  });
};

table.on('insert', data => {
  onTableChange([{ type: 'insert', data }]);
});

table.on('update', data => {
  onTableChange([{ type: 'update', data }]);
});

table.on('delete', data => {
  onTableChange([{ type: 'delete', data }]);
});

table.on('move', data => {
  onTableChange([{ type: 'move', data }]);
});
