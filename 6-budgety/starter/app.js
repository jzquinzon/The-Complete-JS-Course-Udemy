
//BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0) {
            this.percentage = Math.round(this.value / totalIncome * 100);
        }
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
         allItems : {
             exp: [],
             inc: []
         },
        totals: {
             exp: 0,
             inc: 0
        },
        budget: 0,
        percentage: -1
    }


    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current, index, array){
            sum += current.value;
        });
        data.totals[type] = sum;
    }

    return {
        addItem: function(type, des, val){
            var newItem,ID;
            data.allItems[type].length > 0 ? ID = data.allItems[type][data.allItems[type].length - 1].id + 1 : ID = 0;
            type === 'exp' ? newItem =  new Expense(ID, des, val): newItem = new Income(ID, des, val);

            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id){
            var ids, index;

            ids = data.allItems[type].map(function(curr){
                return curr.id;
            });

            index = ids.indexOf(id);

            if( index !== -1 ){
                data.allItems[type].splice(index,1);
            }

        },

        testing: function() {
            console.log(data);
        },

        calculateBudget : function(){

            // calculate total income & expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function(){

            data.allItems.exp.forEach(function (curr) {
               curr.calcPercentage(data.totals.inc);
            });

        },

        getPercentages: function(){
            var allPercentages = data.allItems.exp.map(function(curr){
                return curr.getPercentage(data.totals.inc);
            });
            return allPercentages;
        },

        getBudget: function(){
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            };
        }
    }

})();


//UI CONTROLLER
var UIController = (function() {
    var DOMstrings ={
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expPercentLabel: '.item__percentage'
    };


    return{
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var element, newHtml, html;
            // Create HTML string with placeholder text
            if( type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }else if( type === 'exp' ) {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID){
            var element, parent;

            element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);

        },

        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

           fieldsArr[0].focus();

        },
        getDOMstrings: function(){
            return DOMstrings;
        },

        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else
            {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }


        },

        displayPercentages: function(percentages){
            var fields;
            fields = document.querySelectorAll(DOMstrings.expPercentLabel);

            var nodeListForEach = function(nList, callback){
              for( var i = 0; i < nList.length; i++ ){
                  callback(nList[i], i);
              }
            };

            nodeListForEach(fields,function(node, index){
                if( percentages[index] > 0) {
                    node.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        }

    }

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener( 'keypress', function(event){

            if( event.code === 'Enter' ){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };

    var updateBudget = function () {

        // 1. Calculate Budget
        budgetCtrl.calculateBudget();
        // 2. Return the Budget
        var budget = budgetCtrl.getBudget();
        console.log(budget);
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);

    }

    var updatePercentages = function(){
        var percentages;
        // calculate percentages
        budgetCtrl.calculatePercentages();

        // read percentages from budget controller
        percentages = budgetCtrl.getPercentages();
        // Update the UI with the new percentages
       UICtrl.displayPercentages(percentages);

    }

    var ctrlAddItem = function(){
        var input, newItem;
        //1. Get input data
        input = UICtrl.getInput();

        if ( input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
            //console.log(input);
            //2. Add new item to Budget Controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();

            //4. calculate and update budget
            updateBudget();

            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, id;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if ( itemID ){
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            // 1. delete item from data structure
            budgetCtrl.deleteItem(type,id);
            // 2. delete item from UI
            UICtrl.deleteListItem(itemID);
            // 3. update and show new budget
            updateBudget();

            // update and show new percentage
            updatePercentages();
        }
    }

    return {
        init: function(){
            console.log('APPLICATION has started.');
            UICtrl.displayBudget({
                budget: 0,
                percentage:-1,
                totalInc: 0,
                totalExp:0
            })
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();


