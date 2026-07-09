import "./Cell.css";

export default function Cell({
    shot,
    ship,
    onClick,
    disabled
}) {
    let className = "cell";
    let text = "";
    if (shot) {
        switch (shot.result) {
            case "water":
                className += " water";
                text = "•";
                break;
            case "hit":
                className += " hit";
                text = "✖";
                break;
            case "sunk":
                className += " sunk";
                text = "■";
                break;
            default:
                break;

        }

    }

    // Show ships
    else if (ship) {
        className += " ship";
    }
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled || !!shot}
        >
            {text}

        </button>

    );

}