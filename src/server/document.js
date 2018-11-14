const getPageStart = ({ styles, helmet }) => `
    <!doctype html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        
        ${styles}
        
        ${helmet.title.toString()}
    </head>
    <body>
`;

const getAppStart = () => `<div id="react-root">`;

const getAppEnd = () => `</div>`;

const getPageEnd = ({ js }) => `
    ${js}
      
    </body>
    </html>
`;

export default ({
    js,
    styles,
    helmet,
}) => ({
    pageStart: getPageStart({ styles, helmet }),
    appStart: getAppStart(),
    appEnd: getAppEnd(),
    pageEnd: getPageEnd({ js }),
});
