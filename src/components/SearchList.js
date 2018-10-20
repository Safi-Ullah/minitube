import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { youtubeConfig } from '../config';
import {
    ListGroup, ListGroupItem,
    Row, Image, Col, Pager
} from 'react-bootstrap';
import { SyncLoader } from 'halogenium';

class SearchList extends React.Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            query: '',
            items: [],
            nextPageToken: '',
            prevPageToken: '',
            loading: false
        };
    }

    componentDidMount() {
        this.search();
    }

    itemSelect(videoId, videoDesc, videoTitle) {
        this.props.setVideoDetails(videoId, videoTitle, videoDesc);
    }

    setQuery(e) {
        this.setState({ 'query': e.target.value });
    }

    prepareGETRequest() {
        const { part, type, videoCaption, totalResults } = youtubeConfig;
        const base_url = youtubeConfig.youtubeAPIUrl;
        const key = youtubeConfig.apiKey;
        const query = this.state.query;

        return (
            `${base_url}/search?part=${part}&q=${query}&type=${type}&videoCaption=${videoCaption}&maxResults=${totalResults}&order=viewCount&key=${key}`
        );
    }

    sendRequest(requestUrl) {
        this.setState({ loading: true });
        axios.get(requestUrl).then(res => {
            this.setState({
                items: res.data.items, loading: false,
                nextPageToken: res.data.nextPageToken,
                prevPageToken: res.data.prevPageToken
            });
        });
    }

    search(e) {
        if (e) {
            e.preventDefault();
        }
        let requestUrl = this.prepareGETRequest();
        this.sendRequest(requestUrl);
    }

    nextPage(e) {
        let getRequest = this.prepareGETRequest();
        if (this.state.nextPageToken) {
            getRequest += '&pageToken=' + this.state.nextPageToken;
        }
        this.sendRequest(getRequest);
        e.preventDefault();
    }

    prevPage(e) {
        let getRequest = this.prepareGETRequest();
        if (this.state.prevPageToken) {
            getRequest += '&pageToken=' + this.state.prevPageToken;
        }
        this.sendRequest(getRequest);
        e.preventDefault();
    }

    render() {
        let results = this.state.items;
        if (results && results.length) {
            return (
                <div>
                    {this.state.loading ? <div className='loading-component'><SyncLoader size="16px" color="#337ab7" /></div> : null}
                    <SearchBar query={this.state.query}
                        setQuery={this.setQuery} search={this.search} />

                    <ListGroup>
                        {
                            results.map(result => {
                                return (
                                    <ListGroupItem key={results.indexOf(result)} 
                                        active={result.id.videoId === this.props.videoId}
                                        onClick={() =>
                                            this.itemSelect(result.id.videoId,
                                                result.snippet.description,
                                                result.snippet.title)}>
                                        <Row>
                                            <Col xs={3}>
                                                <Image alt={result.snippet.name} responsive
                                                    src={result.snippet.thumbnails.default.url} />
                                            </Col>
                                            <Col xs={9}>
                                                <h4> {result.snippet.title}</h4>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                    <Pager>
                        <Pager.Item previous disabled={!this.state.prevPageToken} onClick={this.prevPage}>&larr; Previous</Pager.Item>
                        <Pager.Item next disabled={!this.state.nextPageToken} onClick={this.nextPage}>Next &rarr;</Pager.Item>
                    </Pager>
                </div>
            )
        }
        else
            return (
                <div>
                    <Row>
                        <SearchBar setQuery={this.setQuery} search={this.search} />
                    </Row>
                    <Row>
                        <h2>Enter a Search Query</h2>
                    </Row>
                </div>
            )
    }
}

export default SearchList;