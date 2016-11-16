import React from 'react';
import Login from './Login';
import renderer from 'react-test-renderer';

test('Renders login button if not authenticated', () => {
    const component = renderer.create(
        <Login />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});

test('Renders logout button if authenticated', () => {
});
