import { youtubeConfig } from './config';

export const decodeHtml = html => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

export const prepareSearchGETRequest = query => {
    const {
        part, type, videoCaption, totalResults,
        apiKey: key, youtubeAPIUrl: baseUrl
    } = youtubeConfig;

    return (
        `${baseUrl}/search?part=${part}&q=${query}&type=${type}&videoCaption=${videoCaption}&maxResults=${totalResults}&order=viewCount&key=${key}`
    );
};
