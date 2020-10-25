import React, {Component} from 'react';
import '../../films.css'
import {films, series} from '../../data/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee, faPlus} from '@fortawesome/free-solid-svg-icons'

import {
    Row,
    Image,
    Container,
    Card,
    Col,
    Button
} from 'react-bootstrap';

import {connect} from 'react-redux'

class HomePage extends Component {

    state = {
        films: new films,
        series: new series,
        isMouseOn: false,
        overItemId: 0,
        searchingWord: '',

        favedFilms: JSON.parse(localStorage.getItem("favedFilms")) != null
            ? JSON.parse(localStorage.getItem("favedFilms"))
            : [],
        favedSeries: JSON.parse(localStorage.getItem("favedSeries")) != null
            ? JSON.parse(localStorage.getItem("favedSeries"))
            : []
    }

    onMouseEnter = (id) => {

        this.setState(state => ({
            isMouseOn: !state.isMouseOn,
            overItemId: id
        }));
    }
    onMouseLeave = () => {
        this.setState(state => ({
            isMouseOn: !state.isMouseOn,
            overItemId: 0
        }))
    }

    addFavFilm = (item) => {
        this.setState(state => ({
            favedFilms: JSON.parse(localStorage.getItem("favedFilms")) != null
                ? JSON.parse(localStorage.getItem("favedFilms"))
                : []
        }))
        let controlStillInclude = this
            .state
            .favedFilms
            .some(film => film.id == item.id)
        if (controlStillInclude == true) {

            this.state.favedFilms = this
                .state
                .favedFilms
                .filter(favs => favs.id != item.id)

            localStorage.setItem('favedFilms', JSON.stringify(this.state.favedFilms));
            return
        }

        this
            .state
            .favedFilms
            .push(item)
        localStorage.setItem('favedFilms', JSON.stringify(this.state.favedFilms));

    }
    addFavSerie = (item) => {
        this.setState(state => ({
            favedSeries: JSON.parse(localStorage.getItem("favedSeries")) != null
                ? JSON.parse(localStorage.getItem("favedSeries"))
                : []
        }))
        let controlStillInclude = this
            .state
            .favedSeries
            .some(film => film.id == item.id)
        if (controlStillInclude == true) {

            this.state.favedSeries = this
                .state
                .favedSeries
                .filter(favs => favs.id != item.id)

            localStorage.setItem('favedSeries', JSON.stringify(this.state.favedSeries));
            return
        }
        this
            .state
            .favedSeries
            .push(item)
        localStorage.setItem('favedSeries', JSON.stringify(this.state.favedSeries));

    }

    render() {

        return (
            <Container style={{
                marginTop: '500px'
            }}>
                

                <Row className="mb-5">

                    <Col md={'12'}>
                        <h3>Filmler</h3>
                    </Col>

                    {this
                        .state
                        .films
                        .data
                        .filter(item => item.title.toLowerCase().includes(this.props.searchingWord))
                        .map(item => <Col xs={6} sm={6} md={3} lg={2} key={item.id} className="mt-4 p-0 ">

                            <Card
                                className="bg-dark text-white  mr-2"
                                onMouseEnter={() => this.onMouseEnter(item.id)}
                                onMouseLeave={() => this.onMouseLeave(item.id)}>
                                <Card.Img
                                    className=""
                                    style={{
                                    maxHeight: '230px'
                                }}
                                    src={require(`../../assets/images/${item.image}`)}
                                    alt="Card image"/>
                                <Card.ImgOverlay className="p-0 pr-2 pt-2 "></Card.ImgOverlay>

                                {(() => {
                                    if (this.state.isMouseOn == true && this.state.overItemId == item.id) {
                                        return (
                                            <div className="card-fav-button" onClick={() => this.addFavFilm(item)}>

                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    transform={this
                                                    .state
                                                    .favedFilms
                                                    .some(favs => favs.id == item.id)
                                                    ? {
                                                        rotate: 45
                                                    }
                                                    : {
                                                        rotate: 0
                                                    }}/>

                                            </div>
                                        )
                                    } else if (this.state.isMouseOn == false) {
                                        return (
                                            <div></div>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.state.isMouseOn == true && this.state.overItemId == item.id) {
                                        return (
                                            <div className="card-sub-title">
                                                {item.title}
                                                <br/> {item.subTitle}
                                                <br/> {item.published_date}

                                            </div>
                                        )
                                    } else if (this.state.isMouseOn == false) {
                                        return (
                                            <div></div>
                                        )
                                    }
                                })()}

                                {this.state.isMouseOn == true && this.state.overItemId == item.id && <div className="card-hover"></div>
}
                            </Card>
                        </Col>)}

                    <Col md={'12'}>
                        <h3>Diziler</h3>
                    </Col>

                    {/* SERİES START */}
                    {this
                        .state
                        .series
                        .data
                        .filter(item => item.title.toLowerCase().includes(this.props.searchingWord))
                        .map(item => <Col xs={6} sm={6} md={3} lg={2} key={item.id} className="mt-4  p-0 ">

                            <Card
                                className="bg-dark text-white  mr-2"
                                onMouseEnter={() => this.onMouseEnter(item.id)}
                                onMouseLeave={() => this.onMouseLeave(item.id)}>
                                <Card.Img
                                    className=""
                                    style={{
                                    maxHeight: '230px'
                                }}
                                    src={require(`../../assets/images/${item.image}`)}
                                    alt="Card image"/>
                                <Card.ImgOverlay className="p-0 pr-2 pt-2 "></Card.ImgOverlay>

                                {(() => {
                                    if (this.state.isMouseOn == true && this.state.overItemId == item.id) {
                                        return (
                                            <div className="card-fav-button">
                                                <FontAwesomeIcon
                                                    transform={this
                                                    .state
                                                    .favedSeries
                                                    .some(favs => favs.id == item.id)
                                                    ? {
                                                        rotate: 45
                                                    }
                                                    : {
                                                        rotate: 0
                                                    }}
                                                    icon={faPlus}
                                                    onClick={() => this.addFavSerie(item)}/>

                                            </div>
                                        )
                                    } else if (this.state.isMouseOn == false) {
                                        return (
                                            <div></div>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.state.isMouseOn == true && this.state.overItemId == item.id) {
                                        return (
                                            <div className="card-sub-title">
                                                {item.title}
                                                <br/> {item.subTitle}
                                                <br/> {item.published_date}

                                            </div>
                                        )
                                    } else if (this.state.isMouseOn == false) {
                                        return (
                                            <div></div>
                                        )
                                    }
                                })()}

                                {this.state.isMouseOn == true && this.state.overItemId == item.id && <div className="card-hover"></div>
}
                            </Card>
                        </Col>)}

                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {

    return {searchingWord: state.searchReducer}

}

export default connect(mapStateToProps)(HomePage);