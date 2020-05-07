import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import './datepicker.css';

const DatePickerContainer = props => {
  const [startDate, setStartDate] = useState(new Date());

  const updateDate = (date) => {
    setStartDate(date);
    const formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/"
      + date.getFullYear();
    props.update(formatted_date);
  };

  return (
    <DatePicker dateFormat="dd/MM/yyyy" minDate={new Date()} selected={startDate} onChange={date => updateDate(date)} />
  );
};

export default DatePickerContainer;