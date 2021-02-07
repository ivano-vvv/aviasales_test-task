import { PositionInArray, QueryConfig } from './typings/common';

export class QueryParameters {
	config: QueryConfig;

	constructor(config: QueryConfig) {
		this.config = config;
	}

	format(): string {
		let result = '';
		function addToResult(str: string): void {
			result = result + str;
		}

		if (!this.config) {
			return result;
		}

		const parametersInArray = this.convertQueryParametersToArray(
			this.config
		);

		parametersInArray.forEach((param, i, array) => {
			const positionInArray: PositionInArray = {
				isFirst: i === 0,
				isLast: i === array.length - 1,
			};

			const formattedParameter = this.convertSingleParameterToString(
				param,
				positionInArray
			);

			addToResult(formattedParameter);
		});

		return result;
	}

	private convertQueryParametersToArray(
		queryParameters: QueryConfig
	): [string, string][] {
		return Object.entries(queryParameters);
	}

	private convertSingleParameterToString(
		parameter: [string, string],
		positionInArray: PositionInArray
	): string {
		const key = parameter[0];
		const value = parameter[1];

		const result = `${key}=${value}`;
		const relativeResult = this.processStringParameterWithPosition(
			result,
			positionInArray
		);

		return relativeResult;
	}

	private processStringParameterWithPosition(
		strParam: string,
		positionInArray: PositionInArray
	): string {
		let result = strParam;
		const { isFirst, isLast } = positionInArray;

		if (isFirst) {
			result = `?${result}`;
		}

		if (!isLast) {
			result = `${result}&`;
		}

		return result;
	}
}
