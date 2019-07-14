import React, {Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
//import Scroll from './Scroll'
import './App.css'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class App extends Component
{
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=>response.json())
			.then(users =>{this.setState({ robots: users })});	
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
	}
	render(){
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})

		if (this.state.robots.length === 0){
			return <h1 className='tc'>Loading...</h1>
		}
		else{
			return (
			<div className='tc'>
				<h1 className='f1'>Robotok</h1>
				<SearchBox className='br-pill' searchChange={this.onSearchChange}/>
				{/*<Scroll>*/}
				<SimpleBar style={{height: '600px'}}>
					<CardList robots={filteredRobots}/>
				</SimpleBar>
				{/*</Scroll> */}
			</div>
			);
		}
	}
}


export default App;