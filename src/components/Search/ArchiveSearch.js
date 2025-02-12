import React, { Component } from "react"
import DatePicker from "react-datepicker";
import moment from 'moment';
import Badge from 'react-bootstrap/Badge';
import ReactPaginate from 'react-paginate';
import { usePaginateArray } from '../../utils/utilities';
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here

import { faWeight } from "@fortawesome/free-solid-svg-icons";

// get our fontawesome imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ArchiveSearch extends Component {
  state = {
      startDate: null,
      endDate: null,
      allPublications: [],
      queryPublications: [],
      currentPublications: [],
      perPage: 5,
      currentPage: 1,
      pageCount: 0,
  }
  /**
   * React lifecycle method that will inject the data into the state.
   */
  async componentDidMount() {
    const { publications } = this.props

    let searchPublications = [];
    publications.forEach((publication) => {
      let publicationObj = {
        slug: publication.node.fields.slug,
        groups: publication.node.frontmatter.categories,
        date: publication.node.frontmatter.date,
        dateofacceptance: publication.node.frontmatter.dateofacceptance,
        description: publication.node.frontmatter.description,
        impactfactor: publication.node.frontmatter.impactfactor,
        journal: publication.node.frontmatter.journal,
        journaltypes: publication.node.frontmatter.journaltypes,
        pubmed: publication.node.frontmatter.pubmed,
        authors: publication.node.frontmatter.tags,
        title: publication.node.frontmatter.title,
        url: publication.node.frontmatter.url
      }

      searchPublications.push(publicationObj);
    });
    this.setState({ allPublications: searchPublications });
  }

  handleStartDateChange = date => { this.setState({ startDate: date}); };
  handleEndDateChange = date => { this.setState({ endDate: date}); };

  onSearchPublications = () => {
    if (this.state.startDate == null || this.state.endDate == null) {
        alert("Error! Please enter a valid date");
    } else {
        let tempPublications = [];
        let publications = this.state.allPublications;
    
        let startDate = moment(this.state.startDate, "DD/MM/YYYY");
        let endDate = moment(this.state.endDate, "DD/MM/YYYY");
    
        if (publications != null ){
            publications.forEach((pub) => {
                let pubDate = moment((pub.date).substring(0, (pub.date).indexOf('T')), "YYYY/MM/DD");
                if (pubDate.isBetween(startDate, endDate, 'days', '[]'))
                    tempPublications.push(pub);
                     
           });
        
        const pageCount = Math.ceil(tempPublications.length / this.state.perPage);
        const pageData =  usePaginateArray(tempPublications, this.state.currentPage, this.state.perPage);
        //console.log('pageData', pageData);

        this.setState({ 
            queryPublications: pageData.data, 
            pageCount: pageCount,
            currentPublications: tempPublications,
        });
      }
    }
  }

  handlePageClick = (data) => {
    let selected = data.selected + 1;
    const pageData =  usePaginateArray(this.state.currentPublications, selected, this.state.perPage);
    
    this.setState({ 
        queryPublications: pageData.data, 
        currentPage: selected
    });
  };
  
  render(){
        return (
            <div>
                <div>
                    <div className={'desktop-only'}>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            dateFormat="dd/MM/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            isClearable
                            placeholderText="Select a date"
                        />
                        <span style={{ fontWeight: "bold", margin:"10px"}}>TO</span>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            dateFormat="dd/MM/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="Select a date"
                            isClearable
                        />
                        &nbsp;&nbsp;
                        <button onClick={this.onSearchPublications} style={{ width: "15%"}}>
                        <FontAwesomeIcon icon={faSearch} /> Search 
                        </button>
                    </div>
                </div>

                <div className={'mobile-only'}>
                    <div style={{marginLeft: '24vw'}}>
                        <span style={{fontWeight: 'bold'}}>START DATE:</span>
                        <br />
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                isClearable
                                placeholderText="Select a date" 
                                style={{width: "100%"}}
                            />
                            <br />
                            <br />
                            <span style={{ fontWeight: "bold"}}>END DATE:</span>
                            <br />
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="Select a date"
                                isClearable
                            />
                        </div>
                        <br /><br />
                        <div className={"centered"}>
                            <button onClick={this.onSearchPublications} style={{ width: "50%", justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon icon={faSearch} /> Search 
                            </button>
                        </div>
                    </div>
                    <br />
                    <hr className={'mobile-only'}/>
                
            <div>          
                    {(this.state.queryPublications).length > 0 &&  <h1 style={{ fontSize: '20px', marginTop: '5%', marginBottom: '2%', fontWeight: 'bold', textDecorationLine: 'underline'}}>Publication(s)</h1>}
                    
                    {(this.state.queryPublications).map(item => {
                        return (
                            <div key={`row_${item.title}`}>
                                <span style={{ fontSize: "12px", fontWeight: "bold", color: '#000000', textTransform: 'uppercase'}}>
                                    <time dateTime={moment(item.date).format('MMMM D, YYYY')}>
                                        {moment(item.date).format('D MMMM YYYY')}
                                    </time>
                                </span>
                                <br />
                                <span style={{ fontSize: "18px", fontWeight: "bold"}}>
                                    <a target="_blank" style={{color: '#003399'}} href={`${item.slug}`}>{item.title}</a>
                                </span>
                                <br />
                                <p><span style={{ fontSize: "14px", lineHeight: "1px"}}>{item.description}</span></p>
                                <span style={{ fontSize: "16px"}}> Authors: 
                                {
                                    (item.authors).map(author => {
                                        var searchAuthor = author.replace(/\s+/g, '-').toLowerCase();
                                        return(
                                            <Badge className="badge-author-group" pill variant="primary">
                                            <a target="_blank" style={{color: '#ffffff', fontWeight: "normal"}} href={`/author/${searchAuthor}`}>{author}</a>
                                            </Badge>
                                        )  
                                    })
                                }
                                </span>
                                <br />
                                <span style={{ fontSize: "16px"}}> Groups:
                                {
                                    (item.groups).map(group => {
                                        var searchGroup = group.replace(/\s+/g, '-').toLowerCase();
                                        return(
                                            <Badge className="badge-author-group" pill variant="danger">
                                                <a target="_blank" style={{color: '#ffffff', fontWeight: "normal"}} href={`/group/${searchGroup}`}>{group}</a>
                                            </Badge>
                                        )  
                                    })
                                }
                                </span>
                                <div style={{borderBottom: '1px solid #D3D3D3', marginTop: '5%', marginBottom: '5%'}}></div>
                            </div>
                        )
                    })}
                    
                    {(this.state.queryPublications).length > 0 && 
                        <ReactPaginate
                            previousLabel={'← Previous'}
                            nextLabel={'Next →'}
                            breakLabel={<span className="gap">...</span>}
                            breakClassName={'break-me'}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            previousLinkClassName={"previous_page"}
                            nextLinkClassName={"next_page"}
                            disabledClassName={"disabled"}
                            activeClassName={"active"}
                        />
                    }

                </div>   
                <ScrollUpButton />  
            </div>
        )
    }   
}
export default ArchiveSearch 