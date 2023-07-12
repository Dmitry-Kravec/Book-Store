import defaultBookImage from '../images/default-book.png';

export const getFormattedPrice = (price: string) => (Number(price.slice(1)) === 0 ? 'Free' : price);

export const onImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
	e.currentTarget.onerror = null;
	e.currentTarget.src = defaultBookImage;
};
