import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import ResponsiveEmbed from 'react-responsive-embed';

class YoutubePlayer extends React.Component {
    render() {
        if (this.props.show) {
            return (
                <div>
                    <Jumbotron>
                        <ResponsiveEmbed src={`https://www.youtube.com/embed/${this.props.id}`} allowFullScreen />
                        <h2>{this.props.title}</h2>
                        <h4>{this.props.desc}</h4>
                    </Jumbotron>
                </div>
            );
        }
        else
            return (
                <div/>
            )
    }
}

export default YoutubePlayer;