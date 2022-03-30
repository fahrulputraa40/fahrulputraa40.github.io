window.addEventListener('load', function(){
    let screen = document.getElementsByClassName('calculator-screen')[0];
    let var1 = 0, var2 = null, operator = null, varActive = 0;
    let var1Float = false, var2Float = false, result = false;
    let var1percentage = false, var2percentage =false;

    let setValueVariable = function(number){
        if(parseInt(screen.value) === 0 && parseInt(number) === 0)
            return;
        if(varActive == 1){
            if(var2 == null)
                var2 = number;
            else
                var2 += number;
        }else{
            if(var1 === 0)
                var1 = number;
            else
                var1 += number;
        }
        if(parseInt(screen.value) === 0)
            screen.value = number;
        else
            screen.value += number;
    };

    let clear = function(){
        var1percentage = false;
        var2percentage =false;
        screen.value = "0"
        var1 = 0;
        varActive = 0;
        operator = null;
        var2 = null;
        result = false
    };

    [...document.getElementsByTagName('button')].forEach((el)=>{
        el.addEventListener('click', function(e){
            if(e.target.classList.contains('all-clear')){
                clear();
            }else if(e.target.classList.contains('number')){
                if(result)
                    clear();
                setValueVariable(e.target.innerHTML)
            }
            else if(e.target.classList.contains('decimal')){
                if(result)
                    return;
                if(varActive === 0 && var1Float === false){
                    screen.value += ".";
                    var1Float = true;
                    var1 += ".";
                }else if(varActive === 1 && var2Float === false){
                    screen.value += ".";
                    var2Float = true;
                    var2 += ".";
                }
            }
            else if(e.target.classList.contains('operator')){
                if(var2 !== null || result)
                    return;
                varActive = 1;
                if(operator !== null){
                    screen.value = var1;
                }
                screen.value += e.target.innerHTML;
                operator = e.target.innerHTML;
            }
            else if(e.target.classList.contains('equal-sign')){
                if(operator === null && var1percentage == true && var2 === null){
                    var1 = var1Float ? parseFloat(var1) : parseInt(var1);
                    var1 /= 100;
                    screen.value = var1;
                    result = true;
                    return;
                }
                if(operator === null || var1 == 0 || var2 === null)
                    return;
                result = true;
                var1 = var1Float ? parseFloat(var1) : parseInt(var1);
                var2 = var2Float ? parseFloat(var2) : parseInt(var2);
                if(var1percentage)
                    var1 /= 100;
                if(var2percentage)
                    var2 /= 100;
                switch (operator) {
                    case "+":
                        screen.value = var1 + var2;
                        break;
                    case "-":
                        screen.value = var1 - var2;
                        break;
                    case "÷":
                        screen.value = var1 / var2;
                        break;
                    case "×":
                        screen.value = var1 * var2;
                        break;
                    default:
                        break;
                }
            }else if(e.target.classList.contains("percentage")){
                screen.value += e.target.innerHTML;
                if(varActive == 0){
                    var1percentage = true;
                }
                else{
                    var2percentage = true;
                }
            }
        });
    })
});