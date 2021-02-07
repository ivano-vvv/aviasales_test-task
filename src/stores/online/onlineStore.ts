import { observable } from 'mobx';

import { ticketsStore } from '../tickets';
import { QueryParameters } from './QueryParameters';

import { SearchIdResponse, TicketsResponse } from './typings/responses';
import { QueryConfig } from './typings/common';

import { askConfirmation } from '../../utils/askConfirmation';
import { showError } from '../../utils/showError';

import {
	online as messages,
	__serverUrl__,
	__endpoints__,
} from '../../constants';

class Online {
	@observable isFetching = false;

	startFetching(): void {
		if (!this.searchId) {
			this.updateSearchId();
		} else {
			this.tickTicketsUploaded(false);
			this.updateTickets(this.searchId);
		}
	}

	private searchId: string | null = null;

	private ticketsUploaded = false;

	private setSearchId(id: string): void {
		this.searchId = id;
	}

	private tickTicketsUploaded(value: boolean): void {
		this.ticketsUploaded = value;
	}

	private toggleFetchingStatus(value: boolean): void {
		this.isFetching = value;
	}

	private updateSearchId(): void {
		this.fetchSearchId()
			.then((res) => this.handleFetchingSearchId(res))
			.catch((reason) => this.handleFetchingSearchIdError(reason));
	}

	private updateTickets(searchId: string): void {
		if (this.ticketsUploaded) {
			return;
		}

		this.fetchTicketsRequest(searchId)
			.then((res) => this.handleFetchingTickets(res))
			.catch((reason) => this.handleFetchingTicketsError(reason))
			.finally(() => this.updateTickets(searchId));
	}

	private fetchSearchId(): Promise<SearchIdResponse> {
		const endPoint = 'search';

		return this.sendGetRequest(endPoint);
	}

	private fetchTicketsRequest(searchId: string): Promise<TicketsResponse> {
		const endPoint = __endpoints__.tickets;
		const queryConfig: QueryConfig = {
			searchId,
		};

		return this.sendGetRequest(endPoint, queryConfig);
	}

	private handleFetchingSearchId(res: SearchIdResponse): void {
		this.setSearchId(res.searchId);
		this.startFetching();
	}

	private handleFetchingSearchIdError(reason: unknown): void {
		this.showError(messages.searchIdError, reason);
		if (this.askToRepeatSearchIdRequest()) {
			this.startFetching();
		}
	}

	private askToRepeatSearchIdRequest(): boolean {
		return askConfirmation(messages.repeatSearchIdRequestQuestion);
	}

	private handleFetchingTickets(res: TicketsResponse): void {
		const { stop, tickets } = res;

		ticketsStore.addNewTickets(tickets);
		this.processStopFlagInResponse(stop);
	}

	private handleFetchingTicketsError(reason: unknown): void {
		this.showError(messages.ticketsError, reason);
	}

	private processStopFlagInResponse(stop: boolean): void {
		if (stop) {
			this.tickTicketsUploaded(true);
			this.toggleFetchingStatus(false);
		}
	}

	private async sendGetRequest<T>(
		endPoint: string,
		queryConfig?: QueryConfig
	): Promise<T> {
		const queryString = queryConfig
			? new QueryParameters(queryConfig).format()
			: '';

		const url = `${__serverUrl__}/${endPoint}${queryString}`;

		const response = await fetch(url);

		return response.json();
	}

	private showError(message: string, additionalInfo?: unknown): void {
		showError('online', message, additionalInfo);
	}
}

export const onlineStore = new Online();
