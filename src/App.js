import "./App.css";
import { v4 as uuid } from "uuid";
import { useState, useMemo, useCallback, useEffect } from "react";
import initialContacts from "./components/dataBase/contacts.json";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";

function App() {
  // const [contacts, setContacts] = useLS([initialContacts], []);
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem([initialContacts])) ?? []
  );

  const [filter, setFilter] = useState("");

  const normalizedContacts = useMemo(() => {
    let normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [filter, contacts]);

  useEffect(() => {
    console.log(`UPDATE`);
    if (contacts !== initialContacts) {
      localStorage.setItem(initialContacts, JSON.stringify(contacts));
    }
  }, [contacts]);

  const addNewContact = (obj) => {
    const nameId = uuid();
    const sameName = contacts.map((el) => el.name).includes(obj.name);
    if (sameName) {
      alert(`${obj.name} is already in contacts!`);
    } else {
      setContacts((sameName) => [...sameName, { ...obj, id: nameId }]);
    }
  };

  const deleteContact = (contactId) => {
    setContacts((contacts) =>
      contacts.filter((contact) => contact.id !== contactId)
    );
  };

  const changeFilter = useCallback((e) => setFilter(e.target.value), []);

  return (
    <div className="App">
      <h1 className="title">Phonebook</h1>
      <ContactForm addNewContact={addNewContact} />
      <h2 className="title">Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={normalizedContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
