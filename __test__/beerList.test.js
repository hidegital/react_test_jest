import React from 'react';
import { mount,shallow } from 'enzyme';
import { InputArea, BeerList,BeerListContainer } from '../components';


describe('BeerListContainer', () => {
	it('should render InputArea and BeerList', () => {
		const wrapper = shallow(<BeerListContainer/>);
		expect(wrapper.containsAllMatchingElements([
			<InputArea/>,
			<BeerList/>
		])).toBe(true);
	});
	it('should start with an empty list', () => {
		const wrapper = shallow(<BeerListContainer/>);
		expect(wrapper.state('beers')).toEqual([]);
		//assert(wrapper.state('beers') == []);
	});
	it('adds items to the list', () => {
		const wrapper = shallow(<BeerListContainer/>);
		wrapper.instance().addItem('Sam Adams');
		expect(wrapper.state('beers')).toEqual(['Sam Adams']);
	});
	it('passes addItem to InputArea', () => {
		const wrapper = shallow(<BeerListContainer/>);
		const inputArea = wrapper.find(InputArea);
		const addItem = wrapper.instance().addItem;
		expect(inputArea.prop('onSubmit')).toEqual(addItem);
	});
	it('passes a bound addItem function to InputArea', () => {
		const wrapper = shallow(<BeerListContainer/>);
		const inputArea = wrapper.find(InputArea);
		inputArea.prop('onSubmit')('Sam Adams');
		expect(wrapper.state('beers')).toEqual(['Sam Adams']);
	});
	it('renders the items', () => {
		const wrapper = mount(<BeerListContainer/>);
		wrapper.instance().addItem('Sam Adams');
		wrapper.instance().addItem('Resin');
		expect(wrapper.find('li').length).toBe(2);
	});
});


describe('InputArea', () => {
	it('should contain an input and a button', () => {
		const wrapper = shallow(<InputArea/>);
		expect(wrapper.containsAllMatchingElements([
			<input/>,
			<button>Add</button>
		])).toBe(true);
	});
	it('should accept input', () => {
		const wrapper = mount(<InputArea/>);
		const input = wrapper.find('input');
		input.simulate('change', {target: { value: 'Resin' }});
		expect(wrapper.state('text')).toBe('Resin');
		expect(input.prop('value')).toBe('Resin');
	});
	it('should call onSubmit when Add is clicked', () => {
		const addItemSpy = jest.fn();
		const wrapper = shallow(<InputArea onSubmit={addItemSpy}/>);
		wrapper.setState({text:'Octoberfest'});
		const addButton = wrapper.find('button');

		addButton.simulate('click');

		expect(addItemSpy).toHaveBeenCalledTimes(1);
		expect(addItemSpy).toBeCalledWith('Octoberfest');
	});
});

describe('BeerList', () => {
	it('should render zero items', () => {
		const wrapper = shallow(<BeerList items={[]}/>);
		expect(wrapper.find('li').length).toBe(0);
	});

	it('should render undefined items', () => {
		const wrapper = shallow(<BeerList items={undefined}/>);
		expect(wrapper.find('li').length).toBe(0);
	});

	it('should render some items', () => {
		const items = ['Sam Adams', 'Resin', 'Octoberfest'];
		const wrapper = shallow(<BeerList items={items}/>);
		expect(wrapper.find('li').length).toBe(3);
	});
});