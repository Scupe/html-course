let first = prompt("Enter number for 1 exercise: ")
Check(first)

Simple();

let third = prompt('Enter number for 3 exercise: ');
easy(third);

// 1 exercise
function Check (num){
	if(isNaN(first) === false){
		if(first%2 == 0) {
			alert('Num is even')
		}
		else{
			alert('Num is not even')
		}
	}
	else{
		alert('Emty line')
	}
	}

// 2 exercise

function Simple() {
	let array = [];
	let search = 0;
	let sam = 0;
  
	for (let b = 2; ; b++) {
	  let isPrime = true;
  
	  for (let i = 2; i < b; i++) {
		if (b % i === 0) {
		  isPrime = false;
		  break;
		}
	  }
  
	  if (isPrime) {
		array.push(b);
		search++;
		sam += b;
	  }
  
	  if (search === 5) {
		break;
	  }
	}
  
	console.log(array);
	console.log(sam);
	alert("Your sum is: " + sam);
  }
  

// 3 exercise
function easy(third){
	let result = 0;
	let ones = "0";
	let transform;
	for(let y = 0; y < third; y++){
		ones = ones + "1";
		transform = parseInt(ones);
		 result += transform;
	}
	alert(result)
	}