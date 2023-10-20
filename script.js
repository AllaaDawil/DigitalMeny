async function fetchCourses() {
	//asynchronous function allows the rest of the code to continue executin while waiting for the asynchronous operation to complete.
	try {
		const response = await fetch("courses.json"); //fetch = HTTP request for courses.json.
		if (!response.ok) {
			//if file doesn't get fetch (not ok) throw error (ok  = 200-299 status).
			throw new Error(`HTTP error! Status: ${response.status}`); //throws 404 to console if it doesn't find the file.
		}
		const accessCourses = await response.json(); //json() is parsing courses.json file and converts it to a javaScript object.
		const startCourses = accessCourses.courses; //In the converted JSON file use courses array and assign it to a variable called courses here.

		//Start languages
		const h1 = document.querySelector("#h1");
		const h5 = document.querySelector("#offcanvasNavbarLabel");
		const prisTitle = document.querySelector("#prisTitle");
		const priceAscendingLabel = document.querySelector("#priceAscendingLabel");
		const priceDescendingLabel = document.querySelector(
			"#priceDescendingLabel"
		);
		const proteinTitle = document.querySelector("#proteinTitle");
		const meatVegetarianLabel = document.querySelector("#meatVegetarianLabel");
		const meatChickenLabel = document.querySelector("#meatChickenLabel");
		const meatPorkLabel = document.querySelector("#meatPorkLabel");
		const meatBeefLabel = document.querySelector("#meatBeefLabel");
		const meatFishLabel = document.querySelector("#meatFishLabel");
		const allergiesTitle = document.querySelector("#allergiesTitle");
		const lactoseLabel = document.querySelector("#lactoseLabel");
		const glutenLabel = document.querySelector("#glutenLabel");
		const englishBtn = document.getElementById("englishBtn");
		const svenskaBtn = document.getElementById("svenskaBtn");

		function svTranslation() {
			h1.textContent = "Lucky Duck Meny";
			h5.textContent = "Lucky Duck Meny";
			prisTitle.textContent = "Pris-filter";
			priceAscendingLabel.textContent = "Stigande priser";
			priceDescendingLabel.textContent = "Fallande priser";
			proteinTitle.textContent = "Protein Val";
			meatVegetarianLabel.textContent = "Vegetarisk";
			meatChickenLabel.textContent = "Kyckling";
			meatPorkLabel.textContent = "Fläsk";
			meatBeefLabel.textContent = "Nöt";
			meatFishLabel.textContent = "Fisk";
			allergiesTitle.textContent = "Allergier";
			lactoseLabel.textContent = "Laktosfritt";
			glutenLabel.textContent = "Gluten-free";
		}

		function enTranslation() {
			h1.textContent = "Lucky Duck Menu";
			h5.textContent = "Lucky Duck Menu";
			prisTitle.textContent = "Price-filter";
			priceAscendingLabel.textContent = "Ascending prices";
			priceDescendingLabel.textContent = "Descending prices";
			proteinTitle.textContent = "Protein choice";
			meatVegetarianLabel.textContent = "Vegetarian";
			meatChickenLabel.textContent = "Chicken";
			meatPorkLabel.textContent = "Pork";
			meatBeefLabel.textContent = "Beef";
			meatFishLabel.textContent = "Fish";
			allergiesTitle.textContent = "Allergies";
			lactoseLabel.textContent = "Lactose-free";
			glutenLabel.textContent = "Gluten-free";
		}

		englishBtn.addEventListener("click", function () {
			language = "en";
			enTranslation();
			showCourses(language, courses);
		});
		svenskaBtn.addEventListener("click", function () {
			language = "sv";
			svTranslation();
			showCourses(language, courses);
		});

		svTranslation(); //Default language on rest of the site
		let language = "sv"; //default language on menu, taking the property sv (and en) from the objects in the JSON file

		// stopPropogation() prevents the closing of the filter/sorting dropdowns (doesn't prevent clicks from happening like preventDefault() does)
		const preventClose = document.querySelectorAll(".dropdown");
		preventClose.forEach((box) => {
			box.addEventListener("click", (event) => {
				event.stopPropagation();
			});
		});

		let meatVegetarianCheck = document.querySelector("#meatVegetarianCheck");
		let meatChickenCheck = document.querySelector("#meatChickenCheck");
		let meatPorkCheck = document.querySelector("#meatPorkCheck");
		let meatBeefCheck = document.querySelector("#meatBeefCheck");
		let meatFishCheck = document.querySelector("#meatFishCheck");
		let glutenCheck = document.querySelector("#glutenCheck");
		let lactoseCheck = document.querySelector("#lactoseCheck");
		let priceAscendingCheck = document.querySelector("#priceAscendingCheck");
		let priceDescendingCheck = document.querySelector("#priceDescendingCheck");

		let courses = startCourses; //change back to just use courses uo there instead. startCourses for use of "the original menu"

		function showCourses(language, courses) {
			const selectedFoodTypes = [];

			if (meatChickenCheck.checked) {
				selectedFoodTypes.push("Kyckling", "Chicken");
			}
			if (meatPorkCheck.checked) {
				selectedFoodTypes.push("Fläsk", "Pork");
			}
			if (meatBeefCheck.checked) {
				selectedFoodTypes.push("Nöt", "Beef");
			}
			if (meatFishCheck.checked) {
				selectedFoodTypes.push("Fisk", "Fish");
			}
			if (meatVegetarianCheck.checked) {
				selectedFoodTypes.length = 0;
				selectedFoodTypes.push("Vegetarisk", "Vegetarian");
			}

			const selectedAllergyTypes = [];
			if (glutenCheck.checked) {
				selectedAllergyTypes.push("Gluten", "Gluten");
			}
			if (lactoseCheck.checked) {
				selectedAllergyTypes.push("Laktos", "Lactose");
			}

			const filteredCourses =
				selectedFoodTypes.length > 0
					? courses.filter((course) => {
							//if the checkbox array has any foodtype in it then keep filtering and set the new filtered out courses to the variable otherwise return the untouched courses to the variable
							const courseFoodType = course.foodType[language]; //get the whole array for a course foodType in JSON
							return selectedFoodTypes.some(
								(
									selectedFoodType //return every item in the the selectedFoodType array if the courseFoodType array includes matches every item in the selectedFoodType array
								) => courseFoodType.includes(selectedFoodType) //check to see if the JSON foodcourses foodType array includes every item from the selcted
							);
					  })
					: courses;

			const filteredAllergyCourses =
				selectedAllergyTypes.length > 0
					? filteredCourses.filter((course) => {
							const courseAllergyType = course.allergies[language]; //get the whole array for if it DOES NOT include the choosen allergies in JSON
							return !selectedAllergyTypes.some((selectedAllergyType) =>
								courseAllergyType.includes(selectedAllergyType)
							);
					  })
					: filteredCourses;

			// let sortedCourses = []; //Don't think sortedcourses is necessary since filteredallergycourses already is an array, so we can just use only filteredallergycourses instead
			let sortedCourses = filteredAllergyCourses;

			if (priceAscendingCheck.checked) {
				sortedCourses = sortedCourses.toSorted((courseA, courseB) => {
					return courseA.price[language] - courseB.price[language];
				});
			} else if (priceDescendingCheck.checked) {
				sortedCourses = sortedCourses.toSorted((courseA, courseB) => {
					return courseB.price[language] - courseA.price[language];
				});
			}

			console.log(selectedFoodTypes);
			console.log(selectedAllergyTypes);
			console.log(sortedCourses);

			let output = document.getElementById("cards-menu");
			output.innerHTML = ""; //clear the string that we fill with the card below

			sortedCourses.forEach((course) => {
				const card = document.createElement("div");
				card.classList.add("col-md-6", "mb-3");

				if (course.priceHalf) {
					//if an object has priceHalf in JSON (courses.json), we print out the menu a different way
					card.innerHTML += `<h2> ${course.name[language]} - ${course.sizeHalf[language]} ${course.priceHalf[language]} ${course.currency[language]} - ${course.sizeWhole[language]} ${course.price[language]} ${course.currency[language]}</h2><p>${course.about[language]}</p>`;
				} else {
					//the normal way, [language] is an dynamic key to access object property (it gets the value associated with the key "sv" or "en" via variable language)
					card.innerHTML += `<h2> ${course.name[language]} - ${course.price[language]} ${course.currency[language]}</h2><p>${course.about[language]}</p>`;
				}

				output.appendChild(card);
			});
		} //end of showCourses function

		showCourses(language, courses); //call showCourses initially to display all courses

		meatVegetarianCheck.addEventListener("change", function () {
			if (this.checked) {
				meatChickenCheck.checked = false;
				meatPorkCheck.checked = false;
				meatBeefCheck.checked = false;
				meatFishCheck.checked = false;
			}
			showCourses(language, courses);
		});

		const realMeatTypeCheck = [
			meatChickenCheck,
			meatPorkCheck,
			meatBeefCheck,
			meatFishCheck,
		];

		realMeatTypeCheck.forEach((realMeatCheck) => {
			realMeatCheck.addEventListener("change", function () {
				if (this.checked) {
					meatVegetarianCheck.checked = false;
				}
				showCourses(language, courses);
			});
		});

		const allergiesTypeFilter = document.querySelector("#allergiesTypeFilter");
		allergiesTypeFilter.onclick = function () {
			showCourses(language, courses);
		};

		priceAscendingCheck.addEventListener("change", function () {
			//"this" refers to the priceAscendingCheck checkbox element.
			if (this.checked) {
				priceDescendingCheck.checked = false;
			}
			showCourses(language, courses);
		});

		priceDescendingCheck.addEventListener("change", function () {
			if (this.checked) {
				priceAscendingCheck.checked = false;
			}
			showCourses(language, courses);
		});
	} catch (error) {
		//Used together with "try", to handle errors that may occur during the execution of the code.
		console.error("Error:", error);
	}
}
fetchCourses();
