import { EventEmitter } from 'events';

export interface TableRow {
  id: number;
  text: string;
}

export interface TableShift {
  from: number;
  to: number;
}

export class DataTable extends EventEmitter {
  private index = 0;
  private table: TableRow[] = [];

  getTable() {
    return this.table;
  }

  insert(data: string[], pos = this.table.length) {
    const insertedData = data.map(text => ({ id: this.getNewId(), text }));
    this.table.splice(pos, 0, ...insertedData);
    this.emit('insert', { rows: insertedData, pos });
  }

  delete(indices: number[]) {
    this.table = this.table.filter(row => !indices.includes(row.id));
    this.emit('delete', indices);
  }

  update(rows: TableRow[]) {
    const updatedData: TableRow[] = [];

    rows.forEach(({ id, text }) => {
      const index = this.table.findIndex(row => row.id === id);

      if (index !== -1) {
        this.table[index].text = text;
        updatedData.push(this.table[index]);
      }
    });

    this.emit('update', updatedData);
  }

  move(shifts: TableShift[]) {
    shifts.forEach(shift => {
      this.table.splice(shift.to, 0, this.table.splice(shift.from, 1)[0]);
    });

    this.emit('move', shifts);
  }

  private getNewId(): number {
    return this.index++;
  }
}
