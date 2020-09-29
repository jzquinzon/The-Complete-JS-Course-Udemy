
//const & let
const name6 = 'Jane Smith';
let age6 = 23;


//let is block scoped and var is function scoped
//ES5
function driversLicense5(passedTest) {

    if (passedTest){
        var firstName = 'John';
        var yearOfBirtth = 1990;


    }
    // this works cause var is function scoped
    console.log(firstName + ', born in ' + yearOfBirtth + ' is now officially allowed to drive a car.');
}

driversLicense5(true);

function driversLicense6fail(passedTest) {


    if (passedTest){
        let firstName = 'John';
        const yearOfBirtth = 1990;


    }
    //won't work cause let & const are block scoped
    console.log(firstName + ', born in ' + yearOfBirtth + ' is now officially allowed to drive a car.');
}

function driversLicense6(passedTest) {
    let firstName;
    const yearOfBirtth = 1990;

    if (passedTest){
        firstName = 'John';
        //this would not work cause yearOfBirth has to be in the same block from where it is declared
        // yearOfBirth = 1990


    }
    //will work now since let & const are in the same block
    console.log(firstName + ', born in ' + yearOfBirtth + ' is now officially allowed to drive a car.');
}

driversLicense6(true);
