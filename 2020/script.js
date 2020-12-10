function day1A(){
	function findValue() {
	  var year = 2020;
	  for(i=0;i<report.length;i++){
		var result = report.indexOf(year-report[i]);
		if (result >= 0) {
			return [report[i],report[result]];
		  }
	  }
	}
	var result = findValue();
	var product = result[0] * result[1];
	return [result,product];
}

function day1B(){
	function findValue() {
	  var year = 2020;
		for(i=0;i<report.length;i++){
			for (j=0;j<report.length;j++){
				var result = report.indexOf(year-report[i]-report[j]);
				if (result >= 0) {
					return [report[i],report[j],report[result]];
				}
			}
		}
	}
	var result = findValue();
	var product = result[0] * result[1] * result[2];
	return [result,product];
}

function day2(qPart){
	function passCheckA(passObject){
		var pass = false;
		var min = passObject.count[0];
		var max = passObject.count[1];
		var letter = passObject.letter;
		var password = passObject.pass;
		var regEx = new RegExp(letter, "g")
		if(password.match(regEx) != null && password.match(regEx).length >= min && password.match(regEx).length <= max){
			pass = true;
		}
		return pass;
	}
	function passCheckB(passObject){
		var pass = false;
		var pos1 = passObject.count[0]-1;
		var pos2 = passObject.count[1]-1;
		var letter = passObject.letter;
		var password = passObject.pass;
		if( (password.charAt(pos1) == letter && password.charAt(pos2) != letter) || (password.charAt(pos1) != letter && password.charAt(pos2) == letter) ) {
			pass = true;
		}
		return pass;
	}
	passCount = 0;
	for(i=0;i<passwordArray.length;i++){
		var passObject = passwordArray[i];
		if(qPart == "A"){
			var pass = passCheckA(passObject);
		}
		else if(qPart == "B"){
			var pass = passCheckB(passObject);
		}
		if(pass){
			passCount++;
		}
	}
	console.log(passCount);
	return passCount;
}

function day3(qPart){
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url : "toboggan-map.json",
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonpCallback: 'tobogganMap',
		success : function (json) {
			if(qPart=="A"){var treeCount = tobogganRouteA(json);}
			else if(qPart=="B"){var treeCount = tobogganRouteB(json);}
			$(".result").text(treeCount);
		}
	});
	
	function tobogganRouteA(tobogganMap){
		var map = tobogganMap.map.split("|");
		var treeCount = 0;
		for(i=0;i<map.length;i++){
			var xPos = i*3;
			while(xPos>=map[i].length){
				xPos-=map[i].length;
			}
			var point = map[i].substring(xPos,xPos+1);
			if(point=="#"){
				treeCount++;
			}
		}
		return treeCount;
	}
	
	function tobogganRouteB(tobogganMap){
		var routes = [[1,1],[3,1],[5,1],[7,1],[1,2]];
		var map = tobogganMap.map.split("|");
		var treeCountArray = [];
		
		for(i=0;i<routes.length;i++){
			var x = routes[i][0];
			var y = routes[i][1];
			treeCount = 0;
			for(j=0;j<map.length;j+=y){
				var xPos = j*x;
				while(xPos>=map[j].length){
					xPos-=map[j].length;
				}
				var point = map[j].substring(xPos,xPos+1);
				if(point=="#"){
					treeCount++;
				}
			}
			treeCountArray.push(treeCount);
		}
		console.log(treeCountArray);
		var product = 1;
		for (var k = 0; k < treeCountArray.length; k++) {
			product *= treeCountArray[k];
		}
		console.log(product);
		return product;
	}
}

