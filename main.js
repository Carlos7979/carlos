function main() {

    const matrix1 = [];

    for(let i = 0; i < 9; i++) {
        matrix1.push(i+1);
    }

    function numbers(matrix) {
        return matrix[Math.floor(Math.random()*matrix.length)];
    };
    function numbersFirstBiger(matrix){
        return matrix[Math.floor(Math.random()*(matrix.length-1))+1]; // return a random value from 2nd to end position in array in order to be sure we will take later a second number smaller than this
    };
    function numbersLessThan(num){
        return Math.floor(Math.random()*(num - 1)) + 1; //generate a random value smaller than the reference num
    }

    function pushArray(type) {
        const array = [];
        let repeted;
        let firstBiger;
        switch(type) {
            case 0:
                array.push(numbers(matrix1));
                array.push(numbers(matrix1));
                break;
            case 1:
                array.push(-numbers(matrix1));
                array.push(-numbers(matrix1));
                break;
            case 2:
                firstBiger = numbersFirstBiger(matrix1);
                array.push(-firstBiger);
                array.push(numbersLessThan(firstBiger));
                break;
            case 3:
                firstBiger = numbersFirstBiger(matrix1);
                array[1] = firstBiger;
                array[0] = -numbersLessThan(firstBiger);
                break;
            case 4:
                firstBiger = numbersFirstBiger(matrix1);
                array.push(firstBiger);
                array.push(-numbersLessThan(firstBiger));
                break;
            case 5:
                firstBiger = numbersFirstBiger(matrix1);
                array[1] = -firstBiger;
                array[0] = numbersLessThan(firstBiger);
                break;
            case 6:
                repeted = numbers(matrix1);
                array.push(repeted);
                array.push(-repeted);
                break;
            case 7:
                repeted = numbers(matrix1);
                array.push(-repeted);
                array.push(repeted);
                break;
        }
        return array;
    }
    function exercisesGenerator() { // generate an array in random order with every excersice case
        const matrix2 = [];
        const matrix3 = [];
        for(let i = 0; i < 8; i++) {
            matrix2.push(i);
        }
        for (let i = 0; i < 8; i++) {
            const index = matrix2.splice(Math.floor(Math.random()*matrix2.length), 1)[0];
            matrix3.push(pushArray(index));
        };
        return matrix3;
    }

    function constructor(div1, div2, div3, div4, matrix) {
        const num1 = matrix[0];
        const num2 = matrix[1];
        div1.innerHTML = Math.abs(num1);
        num1 > 0 ? div3.innerHTML = "" : div3.innerHTML = "–";

        div2.innerHTML = Math.abs(num2);
        
        num2 > 0 ? div4.innerHTML = "+" : div4.innerHTML = "–";
        return num1 + num2;
    }

    function result2 (buttonId) {
        const identifier = buttonId.split('-')[1];
        const input = document.getElementById(`result-${identifier}`);
        const button = document.getElementById(buttonId);
        const image = document.getElementById(`image-eval-${identifier}`);
        const mes = document.getElementById(`message-i-${identifier}`);
        let response = input.value;
        if(response !== "") response = Number(response);
        const sum = Number(input.getAttribute('res'));
        let source = './images/emblem-ohno.svg';
        let message = '¡No!';

        if(sum === response) {
            source = './images/emblem-OK.svg';
            message = '¡Muy bien!';
            button.style.backgroundColor = 'gray';
        } else {
            // input.style.backgroundColor = 'lightcoral';
            button.style.backgroundColor = 'lightcoral';
        }
        mes.innerHTML = message;
        image.setAttribute("src", source);
        button.disabled = true;
        // button.style.backgroundColor = 'gray';
        button.style.color = 'lightgrey';
        input.disabled = true;
    }

    const exercises = document.getElementById('exercises');
    const matrix = exercisesGenerator();
    for(let i = 0; i < 8; i++) {
        const exercise = document.createElement("DIV");
        exercise.setAttribute("id", `exercise-${i+1}`);
        exercise.setAttribute("class", 'exercise');

            const singI = document.createElement("DIV");
            singI.setAttribute("id", `sing-i-${i+1}`);
            singI.setAttribute("class", "sing");
            exercise.appendChild(singI);

            const numI = document.createElement("DIV");
            numI.setAttribute("id", `num-i-${i+1}`);
            numI.setAttribute("class", "number");
            exercise.appendChild(numI);

            const singF = document.createElement("DIV");
            singF.setAttribute("id", `sing-f-${i+1}`);
            singF.setAttribute("class", "sing");
            exercise.appendChild(singF);

            const numF = document.createElement("DIV");
            numF.setAttribute("id", `num-f-${i+1}`);
            numF.setAttribute("class", "number");
            exercise.appendChild(numF);

            const equal = document.createElement("DIV");
            equal.setAttribute("id", `equal-${i+1}`);
            equal.setAttribute("class", "number");
            equal.innerHTML = "=";
            exercise.appendChild(equal);

            const result = document.createElement("DIV");
            result.setAttribute("id", `result-d-${i+1}`);
            result.setAttribute("class", "result");
                const input = document.createElement("input");
                input.setAttribute("id", `result-${i+1}`);
                input.setAttribute("class", "result-in");
                input.setAttribute("type", "number");
                result.appendChild(input);
            exercise.appendChild(result);

            const evalued = document.createElement("DIV");
            evalued.setAttribute("id", `eval-d-${i+1}`);
            evalued.setAttribute("class", "eval");
                const button = document.createElement("button");
                button.setAttribute("id", `eval-${i+1}`);
                button.setAttribute("class", "eval-but");
                button.innerHTML = "evalúa";
                evalued.appendChild(button);
            exercise.appendChild(evalued);

            const imageEval = document.createElement("DIV");
            imageEval.setAttribute("id", `image-result-${i+1}`);
            imageEval.setAttribute("class", "eval");
                const imageTag = document.createElement("img");
                imageTag.setAttribute("id", `image-eval-${i+1}`);
                imageTag.setAttribute("class", "image-eval");
                imageTag.setAttribute("height", 25);
                imageEval.appendChild(imageTag);
            exercise.appendChild(imageEval);

            const message = document.createElement("DIV");
            message.setAttribute("id", `message-i-${i+1}`);
            message.setAttribute("class", "message");
            exercise.appendChild(message);

        exercises.appendChild(exercise);

        const res = constructor(numI, numF, singI, singF, matrix[i]);
        input.setAttribute("res", res);

        button.addEventListener("click", (event) => {
            const buttonId = event.target.getAttribute('id');

            result2(buttonId);

        });

        input.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
            const inputId = event.target.getAttribute('id');
            const identifier = inputId.split('-')[1];
            result2(`eval-${identifier}`);
            }
        });
    }

    const header = document.getElementById('header');
    header.addEventListener("click", (event) => {
        reload();
    });

    function reload() {
        const matrix = exercisesGenerator();
        for(let i = 0; i < 8; i++) {
            const button = document.getElementById(`eval-${i+1}`)
            const image = document.getElementById(`image-eval-${i+1}`);
            const mes = document.getElementById(`message-i-${i+1}`);
            const numI = document.getElementById(`num-i-${i+1}`);
            const numF = document.getElementById(`num-f-${i+1}`);
            const singI = document.getElementById(`sing-i-${i+1}`);
            const singF = document.getElementById(`sing-f-${i+1}`);
            const input = document.getElementById(`result-${i+1}`);

            mes.innerHTML = '';
            image.setAttribute("src", '');
            button.disabled = false;
            button.style.backgroundColor = 'sandybrown';
            button.style.color = 'black';
            input.disabled = false;
            input.value = '';
            const res = constructor(numI, numF, singI, singF, matrix[i]);
            input.setAttribute("res", res);
            // input.style.backgroundColor = 'lightsteelblue';
        }
    }
}