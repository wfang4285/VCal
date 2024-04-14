import React, { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    index: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    onClose();
    setEventData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            placeholder="Event Title"
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            placeholder="Event Description"
            style={{ width: '100%' }}
          ></textarea>
          <input
            type="datetime-local"
            name="startTime"
            value={eventData.startTime}
            onChange={handleInputChange}
            //placeholder = "--/--/--"
          />
          <input
            type="datetime-local"
            name="endTime"
            value={eventData.endTime}
            onChange={handleInputChange}
            //placeholder = "--/--/--"
          />
          <input
            type="text"
            name="index"
            value={eventData.index}
            onChange={handleInputChange}
            placeholder="Event Index Number"
          />
          <button type="submit" style={{ color: 'black' }}>Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;