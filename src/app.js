// --add --title "Spiderman" --actors "Andrew Garfield, Tom Holland, etc"
// --add --titles "movie-name:actor,actor,actor; movie-name:actor,actor; movie-name"


const yargs = require("yargs");
const { addMovie, listMovies } = require("./utils");
// console.log( yargs.argv );

const app = (yargsObj) => {

    // console.log(yargsObj);

    if (yargsObj.add) {
    
        // normalize naming
        if(yargsObj.actor && !yargsObj.actors) 
            yargsObj.actors = yargsObj.actor

        // for a single title
        if (yargsObj.title) {
            // capture user input and create a movieObj
            const movieObj = { 
                    title: yargsObj.title, 
                    actors: (yargsObj.actors && yargsObj.actors.indexOf(',')>-1) 
                            ? yargsObj.actors.split(',').map( it => it.trim() )      // "actor, actor" => ["actor", "actor"]
                            : [],      // undefined is fine, or i could use ??
                };
            // console.log(movieObj);;
            addMovie(movieObj);
            const returnValue = listMovies()
            console.log(returnValue);
        }

        // for multiple titles
        if (yargsObj.titles) {
            // movie1:actor,actor; movie2:actor, actor; etc
            const movieObjects = 
                yargsObj.titles     // string of "movie: actor,actor; movie: actor,actor"
                .split(';')         // array of "movie: actor, actor"
                .map( it => { 
                    return { 
                        title: it.split(':')[0],                                    // title
                        actors: it.split(':')[1] 
                            ? it.split(':')[1].split(',').map( it => it.trim() )
                            : [],  // array of actors
                    } } ) // title:'', actor:[]
            // call addMovie for each object in the array
            movieObjects.forEach( it => addMovie(it) );
            // print the list of movies
            console.log( listMovies() );
        };
    }

    if(yargsObj.usage || yargsObj.info){
        const helpText = '\nAdds movies to the list, can be used in the following formats: \n' 
            +`  node ${ yargsObj['$0'] } --add --title "<movie title>" --actors "<actor>[, <actor2>, .. <actorN>]"\n`
            +`  node ${ yargsObj['$0'] } --add --titles "<movie title> : <actor> [, <actor2>, .. <actorN>] ; <movie title> : <actor> [, <actor2>, .. <actorN>]"\n`
            +`  node ${ yargsObj['$0'] } --<usage | --info>\n`

        console.log(helpText);
    }
}


app(yargs.argv);
