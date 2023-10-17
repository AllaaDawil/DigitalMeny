//maybe we need to declare let courses; here outside the try instead of declaring it as a const inside, to make it work with all the filtering later
let language = "sv"; // Default language
let currentSortOrder = "default"; //Default sortering

async function fetchCourses() {
	//asynchronous function allows the rest of the code to continue executing while waiting for the asynchronous operation to complete.
	try {
		const response = await fetch("courses.json"); //fetch = HTTP request for courses.json.
		if (!response.ok) {
			//if file doesn't get fetch (not ok) throw error (ok  = 200-299 status).
			throw new Error(`HTTP error! Status: ${response.status}`); //throws 404 to console if it doesn't find the file.
		}
		const accessCourses = await response.json(); //json() is parsing courses.json file and converts it to a javaScript object.
		const courses = accessCourses.courses; //In the converted JSON file use courses array and assign it to a variable called courses here.
		
		const menuContainer = document.getElementById('cards-menu');
		menuContainer.innerHTML = ""; // Resetting menu

		// Ternary condition/ använder nested if vilkor
		if(currentSortOrder != "default") {
			if(currentSortOrder == "hightolow") //sortera priset i (courses array) i fallande ordning 
			courses.sort((b, a) => (typeof(a.price) == 'undefined' ? a.priceWhole.sv : a.price.sv) -  (typeof(b.price) == 'undefined' ? b.priceWhole.sv : b.price.sv));
			else if(currentSortOrder == "lowtohigh") //sortera priset i (courses array) i stigande ordning 
			courses.sort((a, b) => (typeof(a.price) == 'undefined' ? a.priceWhole.sv : a.price.sv) -  (typeof(b.price) == 'undefined' ? b.priceWhole.sv : b.price.sv));
		}

		//skapa ny card element for varje maträtt
		courses.forEach(course => { 
			const card = document.createElement('div');
			card.classList.add('col-md-4', 'mb-3');

			//Konttrolera om maträtt har ett difinerat pris
			card.innerHTML = "<b>"+course.name[language]+"</b> ‧ ";
			if(typeof(course.price) != 'undefined')
				card.innerHTML += "<b>"+course.price[language]+course.currency[language]+"</b>";
			else 
			{
				//Om inget pris är definierat visa halva och hela storlekar med priser
				card.innerHTML += course.sizeHalf[language]+" "+course.priceHalf[language]+course.currency[language]+" / ";
				card.innerHTML += course.sizeWhole[language]+" "+course.priceWhole[language]+course.currency[language];
			}
			card.innerHTML += " ‧ "+course.about[language]; //lägg till maträtt description till varje card
				
		  	menuContainer.appendChild(card);
		});

	} catch (error) {
		//Used together with "try", to handle errors that may occur during the execution of the code.
		console.error("Error:", error);
	}
}

// Hämtar courses
fetchCourses();

// välja ett språk
let englishBtn = document.getElementById('englishBtn');
let svenskaBtn = document.getElementById('svenskaBtn');

//lägg till eventlistener
englishBtn.addEventListener('click', function() {
	language = "en";
	fetchCourses();
});

svenskaBtn.addEventListener('click', function() {
	language = "sv";
	fetchCourses();
});

// pris sortering knappar
let sort = document.getElementsByName("sort");


function checkSorting() {
	if (sort[0].checked) { //kontrollerar om första radio knapp är checked (selected)
		currentSortOrder = "lowtohigh";
	} else if (sort[1].checked) {//kontrollerar om andra radio knapp är checked (selected)
		currentSortOrder = "hightolow";
	} else if (sort[2].checked) //Lägg till en radio knapp som visar default ordning
    currentSortOrder = "default";
	fetchCourses();
}

//Lägg till eventlistner till radio knappar
sort[0].addEventListener("change", checkSorting);
sort[1].addEventListener("change", checkSorting);
sort[2].addEventListener("change", checkSorting);
