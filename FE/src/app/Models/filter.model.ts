export interface Filter {
	official: boolean;
	unofficial: boolean;
	startDate: Date | string | null;
	endDate: Date | string | null;
}
