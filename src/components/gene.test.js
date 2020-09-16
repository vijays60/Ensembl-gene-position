import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import Gene from './gene';

configure({adapter: new Adapter()});


describe('<gene>', function() {
    
    it('Should capture genesymbol correctly onChange', function(){
        const component = mount(<Gene />);
        const input = component.find('input').at(0);
        input.instance().value = 'BRAF';
        input.simulate('change');
        expect(component.state().geneSymbol).toEqual('BRAF');
    })
    it('Should capture position correctly onChange', function(){
        const component = mount(<Gene />);
        const input = component.find('input').at(1);
        input.instance().value = 600;
        input.simulate('change');
        expect(component.state().position).toEqual("600");
    })
    it('Should capture letter correctly onChange', function(){
        const component = mount(<Gene />);
        const input = component.find('input').at(2);
        input.instance().value = 'V';
        input.simulate('change');
        expect(component.state().letter).toEqual('V');
    })
    
});