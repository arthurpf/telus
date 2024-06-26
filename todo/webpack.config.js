const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  mode: 'development',
  entry: './src/index.ts',
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      '@': './src'
    }
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 9001,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "todo",
      filename: "todo-app.js",
      exposes: {
        './App': './src/components/todo.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "@uidotdev/usehooks": {
          singleton: true,
          requiredVersion: deps["@uidotdev/usehooks"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
