import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import ResponsiveEmbed from 'react-responsive-embed';
import { decodeHtml } from '../utils';

const YoutubePlayer = ({ show, id, title, desc }) => show ? <div>
    <Jumbotron>
        <ResponsiveEmbed allowFullScreen
            src={`https://www.youtube.com/embed/${id}`}
        />
        <h3>{ decodeHtml(title) }</h3>
        <h5>{ decodeHtml(desc) }</h5>
    </Jumbotron>
</div> : <div/>;

export default YoutubePlayer;
