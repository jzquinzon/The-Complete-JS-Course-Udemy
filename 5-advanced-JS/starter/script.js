//Function constructor
/*
var john = {
        name: 'john',
        yearOfBirth: 1990,
        job: 'teacher'
};


// Creating Objects : Function Constructor
var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}


// add functions or properties
Person.prototype.calculateAge = function(){
    console.log( 2016 - this.yearOfBirth );
}

Person.prototype.lastName = 'Smith';

var john = new Person('john',1990, 'teacher');
var jane = new Person('jane',1990, 'designer');
var mark = new Person('mark',1990, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);



// Object.create
var personProto = {
    calculateAge: function(){
        console.log(2016 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'john';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1969},
    job: {value: 'designer'}
}
});



//Lecture: Functions returning functions

function interviewQuestion(job) {
    if (job === 'designer'){
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if ( job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');


/////LECTURE : IIFE

//normal way
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();

//IIFE
//wrapping in parentheses tricks JS to seeing it as a expression
//since its an expression js runs it during execution
(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();


(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);

// causes error because score is hidden from the outside scope
console.log(score);

 */

/////////////
// Lecture : Closures

/*
function retirement( retirementAge ){
    var a = ' years age left until retirement.';
    return function( yearOfBirth ){
        var age = 2016 - yearOfBirth;
        console.log( retirementAge - age + a);
    }
}

var retirementUS = retirement(66);
retirementUS(1990);
retirement(66)(1990);

 */

// can also be written as function Question(){}
var Question = function(question, answers, correctAnswer){
    this.question = question;
    this.answers = question;
    this.correctAnswer = correctAnswer;
    this.askQuestion = function() {
        console.log(question + '\n' + answers[0] + '\n' + answers[1] + '\n' + answers[2])
    }
    this.displayAnswer = function(answer) {
        var score = 0;
        if (answer == this.correctAnswer) {
            console.log('Correct Answer!');
            score += 1;
        }
        else{
            console.log('Wrong Answer!');
        }
        return score;
    }
}

var simpleMath = new Question('What is 2+2?', ['0: 0', '1: 2', '2: 4'], 2);
var christmasDay = new Question('When is Christmas?', ['0: December 25th', '1: January 1st', '2: October 31st'], 0);
var daysInAWeek = new Question('How many days are in a Week?', ['0: 3', '1: 7', '2: 5'], 1);

var questions = [simpleMath, christmasDay, daysInAWeek];
var question = questions[Math.floor(Math.random()*questions.length)];
question.askQuestion();

var answer = prompt('Enter answer.');
console.log( answer + ' ' + question.correctAnswer);
var score = question.displayAnswer(answer);

(function(){
    var oldQuestion;

    while(true){

        console.log('-----------------------------\n');
        console.log('Your current score is ' + score);
        questions.splice(questions.indexOf(question), 1);
        oldQuestion = question;
        question = questions[Math.floor(Math.random()*questions.length)];
        question.askQuestion();
        answer = prompt('Enter answer.');
        if (answer == 'exit'){
            break;
        }
        score += question.displayAnswer(answer);
        questions.push(oldQuestion);


    }
})();














