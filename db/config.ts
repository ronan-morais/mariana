import { column, defineDb, defineTable } from 'astro:db';

const Contatos = defineTable({
  columns: {
    id: column.number({primaryKey: true, autoIncrement: true}),
    nome: column.text(),
    email: column.text(),
    telefone: column.text(),
    assunto: column.text(),
    mensagem: column.text(),
  },
});

export default defineDb({
  tables: { Contatos },
})