function day4(qPart){
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url : "passport-batch.json",
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonpCallback: 'passportBatch',
		success : function (json) {
			if(qPart=="A"){var passCount = processPassportsA(json);}
			else if(qPart=="B"){var passCount = processPassportsB(json);}
			$(".result").text(passCount);
		}
	});
	
	function processPassportsA(passportBatch){
		var passportCount = 0;
		for(i=0;i<passportBatch.length;i++){
			if(	passportBatch[i].hasOwnProperty('byr') &&
				passportBatch[i].hasOwnProperty('iyr') &&
				passportBatch[i].hasOwnProperty('eyr') &&
				passportBatch[i].hasOwnProperty('hgt') &&
				passportBatch[i].hasOwnProperty('hcl') &&
				passportBatch[i].hasOwnProperty('ecl') &&
				passportBatch[i].hasOwnProperty('pid')){
				passportCount++;
				}
		}
		return passportCount;
	}
	
	function processPassportsB(passportBatch){
		var passportCount = 0;
		for(i=0;i<passportBatch.length;i++){
			var passport = passportBatch[i];
			if(	passport.hasOwnProperty('byr') &&
				passport.hasOwnProperty('iyr') &&
				passport.hasOwnProperty('eyr') &&
				passport.hasOwnProperty('hgt') &&
				passport.hasOwnProperty('hcl') &&
				passport.hasOwnProperty('ecl') &&
				passport.hasOwnProperty('pid')){
					if( byrVal(passport.byr) &&
						iyrVal(passport.iyr) &&
						eyrVal(passport.eyr) &&
						hgtVal(passport.hgt) &&
						hclVal(passport.hcl) &&
						eclVal(passport.ecl) &&
						pidVal(passport.pid)) {
						passportCount++;
					}
				}
			
		}
		return passportCount;
	}
	
	function byrVal(byr){
		var passed = false;
		var year = parseInt(byr);
		if(year >= 1920 && year <= 2002){passed = true;}
		console.log('byr: ' + byr);
		if(passed){console.log('byr passed');} else {console.log('byr failed');}
		return passed;
	}
	function iyrVal(iyr){
		var passed = false;
		var year = parseInt(iyr);
		if(year >= 2010 && year <= 2020){passed = true;}
		console.log('iyr: ' + iyr);
		if(passed){console.log('iyr passed');} else {console.log('iyr failed');}
		return passed;
	}
	function eyrVal(eyr){
		var passed = false;
		var year = parseInt(eyr);
		if(year >= 2020 && year <= 2030){passed = true;}
		console.log('eyr: ' + eyr);
		if(passed){console.log('eyr passed');} else {console.log('eyr failed');}
		return passed;
	}
	function hgtVal(hgt){
		var passed = false;
		var unit = hgt.substring(hgt.length-2);
		var height = parseInt(hgt.replace(unit,''));
		if( (unit == 'cm' && height >= 150 && height <= 193) ||
			(unit == 'in' && height >= 59 && height <= 76)){
			passed = true;
			}
		console.log('hgt: ' + hgt);
		if(passed){console.log('hgt passed');} else {console.log('hgt failed');}
		return passed;
	}
	function hclVal(hcl){
		var passed = false;
		var regEx = new RegExp(/[a-f0-9]/,'g');
		if(hcl.replace(regEx,'') == '#' && hcl.length == 7){passed = true;}
		console.log('hcl: ' + hcl);
		if(passed){console.log('hcl passed');} else {console.log('hcl failed');}
		return passed;
	}
	function eclVal(ecl){
		var passed = false;
		var validEcls = ['amb','blu','brn','gry','grn','hzl','oth'];
		for(e=0;e<validEcls.length;e++){
			if(ecl == validEcls[e]){passed = true;}
		}
		console.log('ecl: ' + ecl);
		if(passed){console.log('ecl passed');} else {console.log('ecl failed');}
		return passed;
	}
	function pidVal(pid){
		var passed = false;
		var regEx = new RegExp(/[0-9]{9}/,'g');
		if(pid.replace(regEx,'') == ''){passed = true;}
		console.log('pid: ' + pid);
		if(passed){console.log('pid passed');} else {console.log('pid failed');}
		return passed;
	}
	
}

