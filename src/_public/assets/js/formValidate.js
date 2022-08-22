/* eslint-disable linebreak-style */
function Validator(options){
    // save rules
    var selectorRules = {};
    function validate(inputElement, rule){
        // value : inputElement.value
        // test : rule.test
        var errorElement = inputElement.parentElement.parentElement.querySelector(options.errorSelector);
        console.log("errorElement", errorElement);
        var errorMessage;
        // get the rule of selector
        var rules = selectorRules[rule.selector];
        // Iterate through the rules and check if there is an error then stop the checking
        for(var i =0; i< rules.length; ++i){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage){
                break;
            } 
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            errorElement.classList.add("is-block");
            inputElement.parentElement.parentElement.classList.add("invalid");
        }else{
            errorElement.innerText = "";
            inputElement.parentElement.parentElement.classList.remove("invalid");
        }
        return !errorMessage; 
    }
    // get the element for the form to validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        // when click submit form
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true;
            //done when the user clicks submit, the validate message is displayed
            options.rules.forEach((rule)=>{
                var inputElement = formElement.querySelector(rule.selector);
                var isValid =  validate(inputElement, rule);
                if(!isValid){
                    isFormValid = false;
                    const messagePlease = document.querySelector(".c-errormess__main");
                    messagePlease.innerText = "入力内容を確認してください。";
                    console.log("mess", messagePlease);
                }
            });
            
            if(isFormValid){
                if(typeof options.onsubmit === "function"){
                    //get all property is name Do not get disabled properties
                    var enableInputs = formElement.querySelectorAll("[name]:not([disabled])");
                    // convert nodelist into array
                    var formValure = Array.from(enableInputs).reduce((values, input)=>{
                        return (values[input.name] = input.value) && values;
                    }, {}); 
                    // return the data entered from the form
                    options.onsubmit(formValure);
                } else {
                    // submit with default behavior
                    formElement.submit();
                }
            }
        };

        options.rules.forEach((rule)=>{
            // Save the rules for each input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                //Handling the case when the onblur goes out
                inputElement.onblur = ()=>{
                    validate(inputElement, rule);
                };
                // handle when the user enters the input, hide the error message
                inputElement.oninput = ()=>{
                    var errorElement = inputElement.parentElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.parentElement.classList.remove("invalid");
                };
            }
        });
    }  
    
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || "Vui lòng nhập trường này";
        }
    };
};
    
Validator({
    form: "#c-form",
    errorSelector: ".c-errormess",
    rules: [
        Validator.isRequired("#name", "『氏名』を入力してください。"),
        Validator.isRequired("#phone", "『電話番号』を入力してください"),
        Validator.isRequired("#email", "『メールアドレス』を入力してください。"),
        Validator.isRequired("#content", "『お問い合わせ内容』を入力してください。")
    ],
    onSubmit: function (data) {
        // Call API
        console.log(data);
    }
});


