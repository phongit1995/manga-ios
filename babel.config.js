module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@firebase': './src/firebase'
        }
      }
    ],
    'jest-hoist'
  ],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
};