import { defineDb, defineTable, column } from 'astro:db';

const Contacts = defineTable({
  columns: {
    name: column.text(),
    email: column.text(),
    phone: column.text(),
    message: column.text()
  }
})

export default defineDb({
  tables: { Contacts },
})