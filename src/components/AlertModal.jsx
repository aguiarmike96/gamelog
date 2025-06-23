import './AlertModal.css';

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="alert-backdrop" onClick={onClose}>
      <div className="alert-modal" onClick={e => e.stopPropagation()}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default AlertModal;
