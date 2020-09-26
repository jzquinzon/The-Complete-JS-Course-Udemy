/*
var firstName = 'John';

console.log(firstName);

var lastName = 'Quinzon';
var age = 22;

var fullAge = true;
console.log(fullAge);

var job;
console.log(job);

job = 'Teacher';
console.log(job);
 */

/*
* Variable mutation and type coercion


var firstName = 'John';
var age = 22;

console.log(firstName + ' ' + age);

var job, isMarried;
job = 'Teacher';
isMarried = false;

console.log(firstName + ' is a ' + age + ' year old ' + job + '. Is he Married? ' + isMarried);

//Varaible Mutation
age = 'twenty two';
job = 'driver';

alert(firstName + ' is a ' + age + ' year old ' + job + '. Is he Married? ' + isMarried);

var lastName = prompt('What is his last Name?');
console.log(firstName + ' ' + lastName);
 */

/*
* Basic Operators


var year, yearJohn, yearMark;
now= 2020;
ageJohn = 22;
ageMark = 25;

//Math operators
yearJohn = now - ageJohn;
yearMark = now - ageMark;

console.log(yearJohn);
console.log(now + 2);
console.log(now * 2);
console.log(now / 10);

//Logical Operators
var johnOlder = ageJohn < ageMark;
console.log(johnOlder);

// typeof operator
console.log(typeof johnOlder);
console.log(typeof ageJohn);
console.log(typeof 'string');

 */

/*
*Operator Precedence


var now = 2020;
var yearJohn = 1998;
var fullAge = 21;
var isFullAge = now - yearJohn >= fullAge;

*/

/*
Coding Challenge 1


var markBMI, johnBMI, markHeight, markWeight, johnHeight, johnWeight, markHigherBMI;

markHeight = 2.6; //meters
johnHeight = 3.2;

markWeight = 83; //kg
johnWeight = 90;

johnBMI = johnWeight / ( johnHeight * johnHeight );
markBMI = markWeight / ( markHeight * markHeight );
markHigherBMI = markBMI > johnBMI;

console.log('Mark\'s BMI: ' + markBMI + ' John\'s BMI: ' + johnBMI);
console.log( 'Is Mark\'s BMI higher than John\'s? ' + markHigherBMI );

 */
/*
The Ternary Operator and Switch Statements


var firstName = 'John';
var age = 16;

age >= 18 ? console.log(firstName + ' drinks beer.'):  console.log(firstName + ' drinks juice.');
var drink = age >= 18 ? 'beer' : 'juice';
console.log(drink);

var job = 'teacher';
switch(job){
    case 'teacher':
    case 'instructor':
        console.log(firstName + ' teaches kids how to code.');
        break;
    case 'driver':
        console.log(firstName + ' drives an uber in Lisbon.');
        break;
    case 'designer':
        console.log(firstName + ' designs beautiful websites.');
        break;
    default:
        console.log(firstName + ' does something else.');
}
 */

/*
Coding Challenge 2

var johnAvg, mikeAvg, biggestAvg, winner;

johnAvg = (89 + 120 + 103) / 3;
mikeAvg = (116 +94 + 123) / 3;

if( johnAvg === mikeAvg ) {
    winner = 'none. It was a tie.';
    biggestAvg = johnAvg;
}
else {
    winner = johnAvg > mikeAvg ? ' John\'s team.' : ' Mike\'s team.';
    biggestAvg = johnAvg > mikeAvg ? johnAvg : mikeAvg;

}

console.log('Mike\'s team\'s avg: ' + mikeAvg + ' John\'s team\'s avg: ' + johnAvg);
console.log('The team with the highest average score was ' + winner);




console.log('----------------------------------');

var maryAvg = ( 97 + 134 + 105) / 3;

if( maryAvg > biggestAvg) {
    biggestAvg = maryAvg;

}

 */

/*
Coding Challenge #3


var tip = function( amount ){
    if( amount < 50 ){
        return amount * .2;
    }
    else if( amount <= 200 ){
        return amount * .15;
    }
    else {
        return amount * .1;
    }
}

var tips = [tip(124), tip(48), tip(268)];
var totals =[124 + tips[0], 48+tips[1], 268 + tips[2]];

console.log(tips);
console.log(totals);



 */
/*
Coding Challenge 4


var john = {
    height: 180,
    mass: 89,
    BMIcalc: function () {
        return this.mass / (this.height * this.height);
    }
};

var mark = {
    height: 179,
    mass: 89,
    BMIcalc: function () {
        return this.mass / (this.height * this.height);
    }
};

mark.BMI = mark.BMIcalc();
john.BMI = john.BMIcalc();

console.log('John\'s BMI: ' + john.BMI, 'Mark\s BMI: ' + mark.BMI);

if( john.BMI > mark.BMI ){
    console.log('John has the highest BMI.');
}
else if( mark.BMI > john.BMI ){
    console.log('Mark has the highest BMI.');
}
else{
    console.log('They have the same BMI.');
}


 */

/*
Coding Challenge 5
 */

var tip = {
    johnBills:[124,48,268,180],
    tipCalc: function(){
        this.tips = [];
        this.totals = [];
        for( var i = 0; i < this.johnBills.length; i++){
            var bill = this.johnBills[i];
            var percentage;

            if( bill < 50 ){
                percentage = .2;
            }
            else if(bill <= 200){
                percentage = .15;
            }
            else{
                percentage = .1;
            }

            this.tips.push(bill * percentage);
            this.totals.push(bill + bill * percentage);
        }
    }
}

tip.tipCalc();
console.log(tip);