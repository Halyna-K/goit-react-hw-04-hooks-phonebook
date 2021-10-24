import "./App.css";
import { v4 as uuid } from "uuid";
import { useState, useMemo, useCallback } from "react";
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

  const addNewContact = (obj) => {
    // setContacts((sameName) => [...sameName, { ...obj, id: nameId }]);
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

  // componentDidMount() {
  //   // console.log(`MOUNT`);
  //   const localContacts = localStorage.getItem("contacts");
  //   const parseContacts = JSON.parse(localContacts);
  //   if (parseContacts) {
  //     this.setState({ contacts: parseContacts });
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   // console.log(`UPDATE`);
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  //   }
  // }
  // componentWillUnmount() {
  //   // console.log(`UNMOUNT`);
  // }
}

export default App;
