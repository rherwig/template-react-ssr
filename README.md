# React 16 SSR Template
This project provides a template for React 16 (Fiber) using server
side rendering.

## Features
* Content served by ExpressJS using the EJS view engine
* Hot reloading of styles and scripts
* ESNext ready
* powered by webpack

## Development
To start development, follow these steps:

```
$ git clone https://github.com/rherwig/template-react-16-ssr.git
$ cd template-react-16-ssr
$ npm i
$ npm start
```

This fires up the development server on port `3000`.

You can now choose to either start developing your react application or
to enhance the express server according to your needs.

The react app's entry point is `src/shared/App.js` and the express
server is started from `src/index.js`.

For more information on how the specific parts of the application work,
please refer to the documentation in the code.

## Building for Production
In order to build for production and run the finished project, execute
the following:

```
$ npm run build
$ node public/index
```

This bundles and optimizes your app and runs it from the `public/`
directory.

## License
MIT

## Contributing
If there are any ideas or optimizations to improve this template,
feel free to submit a pull request including your documented changes.
