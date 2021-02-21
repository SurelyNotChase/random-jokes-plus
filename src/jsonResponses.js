const _ = require('underscore');

const jokes = [
    {
        q: 'What do you call a very small valentine?',
        a: 'A valen-tiny!',
  },
    {
        q: 'What did the dog say when he rubbed his tail on the sandpaper?',
        a: 'Ruff, Ruff!',
  },
    {
        q: "Why don't sharks like to eat clowns?",
        a: 'Because they taste funny!',
  },
    {
        q: 'What did the boy cat say to the girl cat?',
        a: "You're Purr-fect!",
  },
    {
        q: "What is a frog's favorite outdoor sport?",
        a: 'Fly Fishing!',
  },
    {
        q: 'I hate jokes about German sausages.',
        a: 'Theyre the wurst.',
  },
    {
        q: 'Did you hear about the cheese factory that exploded in France?',
        a: 'There was nothing left but de Brie.',
  },
    {
        q: 'Our wedding was so beautiful ',
        a: 'Even the cake was in tiers.',
  },
    {
        q: 'Is this pool safe for diving?',
        a: 'It deep ends.',
  },
    {
        q: 'Dad, can you put my shoes on?',
        a: 'I dont think theyll fit me.',
  },
    {
        q: 'Can February March?',
        a: 'No, but April May',
  },
    {
        q: 'What lies at the bottom of the ocean and twitches?',
        a: 'A nervous wreck.',
  },
    {
        q: 'Im reading a book on the history of glue.',
        a: 'I just cant seem to put it down.',
  },
    {
        q: 'Dad, can you put the cat out?',
        a: 'I didnt know it was on fire.',
  },
    {
        q: 'What did the ocean say to the sailboat?',
        a: 'Nothing, it just waved.',
  },
    {
        q: 'What do you get when you cross a snowman with a vampire?',
        a: 'Frostbite',
  },
];

function getRandomJoke(max = jokes.length) {
    _.shuffle(jokes);
    return JSON.stringify(jokes[Math.floor(Math.random() * Math.floor(max))]);
}

const getJokeResponse = (request, response, params, acceptedTypes) => {


    const paramData = params;
    if (!paramData.limit || paramData.limit <= 0) paramData.limit = 1;
    if (paramData.limit > 10) paramData.limit = jokes.length;

    const jokesArray = [];
    for (let i = 0; i < params.limit; i += 1) {
        jokesArray.push(getRandomJoke());
    }




    let xmlString = '<response>'

    for (let joke of jokesArray) {
        joke = JSON.parse(joke);
        xmlString = xmlString + `<joke> <q>${joke.q}</q> <a>${joke.a}</a></joke>`


    }

    xmlString = xmlString + '</response>'

    if (acceptedTypes.includes('text/xml')) {
        response.writeHead(200, {
            'Content-Type': 'text/xml',
            'Content-Length': Buffer.byteLength(xmlString, 'utf8')
        });

        response.write(xmlString);

    } else {

        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(jokesArray), 'utf8')

        });
        response.write(JSON.stringify(jokesArray));
    }
    response.end();
};


const getJokeResponseMeta = (request, response, params, acceptedTypes) => {


    const paramData = params;
    if (!paramData.limit || paramData.limit <= 0) paramData.limit = 1;
    if (paramData.limit > 10) paramData.limit = jokes.length;

    const jokesArray = [];
    for (let i = 0; i < params.limit; i += 1) {
        jokesArray.push(getRandomJoke());
    }


    if (acceptedTypes.includes('text/xml')) {


        let xmlString = '<response>'

        for (let joke of jokesArray) {
            joke = JSON.parse(joke);
            xmlString = xmlString + `<joke> <q>${joke.q}</q> <a>${joke.a}</a></joke>`


        }

        xmlString = xmlString + '</response>'

        response.writeHead(200, {
            'Content-Type': 'text/xml',
            'Content-Length': Buffer.byteLength(xmlString, 'utf8')
        });


    } else {

        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(jokesArray), 'utf8')
        });

    }
    response.end();
};




////** I figured it was easier to just put it all in one function. **
//const getJokeResponse = (request, response, acceptedTypes) => {
//    response.writeHead(200, {
//        'Content-Type': 'application/json',
//    });
//
//    response.write(getRandomJoke());
//
//    response.end();
// };

module.exports = {

    getJokeResponse,
    getJokeResponseMeta,

};
