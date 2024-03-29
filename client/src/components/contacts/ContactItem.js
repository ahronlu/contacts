import { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact, setShowFormModal }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, company, address, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {company && (
          <li>
            <i className="fas fa-briefcase" /> {company}
          </li>
        )}
        {address && (
          <li>
            <i className="fas fa-map-marker-alt" />{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://maps.google.com/?q=${address}`}
            >
              {address}
            </a>
          </li>
        )}
        {email && (
          <li>
            <i className="fas fa-envelope-open" />{" "}
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> <a href={`tel:${phone}`}>{phone}</a>
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => {
            setShowFormModal(true);
            setCurrent(contact);
          }}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
