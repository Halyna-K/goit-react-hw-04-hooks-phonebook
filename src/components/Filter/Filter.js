import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import s from "./Filter.module.css";

const nameId = uuid();

export const Filter = ({ value, onChange }) => (
  <label htmlFor={nameId} className={s.filter}>
    Find contact by name
    <input
      id={nameId}
      onChange={onChange}
      className={s.input}
      type="text"
      name="filter"
      value={value}
      placeholder="Enter contact name"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
      required
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
