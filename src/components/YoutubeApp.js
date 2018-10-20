import React from 'react';
import SearchList from './SearchList';
import YoutubePlayer from './YoutubePlayer';
import { Row, Col } from 'react-bootstrap'

class YoutubeApp extends React.Component {
    constructor(props) {
        super(props);
        this.setVideoDetails = this.setVideoDetails.bind(this);
        this.state = {
            videoId: '',
            videoDesc: '',
            videoTitle: '',
            show: false
        };
    }

    setVideoDetails(videoId, videoTitle, videoDesc) {
        this.setState({
            videoId, show: true,
            videoTitle, videoDesc
        });
    }

    render() {
        return (
            <div>
                <nav className='navbar navbar-default'>
                    <div className='container-fluid'>
                        <div className="navbar-header">
                            <Row>
                                <Col sm={12}>
                                    <a className="navbar-brand brand-name">MiniTube</a>
                                    <img alt='logo' className='logo' src={require('../images/logos/yt-logo.svg')} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </nav>
                <div className='container-fluid'>
                    <Row>
                        {
                            this.state.show
                                ? <Col sm={7}>
                                    <YoutubePlayer title={this.state.videoTitle} desc={this.state.videoDesc}
                                        id={this.state.videoId} show={this.state.show}
                                        height={this.state.playerHeight} width={this.state.playerWidth} />
                                </Col>
                                : <Col sm={3} />
                        }
                        <Col sm={this.state.show ? 5 : 6}>
                            <SearchList setVideoDetails={this.setVideoDetails}
                                videoId={this.state.videoId}
                                items={this.state.items} nextPage={this.nextPage}
                                prevPage={this.prevPage} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default YoutubeApp;