import { useState } from "react";
import FormField from "./formField";
import emailjs from '@emailjs/browser';

const ReservationForm = ({
  availableTimes,
  dispatchOnDateChange,
  submitData,
}) => {
  const minimumDate = new Date().toISOString().split("T")[0];
  const defaultTime = availableTimes[0];
  const minimumNumberOfGuests = 1;
  const maximumNumberOfGuests = 10;
  const occasions = ["Birthday", "Anniversary", "Engagement", "Other"];
  const invalidDateErrorMessage = "Please choose a valid date";
  const invalidTimeErrorMessage = "Please choose a valid time";
  const invalidOccasionErrorMessage = "Please choose a valid occasion";
  const invalidNumberOfGuestsErrorMessage =
    "Please enter a number between 1 and 10";

  const [name, setName] = useState("");
  const [date, setDate] = useState(minimumDate);
  const [mail, setMail] = useState("");
  const [time, setTime] = useState(defaultTime);
  const [numberOfGuests, setNumberGuests] = useState(minimumNumberOfGuests);
  const [occasion, setOccasion] = useState(occasions[0]);

  const isNameValid = () => name !== "";
  const isMailValid = () => mail !== "";
  const isDateValid = () => date !== "";
  const isTimeValid = () => time !== "";
  const isNumberOfGuestsValid = () => numberOfGuests !== "";
  const isOccasionValid = () => occasion !== "";

  const areAllFieldsValid = () =>
    isNameValid() &&
    isMailValid() &&
    isDateValid() &&
    isTimeValid() &&
    isNumberOfGuestsValid() &&
    isOccasionValid();

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatchOnDateChange(e.target.value);
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleMailChange = (e) => setMail(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const service_id = 'service_i3vng1m';
    const template_id = 'template_ueghurd';
    const public_id = 'gbtOYXQ6SZQAOaHko';

    const templateParams = {
      from_name: "Little Lemon",
      from_email: mail,
      to_name: name,
      message: `You have a reservation on ${date} at ${time} for ${numberOfGuests} guests.`,
    };

    // Send the email using EmailJS
    emailjs.send(service_id, template_id, templateParams, public_id)
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
    submitData({ name, mail, date, time, numberOfGuests, occasion });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormField
        label="Name"
        htmlFor="reservation-name"
        hasError={!isNameValid()}
      >
        <input
          type="text"
          id="reservation-name"
          name="reservation-name"
          value={name}
          required={true}
          onChange={handleNameChange}
        />
      </FormField>
      <FormField
        label="Email address"
        htmlFor="reservation-mail"
        hasError={!isMailValid()}
      >
        <input
          type="email"
          id="reservation-mail"
          name="reservation-mail"
          value={mail}
          required={true}
          onChange={handleMailChange}
        />
      </FormField>
      <FormField
        label="Date"
        htmlFor="reservation-date"
        hasError={!isDateValid()}
        errorMessage={invalidDateErrorMessage}
      >
        <input
          type="date"
          id="reservation-date"
          name="reservation-date"
          min={minimumDate}
          value={date}
          required={true}
          onChange={handleDateChange}
        />
      </FormField>
      <FormField
        label="Time"
        htmlFor="reservation-time"
        hasError={!isTimeValid()}
        errorMessage={invalidTimeErrorMessage}
      >
        <div className="select-wrapper">
          <select
            id="reservation-time"
            name="reservation-time"
            value={time}
            required={true}
            onChange={handleTimeChange}
          >
            {availableTimes.map((times) => (
              <option data-testid="reservation-time-option" key={times}>
                {times}
              </option>
            ))}
          </select>
        </div>
      </FormField>
      <FormField
        label="Number of guests"
        htmlFor="reservation-number-guests"
        hasError={!isNumberOfGuestsValid()}
        errorMessage={invalidNumberOfGuestsErrorMessage}
      >
        <input
          type="number"
          id="reservation-number-guests"
          name="reservation-number-guests"
          value={numberOfGuests}
          min={minimumNumberOfGuests}
          max={maximumNumberOfGuests}
          required={true}
          onChange={(e) => setNumberGuests(e.target.value)}
        />
      </FormField>
      <FormField
        label="Occasion"
        htmlFor="reservation-occasion"
        hasError={!isOccasionValid()}
        errorMessage={invalidOccasionErrorMessage}
      >
        <div className="select-wrapper">
          <select
            id="reservation-occasion"
            name="reservation-occasion"
            value={occasion}
            required={true}
            onChange={(e) => setOccasion(e.target.value)}
          >
            {occasions.map((occasion) => (
              <option data-testid="reservation-occasion-option" key={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </div>
      </FormField>
      <button
        className="button-primary"
        type="submit"
        disabled={!areAllFieldsValid()}
      >
        Reserve now!
      </button>
    </form>
  );
};

export default ReservationForm;