function day5(qPart){
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url : "boarding-pass-list.json",
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonpCallback: 'boardingPassList',
		success : function (json) {
			if(qPart=="A"){var seatNum = findSeatA(json);}
			else if(qPart=="B"){var seatNum = findSeatB(json);}
			$(".result").text(seatNum);
		}
	});
	
	function findSeatA(boardingPassList){
		var boardingPasses = boardingPassList.boardingPasses;
		var seatIDs = [];
		for(i=0;i<boardingPasses.length;i++){
		//for(i=0;i<1;i++){
			//var pass = "FBFBBFFRLR";
			var pass = boardingPasses[i];

			var rows = [];
			for(r=0;r<128;r++){rows.push(r);}
			var seats = [];
			for(s=0;s<8;s++){seats.push(s);}
			
			
			for(j=0;j<pass.length;j++){
				if(pass[j]=="F"){
					rows = rows.slice(0,rows.length/2);
				}
				else if(pass[j]=="B"){
					rows = rows.slice(rows.length/2);
				}
				else if(pass[j]=="R"){
					seats = seats.slice(seats.length/2);
				}
				else if(pass[j]=="L"){
					seats = seats.slice(0,seats.length/2);
				}
			}
			var seatID = rows[0] * 8 + seats[0];
			seatIDs.push(seatID);
		}
		console.log(Math.max(...seatIDs));
		return Math.max(...seatIDs);
	}

	function findSeatB(boardingPassList){
		var boardingPasses = boardingPassList.boardingPasses;
		var seatIDs = [];
		for(i=0;i<boardingPasses.length;i++){
		//for(i=0;i<1;i++){
			//var pass = "FBFBBFFRLR";
			var pass = boardingPasses[i];

			var rows = [];
			for(r=0;r<128;r++){rows.push(r);}
			var seats = [];
			for(s=0;s<8;s++){seats.push(s);}
			
			
			for(j=0;j<pass.length;j++){
				if(pass[j]=="F"){
					rows = rows.slice(0,rows.length/2);
				}
				else if(pass[j]=="B"){
					rows = rows.slice(rows.length/2);
				}
				else if(pass[j]=="R"){
					seats = seats.slice(seats.length/2);
				}
				else if(pass[j]=="L"){
					seats = seats.slice(0,seats.length/2);
				}
			}
			var seatID = rows[0] * 8 + seats[0];
			seatIDs.push(seatID);
		}
		seatIDs = seatIDs.sort(function(a, b){return a-b});
		for(k=0;k<seatIDs.length;k++){
			if(seatIDs[k+1]-seatIDs[k]>1){
				var seat = seatIDs[k] + 1;
				}
		}
		return seat;
	}
}

function day6(qPart){
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url : "customs.json",
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonpCallback: 'customsAnswers',
		success : function (json) {
			if(qPart=="A"){var answers = analyzeAnswersA(json);}
			else if(qPart=="B"){var answers = analyzeAnswersB(json);}
			$(".result").text(answers);
		}
	});
	
	function analyzeAnswersA(json){
		var answers = json.customs;
		var answerCount = 0;
		for(i=0;i<answers.length;i++){
			var uniqueString = answers[i].join('').split('').filter(filterUnique);
			answerCount+=uniqueString.length;
		}
		console.log(answerCount);
		return answerCount;
	}
	
	function analyzeAnswersB(json){
		var answers = json.customs;
		var answerCount = 0;
		for(i=0;i<answers.length;i++){
			var peopleCount = answers[i].length;
			
			var string = answers[i].join('').split('').sort();
			var uniqueString = answers[i].join('').split('').filter(filterUnique);
			
			allAnswered = 0;
			
			for(j=0;j<uniqueString.length;j++){
				var occurCount = getOccurrence(string,uniqueString[j]);
				if(occurCount == peopleCount){
					allAnswered++;
				}
			}
			answerCount+=allAnswered;
		}
		console.log(answerCount);
		return answerCount;
	}
	
	function filterUnique(value, index, self) {
		return self.indexOf(value) === index;
	}
	
	function getOccurrence(array, value) {
		var count = 0;
		array.forEach((v) => (v === value && count++));
		return count;
	}
}

