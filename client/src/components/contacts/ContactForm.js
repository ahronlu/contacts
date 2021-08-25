import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = ({ setShowFormModal }) => {
  const contactContext = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  const fields = ["name", "company", "address", "email", "phone", "_id"];

  useEffect(() => {
    if (current !== null) {
      console.log(current);
      fields.map((f) => setValue(f, current[f]));
    }
  }, [contactContext, current]);

  const onSubmit = (data) => {
    console.log(data);
    if (current === null) {
      addContact(data);
    } else {
      updateContact(data);
    }
    clearAll();
    setShowFormModal(false);
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{current ? "Edit Contact" : "Add Contact"}</h2>
      <input
        type="text"
        placeholder="Name"
        isValid={!errors.name && dirtyFields.name}
        {...register("name", {
          required: "Name is required",
        })}
      />
      {errors.name && <span role="alert">{errors.name.message}</span>}
      <input
        type="text"
        placeholder="Company"
        isValid={!errors.company && dirtyFields.company}
        {...register("company", {
          required: "Company is required",
        })}
      />
      {errors.company && <span role="alert">{errors.company.message}</span>}
      <input
        type="text"
        placeholder="Address"
        isValid={!errors.address && dirtyFields.address}
        {...register("address", {
          required: "Address is required",
        })}
      />
      {errors.address && <span role="alert">{errors.address.message}</span>}
      <input
        type="email"
        placeholder="Email"
        isValid={!errors.email && dirtyFields.email}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
          },
        })}
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <input
        type="text"
        placeholder="Phone"
        isValid={!errors.phone && dirtyFields.phone}
        {...register("phone", {
          required: "Phone is required",
        })}
      />
      {errors.phone && <span role="alert">{errors.phone.message}</span>}
      <h3 style={{ textAlign: "left" }}>Contact Type</h3>
      {/* <input
        type="radio"
        name="type"
        id="personal"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      <label htmlFor="personal">Personal</label>{" "}
      <input
        type="radio"
        name="type"
        id="professional"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      <label htmlFor="professional">Professional</label> */}
      <div>
        <input
          disabled={!isValid || isSubmitting}
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      <div>
        <button
          className="btn btn-danger btn-block"
          type="button"
          onClick={() => setShowFormModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
