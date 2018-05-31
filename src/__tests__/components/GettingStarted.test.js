import React from 'react';
import { shallow } from 'enzyme';

import GettingStarted from '../../shared/components/GettingStarted';

describe('GettingStarted component', () => {

    let component;

    beforeAll(() => {
        component = shallow(<GettingStarted/>);
    });

    it('should render a section element', () => {
        expect(component.find('section').length).toEqual(1);
    });

    it('should render a code element', () => {
        expect(component.find('code').length).toEqual(1);
    });
});