function day7(qPart){
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url : "bag-rules.json",
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonpCallback: 'bagRules',
		success : function (json) {
			if(qPart=="A"){var bagCount = countBagsA(json);}
			else if(qPart=="B"){var bagCount = countBagsB(json);}
			$(".result").text(bagCount);
		}
	});
	
	function countBagsA(json){
		var bags = json.bags;
		var trigger = "shiny gold bags";
		
		function getChildBags(parentBag){
			var childBags = Object.getOwnPropertyDescriptor(bags, parentBag);
			for(i=0;i<childBags.value.length;i++){
				childBags.value[i] = childBags.value[i].replace(/[0-9] /,'').replace('bag','bags').replace('bagss','bags');
			}
			return childBags.value;
		}
		
		function onlyUnique(value, index, self){
			return self.indexOf(value) === index;
		}

		function arrayCompare(array1,array2){
			var result = false;
			for(i=0;i<array1.length;i++){
				if(array2.includes(array1[i])){
					result = true;
				}
			}
			return result;
		}

		var bagArray = [];
		var checkList = [];
		
		Object.entries(bags).forEach(([key, value]) => {
			var parentBag = key;
			var childBags = getChildBags(parentBag);
			
			childBags.forEach(function(result){
				if(result==trigger){
					bagArray.push(parentBag);
				} else {
					checkList.push(parentBag);
				}
			});
			
		});
		
		checkList = checkList.filter(onlyUnique);
		var triggerIndex = checkList.indexOf(trigger);
		checkList.splice(triggerIndex,1);
		// console.log(bagArray);
		// console.log(checkList);		
		function recurse(checkList){
			for(j=0;j<checkList.length;j++){
				var childBags = getChildBags(checkList[j]);
				// console.log('child bags:');
				// console.log(childBags);
				var check = arrayCompare(bagArray,childBags);
				if(check){
					bagArray.push(checkList[j]);
					checkList.splice(j,1);
					recurse(checkList);
				}
			}
		}
		recurse(checkList);
		console.log(bagArray);
		return bagArray.length
	}
	
	function countBagsB(json){
		var bags = json.bags;
		var trigger = "shiny gold bags";
		
		function getChildBags(parentBag){
			var childBags = Object.getOwnPropertyDescriptor(bags, parentBag);
			//console.log(childBags);
			return childBags.value;
		}
		
		function onlyUnique(value, index, self){
			return self.indexOf(value) === index;
		}
		
		var bagArray = [];
		var checkList = [];
		
		Object.entries(bags).forEach(([key, value]) => {
			var parentBag = key;
			var childBags = getChildBags(parentBag);
			
			childBags.forEach(function(result){
				if(parentBag==trigger){
					bagArray.push(parentBag);
				}
				else {checkList.push(parentBag);}
			});
			
		});
		
		bagArray = bagArray.filter(onlyUnique);
		//console.log(bagArray);
		checkList = checkList.filter(onlyUnique);
		// console.log(bagArray);
		// console.log(checkList);
		

		var subBagCount = 0;
		
		function recurse(bagArray){
			//console.log(bagArray);
			//subBagCount+=bagArray.length;
			//console.log('subBagCount before loop: ' + subBagCount);
			bagArray.forEach(function(element){
				var childBags = getChildBags(element);

				childBags.forEach(function(childBag){
					//console.log(childBags[k]);
					//console.log('beginning loop: ' + k);
					var subArray = [];
					var count = 0;
					if(childBag != 'no other bags'){
						var count = parseInt(childBag.toString().replace(/^ .*/,''));}
					var subBag = [childBag.toString().replace(/[0-9] /,'').replace('bag','bags').replace('bagss','bags')];
					subBagCount+=count;
					
					for(i=0;i<count;i++){
						subArray.push(subBag);
					}
					console.log(subBag, count, subBagCount);
					if(childBag != 'no other bags'){
						//console.log(childBag)
						subArray.forEach(function(subBag){
							recurse(subBag);
						});
					}
				});
			});
		}
		
		//console.log(bags[trigger]);
		recurse(bagArray);
		console.log(subBagCount);
	}
}

