module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	moduleNameMapping: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
	},
}
