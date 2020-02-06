const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: "3.4.1",
      targets: {
        chrome: "64",
        firefox: "50",
        safari: "11.1",
        edge: "15",
        ie: "11",
      }
    }
  ],
];

module.exports = { presets };