function day8(qPart){
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url : "console-program.json",
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonpCallback: 'startProg',
		success : function (json) {
			if(qPart=="A"){var acc = startA(json);}
			else if(qPart=="B"){var acc = startB(json);}
			$(".result").text(acc);
		}
	});
	
	function startA(json){
		var prog = json.prog;
		var accumulator = 0;
		
		for(i=0;i<prog.length;i++){
			prog[i].push(0);
		}
		//console.log(prog);
		
		for(i=0;i<prog.length;i++){
			var instruction = prog[i][0]
			var value = parseInt(prog[i][1]);
			
			console.log(instruction,value);

			prog[i][2]++;
			var stepCheck = prog[i][2];
			
			if(stepCheck > 1){
				console.log('step repeated!');
				break;
			}
			
			if(instruction=='acc'){
				accumulator+=(value);
				console.log('accumulator: ' + accumulator);
			}
			else if(instruction=='jmp'){
				i+=(value-1);
			}
		}
		console.log('accumulator: ' + accumulator);
		return accumulator;
	}
	
	function startB(json){
		var prog = json.prog;
		var accumulator = 0;
		var switchLog = [];
		var result = 0;
		
		
		for(i=0;i<prog.length;i++){
			prog[i].push(0);
			if(prog[i][0] == 'jmp'){
				switchLog.push([i,'nop']);
			} else if(prog[i][0] == 'nop'){
				switchLog.push([i,'jmp']);
			}
			// else {switchLog.push([i,'acc']);}
		}
		
		function clearCounts(){
			for(i=0;i<prog.length;i++){
				prog[i].pop();
				prog[i].push(0);
			}
		}
		
		// console.log('prog:');
		// console.log(prog);
		// console.log(switchLog);
		
		function reverseInstruction(inst){
			if(inst=='jmp'){return 'nop';}
			else if(inst=='nop'){return 'jmp';}
			else {return inst;}
		}
		
		// console.log('prog2:');
		// console.log(prog2[0]);
		for(j=0;j<switchLog.length;j++){
			clearCounts();
			startProgram(prog,switchLog[j][0]);
		}
		
		function startProgram(program,switchTrigger){
			accumulator = 0;
			for(i=0;i<program.length;i++){
				if(i==switchTrigger){
					// console.log('reverse switch triggered');
					var instruction = reverseInstruction(program[i][0]);
				} else {
					var instruction = program[i][0]
				}
				var value = parseInt(program[i][1]);
				
				//console.log(instruction,value);

				program[i][2]++;
				var stepCheck = program[i][2];
				
				if(stepCheck > 1){
					//console.log('step repeated!');
					return;
				}
				else if(instruction=='acc'){
					accumulator+=(value);
					//console.log('accumulator: ' + accumulator);
				}
				else if(instruction=='jmp'){
					i+=(value-1);
				}
				// console.log('accumulator',accumulator);
			}
			//console.log(accumulator);
			result = accumulator;
		}
		return result;
	}
}

function day9(qPart){
	$.ajax({
		type: 'GET',
		crossDomain: true,
		// url : "preamble-test.json",
		url : "preamble.json",
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonpCallback: 'xMas',
		success : function (json) {
			if(qPart=="A"){var result = funcA(json);}
			else if(qPart=="B"){var result = funcB(json);}
			$(".result").text(result);
		}
	});
	
	function funcA(json){
		console.log('premable:',json.preamble);
		var preamble = json.preamble;
		// var preLength = 5;
		var preLength = 25;
		
		for(i=preLength;i<preamble.length;i++){
		// for(i=preLength;i<7;i++){
			var checkArray = preamble.slice(i-preLength,i);
			//console.log('checkArray:',checkArray);
			var sumResults = [];
			// Since you only want pairs, there's no reason
			// to iterate over the last element directly
			for (let j = 0; j < checkArray.length - 1; j++) {
				// This is where you'll capture that last value
				for (let k = j + 1; k < checkArray.length; k++) {
					sumResults.push(checkArray[j] + checkArray[k]);
				}
			}
			//console.log('sumResults',sumResults);
			if(sumResults.indexOf(preamble[i]) == -1){
				console.log('invalid entry:',preamble[i]);
				return preamble[i];
			}
		}
	}
	
	function funcB(json){
		console.log('premable:',json.preamble);
		var preamble = json.preamble;
		// var preLength = 5;
		var preLength = 25;
		var invalid = 0;
		var result = 0
		
		for(i=preLength;i<preamble.length;i++){
		// for(i=preLength;i<7;i++){
			var checkArray = preamble.slice(i-preLength,i);
			//console.log('checkArray:',checkArray);
			var sumResults = [];
			// Since you only want pairs, there's no reason
			// to iterate over the last element directly
			for (let j = 0; j < checkArray.length - 1; j++) {
				// This is where you'll capture that last value
				for (let k = j + 1; k < checkArray.length; k++) {
					sumResults.push(checkArray[j] + checkArray[k]);
				}
			}
			//console.log('sumResults',sumResults);
			if(sumResults.indexOf(preamble[i]) == -1){
				//console.log('invalid entry:',preamble[i]);
				invalid = preamble[i];
			}
		}
		console.log('invalid entry:',invalid);
		
		// for(ii=0;ii<1;ii++){
		for(ii=0;ii<preamble.length;ii++){
			var trigger = invalid;
			//console.log('trigger:',trigger);
			var x = preamble
				.slice(ii)	// create copy for iterating
				.reduce((acc, curr, i, arr) => {
					//console.log(acc+curr);
					if ((acc + curr) == trigger && i > 0) {
						console.log('triggered by',(acc + curr),'between positions',preamble.indexOf(preamble[ii]),'and',i+ii);
						arr.splice(1);	// eject early by mutating iterated copy
						var range = preamble.slice(preamble.indexOf(preamble[ii]),i+ii);
						var min = Math.min(...range);
						var max = Math.max(...range);
						return ['success',min,max];
					} else {
						return (acc += curr);
					}
				}, 0);
			if(x[0]=='success'){
				console.log(x);
				result = x[1] + x[2];
			}
		}
		console.log(result);
		return result;
	}
}

