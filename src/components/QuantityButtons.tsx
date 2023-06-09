import React from "react";

export type QuantityButtonsProps = {
    handleQuantityChange: (value: number) => void,
    handleQuantityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    quantity: number,
}

const QuantityButtons = ({
    handleQuantityInputChange,
    handleQuantityChange,
    quantity
}: QuantityButtonsProps) => {
    return (
        <div className="quantity-buttons">
            <button
                className="quantity-buttons__quantity-button"
                type="button"
                onClick={() => handleQuantityChange(-1)}
            >
                -
            </button>
            <input
                className="quantity-buttons__quantity-input"
                type="number"
                value={quantity.toString()}
                onChange={handleQuantityInputChange}
            />
            <button
                className="quantity-buttons__quantity-button"
                type="button"
                onClick={() => handleQuantityChange(1)}
            >
                +
            </button>
        </div>
    )
}

export default QuantityButtons;