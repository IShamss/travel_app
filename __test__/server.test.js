import projectData from '../src/server/server';
describe('loading express', function() {
	//checking to see if the object that stores the data is defined
	test('Testing the server() function', () => {
		expect(projectData).toBeDefined();
	});
});
