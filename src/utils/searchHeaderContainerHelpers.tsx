import { SortField, SortMethod, SortType } from '../types/BooksTypes';
import { authors, publishers } from './customFields';

export enum SortEntries {
	none = 'None',
	authors_az = 'Authors (A - Z)',
	authors_za = 'Authors (Z - A)',
	publisher_az = 'Publisher (A - Z)',
	publisher_za = 'Publisher (Z - A)',
	price_asc = 'Price (asc)',
	price_dsc = 'Price (desc)',
	date_asc = 'Date (asc)',
	date_dsc = 'Date (desc)',
  }

const mapObject: Record<SortEntries, SortType> = {
	[SortEntries.authors_az]: { field: SortField.authors, direction: SortMethod.dsc },
	[SortEntries.authors_za]: { field: SortField.authors, direction: SortMethod.asc },
	[SortEntries.publisher_az]: { field: SortField.publisher, direction: SortMethod.dsc },
	[SortEntries.publisher_za]: { field: SortField.publisher, direction: SortMethod.asc },
	[SortEntries.price_asc]: { field: SortField.price, direction: SortMethod.asc },
	[SortEntries.price_dsc]: { field: SortField.price, direction: SortMethod.dsc },
	[SortEntries.date_asc]: { field: SortField.date, direction: SortMethod.asc },
	[SortEntries.date_dsc]: { field: SortField.date, direction: SortMethod.dsc },
	[SortEntries.none]: {},
};

export const mapSortEntryToSortType = (entry: SortEntries): SortType => mapObject[entry];

export const mapSortTypeToSortEntry = ({
	field: currentField,
	direction: currentDirection,
}: SortType): SortEntries => {
	const record = Object.entries(mapObject)
		.find(([, { field, direction }]) => (field === currentField && direction === currentDirection));

	return record ? record[0] as SortEntries : SortEntries.none;
};

export const getSortOptions = () => Object.values(SortEntries).map((el) => (
	<option key={el} value={el}>
		{el}
	</option>
));

export const getPublishersOptions = () => ['All', ...publishers].map((el) => (
	<option key={el} value={el}>
		{el}
	</option>
));

export const getAuthorsOptions = () => ['All', ...authors].map((el) => (
	<option key={el} value={el}>
		{el}
	</option>
));
