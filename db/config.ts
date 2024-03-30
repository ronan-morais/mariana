import { column, defineDb, defineTable } from 'astro:db';

const Contatos = defineTable({
  columns: {
    id: column.number({primaryKey: true, autoIncrement: true}),
    name: column.text(),
    email: column.text(),
    phone: column.text(),
    message: column.text(),
  },
});

export default defineDb({
  tables: { Contatos },
})