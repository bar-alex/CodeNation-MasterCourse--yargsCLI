// --add --title "Spiderman" --actors "Andrew Garfield, Tom Holland, etc"
// --add --titles "movie-name:actor,actor,actor; movie-name:actor,actor; movie-name"


const yargs = require("yargs");
const { addMovie, listMovies } = require("./utils");
// console.log( yargs.argv );

const app = (yargsObj) => {

    console.log(yargsObj);

    if (yargsObj.add) {
    
        // for a single title
        if (yargsObj.title) {
            // capture user input and create a movieObj
            const movieObj = { 
                    title: yargsObj.title, 
                    actor: (yargsObj.actor && yargsObj.actor.indexOf(',')>-1) 
                            ? yargsObj.actor.split(',').map( it => it.trim() )      // "actor, actor" => ["actor", "actor"]
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
                        actor: it.split(':')[1] 
                            ? it.split(':')[1].split(',').map( it => it.trim() )
                            : [],  // array of actors
                    } } ) // title:'', actor:[]
            // call addMovie for each object in the array
            movieObjects.forEach( it => addMovie(it) );
            // print the list of movies
            console.log( listMovies() );
        };
    }

    if(yargsObj.usage){
        const helpText = '\nAdds movies to the list, can be used in the following formats: \n' 
            +`  node ${ yargsObj['$0'] } --add --title "<movie title>" --actor "<actor>[, <actor2>, .. <actorN>]"\n`
            +`  node ${ yargsObj['$0'] } --add --titles "<movie title> : <actor> [, <actor2>, .. <actorN>] ; <movie title> : <actor> [, <actor2>, .. <actorN>]"\n`
        console.log(helpText);
    }
}


app(yargs.argv);
