import "./App.css";
import { Component } from "react";
import { v4 as uuid } from "uuid";
import initialContacts from "./components/dataBase/contacts.json";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";

export default class App extends Component {
  state = {
    contacts: initialContacts,
    filter: "",
  };
  componentDidMount() {
    // console.log(`MOUNT`);
    const localContacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(localContacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(`UPDATE`);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  componentWillUnmount() {
    // console.log(`UNMOUNT`);
  }

  addNewContact = (obj) => {
    const { contacts } = this.state;
    const nameId = uuid();
    const sameName = contacts.map((el) => el.name).includes(obj.name);

    if (sameName) {
      alert(`${obj.name} is already in contacts!`);
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, { ...obj, id: nameId }],
        };
      });
    }
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    // console.log(this.state);
    const { contacts, filter } = this.state;

    const { addNewContact, changeFilter, deleteContact } = this;

    const normalizedFilter = filter.toLowerCase();
    const normalizedContact = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className="App">
        <h1 className="title">Phonebook</h1>
        <ContactForm addNewContact={addNewContact} />
        <h2 className="title">Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={normalizedContact}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}
