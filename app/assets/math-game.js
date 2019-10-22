let actionStack = [];

document.addEventListener("DOMContentLoaded", ()=> {
    const problem = new Problem('medium');
    const gameBox = document.querySelector('#game-box');
    const answerDisplay = document.querySelector('#answer-display');
    const undo = document.querySelector('#undo');
    let openParens = 0;
 
    const submitButton = document.querySelector('#submit');

    problem.generateProblem();
    problem.renderProblem();
    let open = document.querySelector('#open');
    let close = document.querySelector('#close');
    document.addEventListener('click', (event) =>{
      console.log(event.target);  
    })
   
    gameBox.addEventListener('click', (event) => {
        if ((event.target.tagName == "BUTTON" && !(event.target.id == 'undo')) && !(event.target.id === 'clear')){
            actionStack.push(event.target);
        }

        if (event.target.className === 'prim'){
           event.target.dataset.used = 'true';
           disableAllPrims();
           enableAllOps();
           checkForSubmit();
           enableCloseParenIfOpenParens();
           answerDisplay.innerText += event.target.innerText;
        }

        if (event.target.className === 'operator'){
            answerDisplay.innerText += event.target.innerText;
            enableUnusedPrims();
            disableAllOps();
         }
         
         if (event.target.id == 'undo'){
             let lastAction = actionStack.pop();

             answerDisplay.innerText = answerDisplay.innerText.substring(0, answerDisplay.innerText.length - 1);

             if(lastAction.className == 'prim'){
                 lastAction.dataset.used = false;
                 enableUnusedPrims();
                 disableAllOps();
             } else if (lastAction.className == 'operator'){
                disableAllPrims();
                enableAllOps();
                checkForSubmit();
             } else if (lastAction.id == 'open'){
                 openParens--;
                 enableCloseParenIfOpenParens();
             } else if (lastAction.id == 'close'){
                 openParens++;
                 enableCloseParenIfOpenParens();
             }

             if(actionStack.length == 0){
                answerDisplay.innerText = '';
                let prims = document.querySelectorAll('.prim');
                open.disabled = false;
                openParens = 0;
                actionStack = [];
                prims.forEach((prim) => {
                prim.disabled = false
                prim.dataset.used = 'false';
                });
                checkForSubmit()
            } else if (actionStack[actionStack.length - 1].className == 'prim'){
                disableAllPrims();
                enableAllOps();
                enableCloseParenIfOpenParens();
                checkForSubmit();
             } else if (actionStack[actionStack.length - 1].className == 'operator'){
                disableAllPrims();
                enableAllOps();
                checkForSubmit();
            } else if (actionStack[actionStack.length - 1].id == 'open'){
                enableUnusedPrims();
                disableAllOps();
                disableCloseParen();
            } else if (actionStack[actionStack.length - 1].id == 'close'){
                checkForSubmit()
                enableCloseParenIfOpenParens();
            }
         }

        if (event.target.id === 'clear'){
            answerDisplay.innerText = '';
            let prims = document.querySelectorAll('.prim');
            open.disabled = false;
            openParens = 0;
            actionStack = [];
            prims.forEach((prim) => {
                prim.disabled = false
                prim.dataset.used = 'false';
                });
            checkForSubmit()
        }

        if (event.target.id === 'open'){
            answerDisplay.innerText += event.target.innerText;
            openParens++;
            enableUnusedPrims();
            disableAllOps();
            disableCloseParen();
        }

        if (event.target.id === 'close'){            
            openParens--;
            answerDisplay.innerText += event.target.innerText;
            checkForSubmit()
            enableCloseParenIfOpenParens();
        }


        if (event.target.id == 'submit'){
            if (math.evaluate(answerDisplay.innerText) == problem.finalAnswer()){
                alert('Correct!')
            } else {
                alert(`WROOOOOOONG! Your answer: ${math.evaluate(answerDisplay.innerText)}`)
            }
        }
        
    }) // end of gamebox eventListener
    

    function enableUnusedPrims(){
        let prims = document.querySelectorAll('.prim');
        // console.log(prims)
        prims.forEach((prim) => {
            // debugger
           if (prim.dataset.used == 'false'){
                console.log(prim, prim.dataset.used)
                prim.disabled = false;
            }
            
        })
    }

    function disableAllPrims(){
        let prims = document.querySelectorAll('.prim');

        prims.forEach((prim) => {
                prim.disabled = true
        })
    }

    function disableAllOps(){
        let ops = document.querySelectorAll('.operator');

        ops.forEach(op => {
            op.disabled = true;
        })
    }

    function enableAllOps(){
        let ops = document.querySelectorAll('.operator');

        ops.forEach(op => {
            op.disabled = false;
        })
    }

    function enableCloseParen(){
        close.disabled = false;
    }

    function disableCloseParen(){
        close.disabled = true;
    }

    function enableCloseParenIfOpenParens(){
        if (openParens > 0){
            enableCloseParen();
        } else {
            disableCloseParen();
        }
    }
   
    function checkForSubmit(){
        let prims = Array.from(document.querySelectorAll('.prim'));

        if(prims.every(prim => prim.dataset.used == 'true') && openParens == 0){
            submitButton.disabled = false;           
            open.disabled = true;
            disableAllPrims();
            disableAllOps();
        } else {
            submitButton.disabled = true;
        }
    }
   




   
    // const form = document.getElementById('answer-form');
    // form.addEventListener ('input',(event)=> {
    //     event.preventDefault();
    //     console.log(event.target.value);
    //     let input = event.target.value
    //     if (input.length > 0 && !isNaN(parseInt(input[input.length-1])) ) {
    //         let result = math.evaluate(event.target.value);
    //         console.log(result);
    //         document.getElementById("result").value = result;
    //     }
    //     else
    //     document.getElementById("result").value = input;

    // })
















})
