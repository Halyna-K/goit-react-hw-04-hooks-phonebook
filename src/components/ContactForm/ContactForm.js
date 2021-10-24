import s from "./ContactForm.module.css";
import { Component } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class ContactForm extends Component {
  nameId = uuid();
  numberId = uuid();

  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = { name, number };
    this.setState({ contact });
    this.props.addNewContact(contact);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ ...this.state });
  };

  render() {
    const { name, number } = this.state;
    const { nameId, numberId, handleSubmit, handleChange } = this;
    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label} htmlFor={nameId}>
          Name
        </label>
        <input
          id={nameId}
          onChange={handleChange}
          className={s.input}
          type="text"
          name="name"
          value={name}
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <label className={s.label} htmlFor={numberId}>
          Number
        </label>
        <input
          id={numberId}
          onChange={handleChange}
          className={s.input}
          type="tel"
          name="number"
          value={number}
          placeholder="Enter number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
        <Button
          type="submit"
          variant="secondary"
          //   className={s.btn}
        >
          Add contacts
        </Button>
      </form>
    );
  }
}