$(document).ready(function(){
	$("#day-01A-button").click(function(){
		var day1Result = day1A();
		$(".result").text(day1Result[1]);
	});
	$("#day-01B-button").click(function(){
		var day1Result = day1B();
		$(".result").text(day1Result[1]);
	});
	$("#day-02A-button").click(function(){
		$(".result").text(day2("A"));
	});
	$("#day-02B-button").click(function(){
		$(".result").text(day2("B"));
	});
	$("#day-03A-button").click(function(){
		day3("A");
	});
	$("#day-03B-button").click(function(){
		day3("B");
	});
	$("#day-04A-button").click(function(){
		day4("A");
	});
	$("#day-04B-button").click(function(){
		day4("B");
	});
	$("#day-05A-button").click(function(){
		day5("A");
	});
	$("#day-05B-button").click(function(){
		day5("B");
	});
	$("#day-06A-button").click(function(){
		day6("A");
	});
	$("#day-06B-button").click(function(){
		day6("B");
	});
	$("#day-07A-button").click(function(){
		day7("A");
	});
	$("#day-07B-button").click(function(){
		day7("B");
	});
	$("#day-08A-button").click(function(){
		day8("A");
	});
	$("#day-08B-button").click(function(){
		day8("B");
	});
	$("#day-09A-button").click(function(){
		day9("A");
	});
	$("#day-09B-button").click(function(){
		day9("B");
	});
	// $("#day-10A-button").click(function(){
		// day10("A");
	// });
	// $("#day-10B-button").click(function(){
		// day10("B");
	// });
	// $("#day-11A-button").click(function(){
		// day11("A");
	// });
	// $("#day-11B-button").click(function(){
		// day11("B");
	// });
	// $("#day-12A-button").click(function(){
		// day12("A");
	// });
	// $("#day-12B-button").click(function(){
		// day12("B");
	// });
	// $("#day-13A-button").click(function(){
		// day13("A");
	// });
	// $("#day-13B-button").click(function(){
		// day13("B");
	// });
	// $("#day-14A-button").click(function(){
		// day14("A");
	// });
	// $("#day-14B-button").click(function(){
		// day14("B");
	// });
	// $("#day-15A-button").click(function(){
		// day15("A");
	// });
	// $("#day-15B-button").click(function(){
		// day15("B");
	// });
	// $("#day-16A-button").click(function(){
		// day16("A");
	// });
	// $("#day-16B-button").click(function(){
		// day16("B");
	// });
	// $("#day-17A-button").click(function(){
		// day17("A");
	// });
	// $("#day-17B-button").click(function(){
		// day17("B");
	// });
	// $("#day-18A-button").click(function(){
		// day18("A");
	// });
	// $("#day-18B-button").click(function(){
		// day18("B");
	// });
	// $("#day-19A-button").click(function(){
		// day19("A");
	// });
	// $("#day-19B-button").click(function(){
		// day19("B");
	// });
	// $("#day-20A-button").click(function(){
		// day20("A");
	// });
	// $("#day-20B-button").click(function(){
		// day20("B");
	// });
	// $("#day-21A-button").click(function(){
		// day21("A");
	// });
	// $("#day-21B-button").click(function(){
		// day21("B");
	// });
	// $("#day-22A-button").click(function(){
		// day22("A");
	// });
	// $("#day-22B-button").click(function(){
		// day22("B");
	// });
	// $("#day-23A-button").click(function(){
		// day23("A");
	// });
	// $("#day-23B-button").click(function(){
		// day23("B");
	// });
	// $("#day-24A-button").click(function(){
		// day24("A");
	// });
	// $("#day-24B-button").click(function(){
		// day24("B");
	// });
	// $("#day-25A-button").click(function(){
		// day25("A");
	// });
	// $("#day-25B-button").click(function(){
		// day25("B");
	// });
});