    function processInput() {
		  // Retrieve values from the input elements
		  var drinkType = document.getElementById('drinkType').value;
		  var ounces = document.getElementById('ounces').value;
		  var gender = document.getElementById('gender').value;
		  var W = document.getElementById('weight').value;
		  var Hours = document.getElementById('hrs').value;
		  var minutes = document.getElementById('min').value;
		  var seconds = document.getElementById('sec').value;
		  var metricw = document.getElementById('metric').value;
		  var L = 0;
		  var BAC = 0;
		  var H = 0;
		  // Debugging: Print to ////console
		  ////console.log('Drink Type:', drinkType);
		  ////console.log('Ounces:', ounces);
		  ////console.log('Gender:', gender);
		  
		  // Calculate Drink Count
		  var drinkcount = 0;
		  if (drinkType === 'beer'){
			  drinkcount = parseFloat(((ounces * 0.05) / 0.6).toFixed(1));
		  }
		  else if(drinkType === 'lite'){
			  drinkcount = parseFloat(((ounces * 0.07) / 0.6).toFixed(1));
		  }
		  else if(drinkType === 'wine'){
			  drinkcount = parseFloat(((ounces * 0.12) / 0.6).toFixed(1));
		  }
		  else if(drinkType === 'hard'){
			  drinkcount = parseFloat(((ounces * 0.4) / 0.6).toFixed(1));
		  } // Calculate Drink Count
	   
	   // Calculate How much of an alcoholic they are?
		if((gender == 'male' && drinkcount <= 2) || (gender == 'female' && drinkcount <= 1))
		{
			// Debugging: Print to ////console
			////console.log('Light');
			 L = 0.012;
		}
		else if ((gender == 'male' && drinkcount <= 4) || (gender == 'female' && drinkcount <= 3))
		{
			// Debugging: Print to ////console
			////console.log('Moderate');
			L = 0.017;
		}
		else if ((gender == 'male' && drinkcount >= 5) || (gender == 'female' && drinkcount >= 4))
		{
			// Debugging: Print to ////console
			////console.log('Heavy');
			L = 0.002;
		}// Calculate How much of an alcoholic they are?
		
		// Pounds to Kilogram Conversion
		if(metricw == 'lbs'){
			W = W/2.2;
		}// Kilogram Conversion
		
		//Now that Weight is in Kilograms Convert to Grams
		W = W * 1000;
		
		// Calculating bac
		// R is distribution ratio. R in Males = 0.68 , R in Females = 0.55 
		
		var D = drinkcount * 14;// D Calculation =  alcohol consumed in grams
		
		// Constants
		var RM = 0.68; // gender == male
		var RF = 0.55; // gender == female
		
		
		
		if(Hours < 0 || minutes < 0 || seconds < 0){
			alert('Time Values Cannot Be Negative.');
			resetTime();
		}
		else{
		
			
			// Convert all units to seconds
			var totalHours = (Hours * 1) + (minutes / 60) + (seconds / 3600);

			// Convert total seconds to hours
			var H = totalHours;

			////console.log("Total time in hours: ", H);
			
			// W is Body weight in Grams = Weight in Pounds x 453.592  
			// BAC = (D/( W x R )) x 100 
			//console.log('D:', D);
			//console.log('W x RM', (W*RM));
			//console.log('W x RF', (W*RF));
			
			// BAC calculation
			if(gender == 'male'){
				BAC = (D/(W*RM))*100; // male
			}
			else{
				BAC = (D/(W*RF)*100); // female
			}
			// Final BAC = BAC minus L x H 
			//console.log('Drink Count:', drinkcount);
			//console.log('BAC before final:', BAC); // 24ounces hard male 200lb 0hr = BAC 1.64
			//console.log('W:', W);
			//console.log('D:', D);
			//console.log('L:', L);
			//console.log('H:', H);
			
			BAC = BAC - (L*H);
			if(BAC < 0){BAC = 0;}
			//console.log('BAC after:',BAC);
			
			if(drinkType !== '' && ounces !== "" && gender !== "" && H !== "" && minutes !== "" && seconds !== "" && W != ""){
				var imgstring = ""
				var debugOutput = document.getElementById('debugOutput');
				debugOutput.innerHTML += '<p>Drink Type: ' + drinkType + '</p>';
				debugOutput.innerHTML += '<p>Ounces: ' + ounces + '</p>';
				debugOutput.innerHTML += '<p>Gender: ' + gender + '</p>';
				var num = getRandNum();
				var level = "";
				if(L == 0.012){
					level = "Light Drinker";
					if(num == 0){
						imgstring = "<img src='../TestOne_BAC_Images/light1.gif'";
						
					}else{
						imgstring = "<img src='../TestOne_BAC_Images/light2.gif'";	
					}
				}
				else if (L === 0.017){
					level = "Moderate Drinker";
					if(num == 0){
						imgstring = "<img src='../TestOne_BAC_Images/moderate1.gif'";
					}else{
						imgstring = "<img src='../TestOne_BAC_Images/moderate2.gif'";	
					}
				}
				else{
					level = "Heavy Drinker";
					if(num == 0){
						imgstring = "<img src='../TestOne_BAC_Images/heavy1.gif'";
					}else{
						imgstring = "<img src='../TestOne_BAC_Images/heavy2.gif'";	
					}
				}
				debugOutput.innerHTML += '<p style="display: flex-inline; ">Light/Moderate/Heavy: ' + level + '<br>' + imgstring + '</p>';
				debugOutput.innerHTML += '<p>Drink Count: ' + drinkcount + '</p>';
				debugOutput.innerHTML += '<p>BAC: ' + BAC + '</p>';
				
				hidePartB();
			}
			else {
				if(drinkType == ''){alert('Enter Type of Drink.');}
				if(ounces == ""){alert('Enter Ounces.');}
				if(gender == ""){alert('Enter Gender.');}
				if(H == ""){alert('Enter Hours.');}
				if(minutes == ""){alert('Enter Minutes.');}
				if(seconds == ""){alert('Enter Seconds.');}
				if(W == ""){alert('Enter Weight.');}
				
				
				
			}
			
			// BAC Result Output
			
			if(BAC < 0.02){
				debugOutput.innerHTML += '<h4>Level 0:</h4>';
				debugOutput.innerHTML += '<p>Not Intoxicated</p>';
			}
			else if(BAC >= 0.02 && BAC < 0.05){
				debugOutput.innerHTML += '<h4>Level 1:</h4>';
				debugOutput.innerHTML += '<p>This is the lowest level of intoxication ' +
											'with some measurable impact on the ' +
											'brain and body. </p>';
				debugOutput.innerHTML += '<pre> You will feel relaxed, experience ' +
											'altered mood, feel a little warmer, and '+
											'may make poor judgments. </pre>';
			}
			else if(BAC >= 0.05 && BAC < 0.08){
				debugOutput.innerHTML += '<h4>Level 2:</h4>';
				debugOutput.innerHTML += '<p>At this level of BAC, your behavior ' +
											'may become exaggerated </p>';
				debugOutput.innerHTML += '<pre> You may speak louder and gesture '+
											'more. You may also begin to lose '+
											'control of small muscles, like the '+
											'ability to focus your eyes, so vision '+
											'will become blurry. </pre>';
			}
			else if(BAC >= 0.08 && BAC < 0.1){
				debugOutput.innerHTML += '<h4>Level 3:</h4>';
				debugOutput.innerHTML += '<p>This is the current legal limit in the ' +
											'U.S., other than Utah, and at this level ' +
											'it is considered illegal and unsafe to drive. </p>';
				debugOutput.innerHTML += '<pre> You will lose more coordination, so ' +
											'your balance, speech, reaction times, ' +
											'and even hearing will get worse.</pre>';
			}
			else if(BAC >= 0.1 && BAC < 0.15){
				debugOutput.innerHTML += '<h4>Level 4:</h4>';
				debugOutput.innerHTML += '<p>At this BAC, reaction time and  ' +
											'control will be reduced, </p>';
				debugOutput.innerHTML += '<pre> speech will be slurred, thinking and '+
											'reasoning are slower, and the ability to '+
											'coordinate your arms and legs is poor. </pre>';
			}
			else if(BAC >= 0.15 && BAC < 0.2){
				debugOutput.innerHTML += '<h4>Level 5:</h4>';
				debugOutput.innerHTML += '<p>This BAC is very high. You will have ' +
											'much less control over your balance ' +
											'and voluntary muscles,  </p>';
				debugOutput.innerHTML += '<pre> Walking and talking are difficult. You '+
											'may fall and hurt yourself. </pre>';
			}
			else if(BAC >= 0.2 && BAC < 0.3){
				debugOutput.innerHTML += '<h4>Level 6:</h4>';
				debugOutput.innerHTML += '<p> Confusion, feeling dazed, and ' +
											'disorientation are common.</p>';
				debugOutput.innerHTML += '<pre> Sensations of pain will change, so if '+
											'you fall and seriously hurt yourself, '+
											'you may not notice, and you are less '+
											'likely to do anything about it. Nausea '+
											'and vomiting are likely to occur, and '+
											'the gag reflex will be impaired, which '+
											'could cause choking or aspirating on '+
											'vomit. Blackouts begin at this BAC, '+
											'so you may participate in events that '+
											'you don’t remember. </pre>';
			}
			else if(BAC >= 0.3 && BAC < 0.4){
				debugOutput.innerHTML += '<h4>Level 7:</h4>';
				debugOutput.innerHTML += '<p>At this point, you may be unconscious ' +
											'and your potential for death increases. </p>';
				debugOutput.innerHTML += '<pre> Along with a loss of understanding, at '+
											'this BAC you’ll also experience severe '+
											'increases in your heart rate, irregular '+
											'breathing and may have a loss of '+
											'bladder control. </pre>';
			}
			else{
				debugOutput.innerHTML += '<h4>Level 8:</h4>';
				debugOutput.innerHTML += '<p>This level of BAC may put you in a ' +
											'coma or cause sudden death because ' +
											'your heart or breathing will suddenly stop. </p>';
				debugOutput.innerHTML += '<pre> This is what is known as a lethal blood '+
												'alcohol level.</pre>';
			}
			
		}
    }
	function hidePartB(){
		  var partA = document.getElementById('partA');
          var partB = document.getElementById('partB')
          var results = document.getElementById('results');
		  
		  
		  var W = document.getElementById('weight').value;
		  var H = document.getElementById('hrs').value;
		  var minutes = document.getElementById('min').value;
		  var seconds = document.getElementById('sec').value;
		  var metricw = document.getElementById('metric').value;
		var drinkType = document.getElementById('drinkType').value;
		var ounces = document.getElementById('ounces').value;
		var gender = document.getElementById('gender').value;

            if (drinkType !== "" && ounces !== "" && gender !== "" && W !== "" && H !== "" && minutes !== "" && metricw!=="") {
                partA.style.display = 'none';
                partB.style.display = 'none';
				results.style.display = 'block';
            } else {
                alert('Please complete Part B first.');
            }
	}
	function showPartB() {
            var partA = document.getElementById('partA');
            var partB = document.getElementById('partB');

            // Add your validation logic for Part A here
            // For now, let's assume Part A is complete if drinkType, ounces, and gender are selected

            var drinkType = document.getElementById('drinkType').value;
            var ounces = document.getElementById('ounces').value;
            var gender = document.getElementById('gender').value;

            if (drinkType !== "" && ounces !== "" && gender !== "") {
                partA.style.display = 'none';
                partB.style.display = 'block';
            } else {
                alert('Please complete Part A first.');
            }
     }
	function showPartA() {
		var partA = document.getElementById('partA');
		var partB = document.getElementById('partB');

	
		  var W = document.getElementById('weight').value;
		  var H = document.getElementById('hrs').value;
		  var minutes = document.getElementById('min').value;
		  var seconds = document.getElementById('sec').value;
		  var metricw = document.getElementById('metric').value;

		if (W !== "" && H !== "" && minutes !== "" && seconds !== "" && metricw !== "") {
			partB.style.display = 'none';
			partA.style.display = 'block';
		} else {
			alert('Fields are Cleared.');
		}
	}
	function resetForm() {
			// Get the form element by ID
			var form = document.getElementById('myform');
			var ounces = document.getElementById('ounces')
			var metric = document.getElementById('metric');
			var gender = document.getElementById('gender');
			var drinkType = document.getElementById('drinkType');
			var debugOutput = document.getElementById('debugOutput');
			var results = document.getElementById('results');
			showPartA();
			results.style.display = 'none';
			// Reset the form
			debugOutput.innerHTML = "";
			form.reset();
			document.getElementById('ounces').value = '';
			document.getElementById('weight').value = '';
			document.getElementById('hrs').value = '';
			document.getElementById('min').value = '';
			document.getElementById('sec').value = '';
			metric.selectedIndex = -1;
			gender.selectedIndex = -1;
			drinkType.selectedIndex = -1;
	}
	function resetTime() {
		document.getElementById('hrs').value = '';
		document.getElementById('min').value = '';
		document.getElementById('sec').value = '';
	}
	function getRandNum(){
		var val = Math.floor(Math.random() * 2);
		return val;
	}