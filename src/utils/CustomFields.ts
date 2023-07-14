import { sample } from 'lodash';
import moment from 'moment';
import { BookApiItemType, BookItemType } from '../types/BooksTypes';
import { serverDateTimeFormat } from '../constants';

type CustomBookFields = 'authors' | 'publisher' | 'date'
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
	// 'Milf-publishing',
	// 'Ecros',
	// 'Triokin',
	// 'Elpunor',
	// 'Nova-Books',
];

const makeDates = (count: number = 20) => {
	const arr: string[] = [];
	for (let i = 0; i < count; i += 1) {
		const randomHour = Math.floor(Math.random() * 24);

		arr.push(moment.utc().hours(randomHour).format(serverDateTimeFormat));
	}

	return arr;
};

const authorField: CustomBookFieldType = [authors, 'authors'];

const publisherField: CustomBookFieldType = [publishers, 'publisher'];

const dateField: CustomBookFieldType = [makeDates(), 'date'];

const customBookFields = [authorField, publisherField, dateField];

const addCustomFields = <T extends BookApiItemType, U>(books: U[]) => {
	const booksWithFields: T[] = [];

	books.forEach((book) => {
		const newBookItem: any = {
			...book,
		};

		customBookFields.forEach(([fieldValues, fieldName]) => {
			newBookItem[fieldName] = sample(fieldValues);
		});

		booksWithFields.push(newBookItem as T);
	});

	return booksWithFields;
};

const addCustomFieldsV2 = <T extends BookApiItemType>(books: T[]) => {
	const booksWithFields: (Partial<Omit<BookItemType, keyof BookApiItemType>> & T)[] = [...books];

	customBookFields.forEach(([fieldValues, fieldName]) => {
		fieldValues.forEach((value, index) => {
			if (fieldName !== 'date') {
				if (booksWithFields[index * 2]) {
					booksWithFields[index * 2][fieldName] = value;
				}
				if (booksWithFields[index * 2 + 1]) {
					booksWithFields[index * 2 + 1][fieldName] = value;
				}
			} else if (booksWithFields[index]) {
				booksWithFields[index][fieldName] = value;
			}
		});
	});

	return booksWithFields as T[];
};

export { authors, publishers, addCustomFields };

// const addCustomFields = <T extends BookApiItemType, U>(books: U[]) =>
// 	books.map((book) => {
// 		const additionalFields = customBookFields.reduce((acc, [values, fieldName]) => {
// 			const value = sample(values);

// 			return {
// 				...acc,
// 				[fieldName]: value,
// 			};
// 		}, { authors: '', publisher: '', date: '' });

// 		return {
// 			...book,
// 			...additionalFields,
// 		};
// 	});

// if (fieldName !== 'date') {
// 	booksWithFields[index * 2] && (booksWithFields[index * 2][fieldName] = value);
// 	booksWithFields[index * 2 + 1] && (booksWithFields[index * 2 + 1][fieldName] = value);
// } else {
// 	booksWithFields[index] && (booksWithFields[index][fieldName] = value);
// }
