import { postData, updateUI, getData } from '../src/client/js/app';

describe('Testing that all functions are properly defined', () => {
	// since all functions don't return an actual value , we will check to see if all functions are properly defined
	test('Testing the postData() function', () => {
		expect(postData()).toBeDefined();
	});
	test('Testing the updateUI() function', () => {
		expect(updateUI()).toBeDefined();
	});
	test('Testing the getData() function', () => {
		expect(getData()).toBeDefined();
	});
});
