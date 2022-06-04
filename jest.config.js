module.exports = {
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "\\.(css|styl|less|sass|scss)$": "<rootDir>/__tests__/styleMock.js",
    "\\.(png|jpg|ttf|woff|woff2)$": "<rootDir>/__tests__/fileMock.js",
  },
  testMatch: ["**/*.test.(js|jsx|ts|tsx)"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect", "./jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "@swc-node/jest",
      {
        jsx: true,
        dynamicImport: true,
        react: {
          runtime: "automatic",
        },
      },
    ],
  },
};
