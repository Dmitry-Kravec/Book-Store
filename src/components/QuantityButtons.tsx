import { memo } from 'react';

export interface QuantityButtonsProps {
    onQuantityChange: (value: number) => void,
    onQuantityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    quantity: number,
	onQuantityInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
}

const QuantityButtons = ({
	onQuantityInputChange,
	onQuantityInputBlur,
	onQuantityChange,
	quantity,
}: QuantityButtonsProps) => (
	<div className="quantity-buttons">
		<button
			className="quantity-buttons__quantity-button"
			type="button"
			onClick={() => onQuantityChange(-1)}
		>
			<span>&minus;</span>
		</button>
		<input
			className="quantity-buttons__quantity-input"
			type="number"
			value={quantity.toString()}
			onChange={onQuantityInputChange}
			onBlur={onQuantityInputBlur}
		/>
		<button
			className="quantity-buttons__quantity-button"
			type="button"
			onClick={() => onQuantityChange(1)}
		>
			<span>&#43;</span>
		</button>
	</div>
);

export default memo(QuantityButtons);
