import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../shared/App';

const getPageStart = (styles) => `
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    ${styles}

    <title>React 16 | Sample</title>
</head>
<body>

`;

const getPageEnd = (cssHash, js) => `
${cssHash}
${js}

</body>
</html>
`;

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res, next) => {
    const stream = ReactDOM.renderToNodeStream(<App/>);
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    res.write(getPageStart(styles));
    res.write('<div id="react-root">');
    stream.pipe(res, { end: false });
    stream.on('end', () => {
        res.write('</div>');
        res.end(getPageEnd(cssHash, js));
    });
};
