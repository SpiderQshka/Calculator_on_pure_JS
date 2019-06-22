const calc = document.getElementById('calculator'),
	btns = calc.querySelectorAll('.btn'),
	output = document.getElementById('output');

var storage = '0',
	operators = ['+', '-', '*', '/'];


// Обновление вывода калькулятора
function updateResult(){
	output.innerHTML = storage;
};


// Парсинг введённых данных, возвращает объект со свойствами: 
// nums(массив введённых чисел)
// operators(массив введённых операторов)
function parseStorage(){
	return {
		nums: storage.match(/\d+(\.\d*)?/g),
		operators: storage.match(/[\+\-\*\/]/g)
	};
}


// Вычисление результата ввода. Принимает:
// nums(массив введённых чисел)
// operators(массив введённых операторов)
// Возвращает результат вычислений, тип string;
function calculate(nums, operators){

	var n1,
		n2,
		operator,
		result,
		i = 0;

	while(i < nums.length - 1){
		if(!result){
			n1 = nums[i];
		}
		else{
			n1 = result;
		}
		n2 = nums[i + 1];

		if(!operators.length){
			break;
		}		
		else{
			operator = operators[i];
		}

		console.log(n1, operator, n2);

		switch(operator){
		case '+':
			result = (+n1 + +n2);
			break;
		case '-':
			result = (+n1 - +n2);
			break;
		case '/':
			result = (+n1 / +n2);
			break;
		case '*':
			result = (+n1 * +n2);
			break;
		}

		i++;
	}

	if(!isFinite(result)){
		console.error('Result is Infinity or NaN');
		return storage;
	}

	try{
		return result.toString();
	}
	catch(e){
		console.error('You have entered an unvaliable expression');
		return storage;
	}

}


// Обработка кликов на кнопки калькулятора
function handler(e){
	var target = e.target;

	if(target.matches('button')){
		if(target.matches('.number')){

			// Если в памяти один символ, равный нулю, или бесконечность - заменить введённым числом. 
			// Иначе - конкатенировать ввод и память
			if(storage.length === 1 && storage[0] === '0'{
				storage = target.innerHTML;
			}
			else{
				storage += target.innerHTML;
			}

			updateResult();

		}
		else if(
			target.matches('.plus') ||
			target.matches('.minus') ||
			target.matches('.pow') ||
			target.matches('.del')
			){

			// Если прошлый символ не является оператором - конкатенировать ввод и память.
			if(!operators.includes(storage[storage.length - 1])){
				storage += target.innerHTML;
			}

			updateResult();

		}
		else if(target.matches('.dot')){

			// Если в последнем в памяти числе нет символа '.' - конкатенировать ввод и память.
			var lastNum = parseStorage().nums[parseStorage().nums.length - 1];

			if(!lastNum.includes('.')){
				storage += target.innerHTML;
			}

			updateResult();

		}
		else if(target.matches('.equal')){

			var nums = parseStorage().nums,
				currentOperators = parseStorage().operators;

			storage = calculate(nums, currentOperators);

			updateResult();

		}
		else if(target.matches('.backspace')){

			storage = storage.slice(0, -1);
			if(!storage.length) storage = '0';

			updateResult();

		}
		else{
			storage = '0';

			updateResult();

		}
	}
}

calc.addEventListener('click', handler);