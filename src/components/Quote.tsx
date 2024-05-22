import RefreshIcon from "../assets/icon-refresh.svg";
import "./Quote.css";

interface QuoteProps {
  isMoreInfoOpen: boolean;
  quote: { content: string; author: string } | null;
  onClick: () => void;
}

const Quote = ({ isMoreInfoOpen, quote, onClick }: QuoteProps) => {
  return (
    <div className={`quote ${isMoreInfoOpen && "hidden"}`}>
      <div className="wrapper">
        <div className="content">&quot;{quote ? quote.content : ""}&quot;</div>
        <div className="author">{quote ? quote.author : ""}</div>
      </div>

      <button className="refresh-btn" onClick={onClick}>
        <img src={RefreshIcon} />
      </button>
    </div>
  );
};

export default Quote;
