import s from "./ContactList.module.css";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={s.list}>
    {contacts.map((contact) => (
      <li key={contact.id} className={s.item}>
        <p className={s.text}>{contact.name + " : " + contact.number}</p>
        <Button
          variant="outline-secondary"
          // className={s.btn}
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </Button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
