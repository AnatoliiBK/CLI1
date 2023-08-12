const { Command } = require('commander');
const program = new Command();

const contacts = require('./contacts');
// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allCntacts = await contacts.listContacts();
      break;

    case 'get':
      const oneContact = await contacts.getContactById(id);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
    .option("-a, --action, <type>")
    .option("-i, --id, <type>")
    .option("-n, --name, <type>")
    .option("-e, --email, <type>")
    .option("-p, --phone, <type>");

program.parse();

const options = program.opts();
invokeAction(options)