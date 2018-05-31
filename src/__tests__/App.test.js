import React from 'react';
import { shallow } from 'enzyme';

import App from '../shared/App';

describe('App component', () => {
    it('should render a headline', () => {
        const component = shallow(<App/>);
        expect(component.find('h1').length).toEqual(1);
    });
});
