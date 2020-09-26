///////////////////////////////////////
// Lecture: Hoisting

/*
//FUNCTIONS
calculateAge(1965); // works !

function calculateAge(year) { // functions declaration
    console.log( 2016 - year );
}

calculateAge(1996); // works also !

//--------------------------------------------------------------------

//retirement(1990); // ERROR! DOES NOT WORK :(

var retirement = function(year) { // functions expression
    console.log(65 - (2016-year));
}

retirement(1990); // works !


//VARIABLES
console.log(age) // logs 'undefined'
var age = 23;
console.log(age);// logs 23

function foo() {
    var age = 65;
    console.log(age);
}

foo();
console.log(age);

 */




///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

calculateAge( 1985  );

function calculateAge( year ) {
    console.log( 2016 - year );
    console.log( this ); // logs the window because calculateAge is part of the window
}

var john = {
    name : 'john',
    yearOfBirth: 1990,
    calculateAge : function(){
        console.log( this );// logs the john object because this is part of john
        console.log( 2016 - this.yearOfBirth );

        /*
        function innerFunction() {
            console.log( this ); // logs the window because its not a method
            // but a default function
        }
        innerFunction();
         */
    }
};

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};

mike.calculateAge = john.calculateAge;
mike.calculateAge(); // with log mike object because the this is assigned to the
//mike object when it is icalled


