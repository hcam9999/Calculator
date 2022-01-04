const initApp = () => {

    const currentElement = document.querySelector(".current-value")
    const previousElement = document.querySelector(".previous-value")
    let itemArray = []  
    const equationArray = []
    let newNumber = false
    let result = 0
    let operator = ""
    let currentNum = 0
    //add value from button click to display
    const numButtons = document.querySelectorAll('.number')
    numButtons.forEach(button => {
        button.addEventListener("click", () => {
            const newInput = button.textContent //get value of button clicked, set it to newInput
                if (newNumber){
                    currentElement.value =      //if newinput = decimal then display 0. if not, then just display new input
                    newInput === '.'
                        ? "0."
                        : newInput;
                     newNumber = false;
                     } else if (currentElement.value.includes('.') && newInput === '.') { //if value already has decimal point, then cannot add another decimal
                        return;
                     } else {
                        currentElement.value =
                        currentElement.value == 0 && currentElement.value.length == 1 && newInput !== '.'
                            ? newInput
                            : `${currentElement.value}${newInput}`; //add on to currentinput
                }
                       
            });
        });
    

    //get operator + - * :
    const opButtons = document.querySelectorAll('.key-operator')
    opButtons.forEach(button => {
        button.addEventListener("click", () => {
        
            if (newNumber) {
                previousElement.textContent = ""
                itemArray = []
            }
            operator = button.textContent //get value of operator button, set it to operator
            currentNum = parseFloat(currentElement.value) //set current element to currentNum

            if(!itemArray.length && currentNum == 0 )
            return

            //if itemArray is empty
            if (!itemArray.length) {
                itemArray.push(currentNum, operator)
                previousElement.textContent = `${currentNum} ${operator}`  //display first number and operator above the results
                return newNumber = true; //need to get new number
            }


            //if itemArray has value
            if (itemArray.length) {
                itemArray.push(currentNum)

                const equationObj = {
                    num1: parseFloat(itemArray[0]),
                    num2: parseFloat(itemArray[2]),
                    op: itemArray[1],
                    operation: function () {
                        if (this.op == "/" && this.num2 == 0)           //if divide by 0, result will be undefined
                            return
                        else
                            return (`${this.num1} ${this.op} ${this.num2}`)

                    }
                    
                }
                result = eval(equationObj.operation())
                currentElement.value = result.toFixed(9)
                previousElement.textContent = `${result} ${operator}`
                newNumber = true;
                itemArray = [result, operator];
            }
      
            });
        });

    //eual button -- onclick, display results of operation
    const equalButton = document.querySelector(".equal-key")
    equalButton.addEventListener("click", () => {
        if (!itemArray.length) {
            return currentNum;
        } else {
            currentNum = parseFloat(currentElement.value)
            itemArray.push(currentNum)
            equationObj = {
                num1: parseFloat(itemArray[0]),
                num2: parseFloat(itemArray[2]),
                op:   itemArray[1],
                operation: function () {
                    if (this.op == "/" && this.num2 == 0)           //if divide by 0, result will be undefined
                        return

                    else
                        return (`${this.num1} ${this.op} ${this.num2}`)

                }
        }

        }
        result = eval(equationObj.operation())
        currentElement.value = result.toFixed(9)
        previousElement.textContent = `${equationObj.operation()} =`
        newNumber = true;
        itemArray = [result, operator];
    })

    //AC button -- onclick, set display element to 0, clear top display text, clear itemArray
     const clearButton = document.querySelector(".clear-key")  //query AC button element
     clearButton.addEventListener("click", () => {
         currentElement.value = 0;
         previousElement.textContent=""
         itemArray = []
     }) 
     
    //DELETE button
    const deleteButton = document.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        currentElement.value = currentElement.value.slice(0, -1);
        if (!currentElement.value.length) currentElement.value = 0;
    });

    //Sign Change button
    const signChangeButton = document.querySelector('.signChange');
    signChangeButton.addEventListener('click', () => {
        currentElement.value = parseFloat(currentElement.value) * -1;
    });
}   
document.addEventListener("DOMContentLoaded", initApp);