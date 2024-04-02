import { db, Contacts } from 'astro:db';

export default async function () {
  await db.insert(Contacts).values([
    { name: "Ronan Morais", email: "ronan95@gmail.com", phone: "123123", message: "teste de mensagem 1" },
    { name: "João Silva", email: "joao@gmail.com", phone: "456456", message: "teste de mensagem 2 " },
    { name: "Maria Santos", email: "maria@gmail.com", phone: "789789", message: "teste de mensagem 3 " },
    { name: "Pedro Almeida", email: "pedro@gmail.com", phone: "101101", message: "teste de mensagem 4 " },
    { name: "Ana Gomes", email: "ana@gmail.com", phone: "121312", message: "teste de mensagem 5 " },
    { name: "Carlos Costa", email: "carlos@gmail.com", phone: "141514", message: "teste de mensagem 6" },
  ])
}