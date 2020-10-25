import React, {Component} from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';

import '../header.css'

import {NavLink} from 'react-router-dom'

import { Button, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';


import axios from 'axios'
import { bindActionCreators } from 'redux';

import { searchFilmOrSeriesFunction } from '../redux/actions/searchActions'
import {connect} from 'react-redux'



class Header extends Component {

    state={
        menuItem : [
            // {
            //   target: "_self",
            //   title: "Film",
            //   url: "/"
            // },
            // {
            //   target: "_self",
            //   title: "Dizi",
            //   url: "/series"
            // },
            // {
            //   target: "_self",
            //   title: "Çocuk",
            //   url: "/child"
            // },
            // {
            //   target: "_blank",
            //   title: "Canlı Yayın",
            //   url: "/broadcast"
            // }
          ],
          searchedWord:''
          
    }

    
    


    componentDidMount() {
        axios.get(`https://dtv-projects.firebaseio.com/menu.json`)
          .then(res => {
              
            const menuItem = res.data;
            this.setState({ menuItem });
          })
      }

      
      handleChange = event => {
        // this.setState({searchedWord: event.target.value});
        this.props.dispatch(searchFilmOrSeriesFunction(event.target.value))
      }


    render() {
        
        return (
            <Container>
                <Navbar bg="none" variant="dark">
                    
                                <Nav className="mr-auto text-center">

                                    {
                                        this.state.menuItem.map( item => 
                                            <Nav.Link
                                            key={item.title}
                                            activeClassName="nav-active"
                                            className="py-1"
                                            exact
                                            as={NavLink}
                                            to={item.url}> {item.title} </Nav.Link> )
                                    }
                                </Nav>
                                
                                <Navbar.Collapse className="justify-content-end">
                                <TextField
                                        onChange={this.handleChange}
                                        defaultValue={this.state.searchedWord}
                                        className="textField"
                                        id="input-with-icon-textfield"
                                        placeholder="Ara"
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon  />
                                            </InputAdornment>
                                        ),
                                        }}
                                    />
                                    
                                </Navbar.Collapse>
                </Navbar>
            </Container>
        );
    }
}


function mapDispatchToProps(dispatch){
    return {actions:bindActionCreators(searchFilmOrSeriesFunction,dispatch)}
}

export default connect(mapDispatchToProps)(Header);