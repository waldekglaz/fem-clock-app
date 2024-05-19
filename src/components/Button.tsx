import "./Button.css";
import OpenIcon from "../assets/icon-arrow-down.svg";
import CloseIcon from "../assets/icon-arrow-up.svg";

interface ButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const Button = ({ isOpen, onClick }: ButtonProps) => {
  return (
    <button className="main-btn" onClick={onClick}>
      {isOpen ? "LESS" : "MORE"}
      <span className="btn-icon">
        <img src={!isOpen ? OpenIcon : CloseIcon} alt="" />
      </span>
    </button>
  );
};

export default Button;
