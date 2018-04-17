# React 16 SSR Template
This project provides a template for React 16 (Fiber) using server
side rendering.

*Important:* The master branch is only supposed to contain the bare-bone template.
There are different branches containing more advanced features, like streaming and 
more to come in the future. Those are documented in the Branches section.

## Table of contents

* [Features](#features)
* [Branches](#branches)
    * [Streaming](#streaming-(feature/streaming))
    * [React Router](#react-router-integration-(feature/react-router))
    * [Express Routing](#express-routing-/-api-(feature/express-routing))
    * [Redux](#redux-(feature/redux))
* [Development](#development)
* [Building for production](#building-for-production)
* [Changelog](#changelog)
* [Planned features](#planned-features)
* [License](#license)
* [Contributing](#contributing)

## Features
* Universal rendering using ExpressJS and EJS
* Hot reloading of styles and scripts
* ESNext ready
* powered by webpack

## Branches
The following, more advanced, features are pushed to dedicated branches. 
Either checkout a specific branch or fork the repository and merge the branches to 
get the features you need. You might as well just use them as a resource to learn, how
the specific technologies are implemented.

### Streaming (feature/streaming)
Since React 16, we have the possibility to render to a node stream. This improves the time to first byte (TTBF), 
since the browser can display the app in an iterative manner. The dedicated branch provides the basic streaming 
implementation.

### React-Router Integration (feature/react-router)
For a template using [react-router](https://github.com/ReactTraining/react-router) you can make use of this branch.
It features routing on client and server side as well as basic routes.

Thanks to [@crabbits](https://github.com/crabbits) for contributing this example.

### Express Routing / API (feature/express-routing)
This example shows how to configure routing ExpressJS. This can be used to create
an API to work alongside your frontend application.

### Redux (feature/redux)
This example shows how to integrate [redux](https://redux.js.org) along with server-side rendering
as well as hot-reloading. It features a simple store with preloaded state
from the server as well as state hydration on the client.

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

## Changelog
The following changes have been implemented in the course of developing
the template.

### 2.0.0
* Upgraded to webpack 4
* Upgraded to React 16.3
* Removed extract-css-chunks plugin in favor of extract-text-webpack-plugin,
since the former is not supported with webpack 4 anymore
* Removes extract plugins for styles in development, to improve hot-reloading 

## Planned features
The following features are planned for future upgrades of the template.
If there are any request, feel free to open an issue or a pull request.

- [ ] Upgrade to babel 7, once it is stable
- [ ] Provide service worker template branch
- [ ] Provide fully features PWA example in a separate repository
- [ ] Extend this list ;-)

## License
MIT

## Contributing
If there are any ideas or optimizations to improve this template,
feel free to submit a pull request including your documented changes.
