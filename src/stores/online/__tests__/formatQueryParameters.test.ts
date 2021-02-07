import { QueryParameters } from '../QueryParameters';
import { QueryConfig } from '../typings/common';

describe('QueryParameters.format', () => {
	const mockQueryConfig1: QueryConfig = {
		type: 'action',
		id: '156481',
		email: 'hello@world.com',
	};

	const mockQueryConfig2: QueryConfig = {
		user_id: 'ds4s8r',
	};

	const mockQueryConfig3: QueryConfig = {};

	test('should return a string', () => {
		const result1 = new QueryParameters(mockQueryConfig1).format();
		const result2 = new QueryParameters(mockQueryConfig2).format();
		const result3 = new QueryParameters(mockQueryConfig3).format();

		expect(typeof result1).toBe('string');
		expect(typeof result2).toBe('string');
		expect(typeof result3).toBe('string');
	});

	test('should start with a question mark if there are parameters', () => {
		const result1 = new QueryParameters(mockQueryConfig1).format();
		const result2 = new QueryParameters(mockQueryConfig2).format();
		const result3 = new QueryParameters(mockQueryConfig3).format();

		expect(result1.startsWith('?')).toBe(true);
		expect(result2.startsWith('?')).toBe(true);
		expect(result3.startsWith('?')).toBe(false);
	});

	test('should return string containing specified parameters', () => {
		const result1 = new QueryParameters(mockQueryConfig1).format();
		const result2 = new QueryParameters(mockQueryConfig2).format();

		expect(result1.includes('type=action')).toBe(true);
		expect(result1.includes('id=156481')).toBe(true);
		expect(result1.includes('email=hello@world.com')).toBe(true);
		expect(result2.includes('id=156481')).toBe(false);
		expect(result2.includes('user_id=ds4s8r')).toBe(true);
	});

	test('should be connected with the "&" if there are several parameters', () => {
		const result1 = new QueryParameters(mockQueryConfig1).format();
		const result2 = new QueryParameters(mockQueryConfig2).format();
		const result3 = new QueryParameters(mockQueryConfig3).format();

		expect(result1.includes('&')).toBe(true);
		expect(result2.includes('&')).toBe(false);
		expect(result3.includes('&')).toBe(false);
	});

	test('should return an empty string only if there are no parameters', () => {
		const result1 = new QueryParameters(mockQueryConfig1).format();
		const result2 = new QueryParameters(mockQueryConfig2).format();
		const result3 = new QueryParameters(mockQueryConfig3).format();

		expect(result1).not.toBe('');
		expect(result2).not.toBe('');
		expect(result3).toBe('');
	});
});
