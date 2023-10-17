//maybe we need to declare let courses; here outside the try instead of declaring it as a const inside, to make it work with all the filtering later
let language = "sv"; // Default language
		
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

		console.log(courses); //Test to see if it works
		
		const menuContainer = document.getElementById('cards-menu');
		menuContainer.innerHTML = ""; // Resetting menu

		courses.forEach(course => {
			const card = document.createElement('div');
			card.classList.add('col-md-4', 'mb-3');
			if(language == 'sv') 
			card.innerHTML = "<b>"+course.name.sv+"</b> ‧ "+course.price.sv+course.currency.sv+" ‧ "+course.about.sv; 
			else 
			card.innerHTML = "<b>"+course.name.en+"</b> ‧ "+course.price.en+course.currency.en+" ‧ "+course.about.en;
				
		  	menuContainer.appendChild(card);

		});

	} catch (error) {
		//Used together with "try", to handle errors that may occur during the execution of the code.
		console.error("Error:", error);
	}
}

fetchCourses();

let englishBtn = document.getElementById('englishBtn');
let svenskaBtn = document.getElementById('svenskaBtn');

englishBtn.addEventListener('click', function() {
	language = "en";
	fetchCourses();
});

svenskaBtn.addEventListener('click', function() {
	language = "sv";
	fetchCourses();
});



