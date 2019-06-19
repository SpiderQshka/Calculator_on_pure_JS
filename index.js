const calc = document.getElementById('calculator'),
	btns = calc.querySelectorAll('.btn'),
	output = document.getElementById('output');

var storage = '0',
	operators = ['+', '-', '*', '/'];

function calculate(nums, operators){

	var n1 = nums[0],
		n2 = nums[1],
		operator = operators[0],
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
		operator = operators[i]

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
		default:
			throw new Error('Something went wrong..');
		}

		i++;
	}

	return result || 'Error';

}

function handler(e){
	var target = e.target;

	if(target.matches('button')){
		if(target.matches('.number')){

			if(storage.length === 1 && storage[0] === '0'){
				storage = target.innerHTML;
			}
			else{
				storage += target.innerHTML;
			}

			output.innerHTML = storage;

		}
		else if(
			target.matches('.plus') ||
			target.matches('.minus') ||
			target.matches('.pow') ||
			target.matches('.del')
			){

			if(!operators.includes(storage[storage.length - 1])){
				storage += target.innerHTML;
			}

			output.innerHTML = storage;

		}
		else if(target.matches('.dot')){

			if(!~storage.indexOf('.')){
				storage += target.innerHTML;
			}

			output.innerHTML = storage;

		}
		else if(target.matches('.equal')){

			var nums = [],
				currentOperators = [],
				lastOperatorIndex = 0;

			for(var i = 0; i < storage.length; i++){
				if(operators.includes(storage[i])){

					if(i === 0) continue;

					currentOperators.push(storage[i]);

					nums.push(storage.slice(lastOperatorIndex, i));

					lastOperatorIndex = i + 1;
				}
				else if(i === storage.length - 1){

					nums.push(storage[i]);

				}
			}

			storage = calculate(nums, currentOperators).toString();

			output.innerHTML = storage;

		}
		else if(target.matches('.backspace')){

			storage = storage.slice(0, -1);
			if(!storage.length) storage = '0';
			output.innerHTML = storage;

		}
		else{
			storage = '0';
			output.innerHTML = storage;
		}
	}
}

calc.addEventListener('click', handler);