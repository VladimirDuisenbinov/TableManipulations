import React, {Component} from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Row,
Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import './MainComponent.css';
import Data from './data.json';

class MainComponent extends Component {
	
	constructor(props){
		super()
		this.state = {
			dataToLoad: [],
			dataToShow: [],
			currentPage: 1,
			shouldComponentReRender: false,
			currentItemsPerPage: 5,
			dropOpen: false,
			maxNumOfItemsPerPage: 10,
			sortArrows: [false, false, false, false]
		}

		this.changeCurrentPage = this.changeCurrentPage.bind(this);
		this.dropdownClick = this.dropdownClick.bind(this);
		this.readData = this.readData.bind(this);
		this.returnDropdownNumber = this.returnDropdownNumber.bind(this);
		this.returnTableItems = this.returnTableItems.bind(this);
		this.returnPagination = this.returnPagination.bind(this);
		this.sort = this.sort.bind(this);
		this.toggle = this.toggle.bind(this);


	}

	toggle() {
	
	    this.setState(prevState => ({
	      dropOpen: !prevState.dropOpen
	    }));
	
	    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
  	
  	}

	readData() {

		if ( JSON.stringify(this.props.dataJSON) != JSON.stringify(this.state.dataToLoad) ) {
			this.state.dataToLoad = []
			this.props.dataJSON.map( (employerInstance) =>
				this.state.dataToLoad.push({ rank: employerInstance.rank, employer: employerInstance.employer,
					employeesCount: employerInstance.employeesCount, medianSalary: employerInstance.medianSalary 
			 	})
			);
			this.state.dataToShow = this.state.dataToLoad.slice()
		}	

	}

	returnDropdownNumber(){
  
	    let arr = []
  
	    for (let i = 0; i < this.state.maxNumOfItemsPerPage; i++){
	      arr.push(<DropdownItem id={i+1} onClick={this.dropdownClick}>{i+1}</DropdownItem>)
	    }
  
    	return arr

  	}

  	dropdownClick(e){
    
	    let number = e.target.id
	    this.setState({currentItemsPerPage: number})
	    this.setState({currentPage: 1})
	    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
	  
  	}

	returnTableItems() {

		let array = []

		for (let i = this.state.currentItemsPerPage; i >=1 ; i--){ 
			let index = this.state.currentItemsPerPage*this.state.currentPage - i
	        array.push(
		         <tr id={this.state.dataToShow[index].rank}>
					<th scope="row">{this.state.dataToShow[index].rank}</th>
		            <td>{this.state.dataToShow[index].employer}</td>
		            <td>{this.state.dataToShow[index].employeesCount}</td>
		            <td>{this.state.dataToShow[index].medianSalary}</td>				         
		        </tr>
	        )

	        if ((index + 1) == this.state.dataToShow.length){
	          break
	        }
      	}

      	return array		
	}

	returnPagination() {
		
		let arr = []
		let arr2 = []
		let numberOfPages = Math.ceil(this.state.dataToShow.length/this.state.currentItemsPerPage)

		if (numberOfPages != 0){			
		
			for (let i = 1; i <= numberOfPages; i++){
				if (i != this.state.currentPage){
		        arr.push(<PaginationItem disabled={false}><PaginationLink id={i} onClick={this.changeCurrentPage} href="#" style={{marginLeft: 1.4}}>{i}</PaginationLink></PaginationItem>)    
		      	} else {
		        arr.push(<PaginationItem disabled={true}><PaginationLink id={i} onClick={this.changeCurrentPage} href="#" style= {{borderColor: "black", backgroundColor: "#5181b8", color: "white", marginLeft: 1.4}}>{i}</PaginationLink></PaginationItem>)  
		      	}
			}
			
			arr2.push(<Row className="Row"><Pagination className="Pagination">{arr}</Pagination></Row>) 
		}

		return arr2		
	}
	
	changeCurrentPage(e){
	
	    this.setState({currentPage: e.target.id})
	    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
	
	}

	shouldComponentUpdate(nextProps, nextState){
	    if (this.state.shouldComponentReRender != nextState.shouldComponentReRender){
	      return true
	    }
	    return false
	}

	sort(e) {

		this.state.sortArrows[e.target.id] = !this.state.sortArrows[e.target.id]
		
			if (this.state.sortArrows[e.target.id] == false){
				this.state.dataToShow = this.state.dataToShow.sort( function(employer1, employer2){
					if (e.target.id == 0){
						if (employer1.rank >= employer2.rank) { return -1 } 	
					}
					if (e.target.id == 1){
						if (employer1.employer >= employer2.employer) { return -1 } 	
					}
					if (e.target.id == 2){
						if (employer1.employeesCount >= employer2.employeesCount) { return -1 } 	
					}
					if (e.target.id == 3){
						if (employer1.medianSalary >= employer2.medianSalary) { return -1 } 	
					}
				}).slice()
			} else {
				console.log("entered")
				this.state.dataToShow = this.state.dataToShow.sort( function(employer1, employer2){
					if (e.target.id == 0){
						if (employer1.rank < employer2.rank) { return -1 } 	
					}
					if (e.target.id == 1){
						if (employer1.employer < employer2.employer) { return -1 } 	
					}
					if (e.target.id == 2){
						if (employer1.employeesCount < employer2.employeesCount) { return -1 } 	
					}
					if (e.target.id == 3){
						if (employer1.medianSalary < employer2.medianSalary) { return -1 } 	
					}
				}).slice()
			}

		this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
	}

	render(){
		this.readData()
		return(
			<div>

				<Row className="justify-content-center mt-3">
		          <Dropdown isOpen={this.state.dropOpen} toggle={this.toggle}>
		            <DropdownToggle style={{borderColor: "black", backgroundColor: '#5181b8'}} caret>
		              Employers/Page
		            </DropdownToggle>
		            <DropdownMenu>
		             {this.returnDropdownNumber()}
		            </DropdownMenu>
		          </Dropdown>
		        </Row>

				<Table bordered className="MainTable">
					<thead>
						<tr>
							<th>Rank{this.state.sortArrows[0] ? <span id = {0} onClick={this.sort} style={{marginLeft: 5}}>&#x25B4;</span> : <span id = {0} onClick={this.sort} style={{marginLeft: 5}}>&#x25BE;</span> }</th>
							<th>Employer{this.state.sortArrows[1] ? <span id = {1} onClick={this.sort} style={{marginLeft: 5}}>&#x25B4;</span> : <span id = {1} onClick={this.sort} style={{marginLeft: 5}}>&#x25BE;</span> }</th>
							<th>Employees count{this.state.sortArrows[2] ? <span id = {2} onClick={this.sort} style={{marginLeft: 5}}>&#x25B4;</span> : <span id = {2} onClick={this.sort} style={{marginLeft: 5}}>&#x25BE;</span> }</th>
							<th>Median salary{this.state.sortArrows[3] ? <span id = {3} onClick={this.sort} style={{marginLeft: 5}}>&#x25B4;</span> : <span id = {3} onClick={this.sort} style={{marginLeft: 5}}>&#x25BE;</span> }</th>
						</tr>
					</thead>
					<tbody>
						{this.returnTableItems()}
					</tbody>
				</Table>

				{this.returnPagination()}
			</div>
		)
	}
}

export default MainComponent;