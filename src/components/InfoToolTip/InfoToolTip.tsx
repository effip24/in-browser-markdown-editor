import "./InfoToolTip.css";

interface Props {
  isOpen: boolean;
  onConfirm: Function;
}

const InfoToolTip = ({ isOpen, onConfirm }: Props) => {
  return (
    <div className={`info ${isOpen ? "info_open" : ""}`}>
      <div className="info__container">
        <h1 className="info__title">Delete this document?</h1>
        <p className="info__text">
          Are you sure you want to delete the ‘welcome.md’ document and its
          contents? This action cannot be reversed.
        </p>
        <button className="info__delete" onClick={() => onConfirm()}>
          Confirm & Delete
        </button>
      </div>
    </div>
  );
};
export default InfoToolTip;
