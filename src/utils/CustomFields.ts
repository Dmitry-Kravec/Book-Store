import { sample } from 'lodash';
import { BookApiItemType, BookItemType } from '../types/BooksTypes';

type CustomBookFields = 'authors' | 'publisher'
type CustomBookFieldType = [fieldValues: string[], fieldName: CustomBookFields]

const authors = [
	'George Mathew Adams',
	'Bibi Jonson',
	'Ricardo Milos',
	'Mikael Retrofan',
	'Jojo Sorserer',
	'Alexander Abdulov',
	'Katy Vingston',
	'Rafael Kusto',
	'Harry Dubua',
	'Tekila Sunset',
];
const publishers = [
	'Packt Publishing',
	'Apress',
	'Springer',
	'Syncfusion',
	'Self-publishing',
	'Milf-publishing',
	'Ecros',
	'Triokin',
	'Elpunor',
	'Nova-Books',
];

const authorField: CustomBookFieldType = [authors, 'authors'];

const publisherField: CustomBookFieldType = [publishers, 'publisher'];

const customBookFields = [authorField, publisherField];

const addCustomFields = (books: BookApiItemType[]) => {
	const booksWithFields: BookItemType[] = [];

	books.forEach((book) => {
		const newBookItem: any = {
			...book,
		};

		customBookFields.forEach(([fieldValues, fieldName]) => {
			newBookItem[fieldName] = sample(fieldValues);
		});

		booksWithFields.push(newBookItem as BookItemType);
	});

	return booksWithFields;
};

const addCustomFieldsV2 = (books: BookApiItemType[]) => {
	const booksWithFields: (Partial<Omit<BookItemType, keyof BookApiItemType>> & BookApiItemType)[] = [...books];

	customBookFields.forEach(([fieldValues, fieldName]) => {
		fieldValues.forEach((value, index) => {
			booksWithFields[index * 2] && (booksWithFields[index * 2][fieldName] = value);
			booksWithFields[index * 2] && (booksWithFields[index * 2 + 1][fieldName] = value);
		});
	});

	return booksWithFields as BookItemType[];
};

export { authors, publishers, addCustomFields };
