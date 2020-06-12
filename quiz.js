const quizCnt = document.querySelector("#quiz-cnt"); //pobieram diva z quizem
const quiz = quizCnt.children; //pobieram wszystkie slajdy z quizu
const btn = quizCnt.querySelectorAll(".btn"); //pobieram wszystkie przyciski w quizie
let counter = 0; //licznik dot. changeSlide
let score =0; //licznik punktów
	
function start(){
	console.log(counter);
	console.log("wywołano start()");
	btn[counter].addEventListener("click",changeSlide);//nasłuchiwanie na wywołanie funkcji changeSlide, które nastąpi po kliknięciu
}
start();

function changeSlide(){
	console.log("Wywołano changeSlide()");
	
	quiz[counter].classList.add("hide");//ukrycie aktualnie widocznego diva
	
	quiz[counter].nextElementSibling.classList.remove("hide");
	counter++; //counter + 1
	
	btn[counter].addEventListener("click",checkAnswer); 
	//nasłuchiwanie na wywołanie funkcji checkAnswer, które nastąpi po kliknięciu
	//btn[counter].addEventListener("click",changeSlide);
	
}

	
function checkAnswer(){
	console.log("Wywołano checkAnswer()");

	const checkedInput = document.querySelector(`input[name="pyt${counter}"]:checked`); //zmienna zwróci null jeżeli żaden input nie zostanie zaznaczony
	
	//jeżeli którakolwiek odpowiedź zostanie zaznaczona (negacja nulla), to:  
	if (checkedInput != null) {
		const answer = document.querySelector(`input[name="pyt${counter}"]:checked`).value; //pobrana zostanie wartość zaznaczonego inputa,
		const checkedAnswer = document.querySelector(`.o${answer}`); //pobrany zostanie komentarz do zaznaczonej odpowiedzi.
		if (checkedAnswer.classList.contains("alert-success")) {
			score++;
		}
		checkedAnswer.classList.remove("hide"); //z komentarza jak wyżej usunięta zostanie klasa "hide"
		const inputDis = document.querySelectorAll(`input[name="pyt${counter}"]`);//to + for by po kliknięciu Sprawdź nie dało się zmienić odpowiedzi.
		for(let i=0; i<inputDis.length; i++){
			if (inputDis[i].type==='radio') {
			inputDis[i].disabled = true;
			}
		}
		
		if (counter==quiz.length-2) {
			console.log("Przypisano summery");
			btn[counter].innerText = "Sprawdź wynik";
			btn[counter].addEventListener("click",summery);
		}
		else {
			btn[counter].innerText = "Następne pytanie";
		}//button "Sprawdź" zmienia zawartość tekstową na "następne pytanie"
		
		const warning = document.querySelector(".warning");//próba pobrania elementu html o klasie "warning" (w przypadku niepowodzenie zwróci null),w ifie jeżeli takiego nie ma to nic nie robimy, a jeżeli jest to go usuwamy.
		if (warning!=null) {
			warning.remove();
		}
		
		btn[counter].removeEventListener("click",checkAnswer);
		
		if(counter != quiz.length-2) {
		btn[counter].addEventListener("click",changeSlide);
		}
	}
	//jeżeli żadna odpowiedź nie będzie zaznaczona:
	else {
		const warning = document.querySelector(".warning"); //próba pobrania elementu html o klasie "warning" (w przypadku niepowodzenie zwróci null),
		
		//jeżeli zwróci null to znaczy, że nie ma jeszcze takiego elementu i możemy go stworzyć, gdyby już był to nie ma sensu tworzyć drugiego, więc nie robimy nic.
		if (warning==null) {
			let checkSmth = document.createElement("div"); //tworzymy nowy div
			checkSmth.className = "alert alert-danger warning"; //o klasie "alert"
			checkSmth.innerHTML = "Zaznacz jedną z odpowiedzi";	//dodajemy tekst
			btn[counter].before(checkSmth); //wstawiamy go przed elementem o klasie "btn"	
		}
		
	}
}

function summery(){
	console.log("wywołano summery()");
	console.log("S_counter: " + counter);
	//changeSlide();
	quiz[quiz.length-2].classList.add("hide");
	quiz[quiz.length-1].classList.remove("hide");
	scoreHolder = document.querySelector(".score");
	scoreHolder.innerText = score+"/"+(quiz.length-2);
	scoreCom = document.querySelector(".scoreCom");
	switch (true) {
		case (score<=2):
		scoreCom.innerText = "Zdecydowanie przyda Ci się wycieszka po Wrocławiu z przewodnikiem :) Zapraszam!";
		break;
		case (score==3):
		scoreCom.innerText = "Widać, że masz sporą wiedzę o Wrocławiu, ale wciąż znajdzie się parę ciekawostek, które mogą Cię zainteresować. Zapraszam na wyceczkę!";
		break;
		case (score>=4):
		scoreCom.innerText = "Gratulacje! Twoja wiedza o Wrocławiu jest imponująca! Może sam powinieneś zastanowić się nad zrobieniem kursu na przewodnika?"
	}
	btn[++counter].addEventListener("click",again);
}

function again() {
		console.log("wywołano again()");
		//usuwa klasę hide z pierwszego slajdu
		quiz[0].classList.remove("hide");
		//dodaje klasę hide do ostatniego slajdu
		quiz[quiz.length-1].classList.add("hide");
		
		const alerts = document.querySelectorAll(".alert");
		for (let i=0; i<alerts.length; i++) {
			alerts[i].classList.add("hide");
		}
		
		const inputDis = document.querySelectorAll(`input[type="radio"]`);
		for(let i=0; i<inputDis.length; i++){
			inputDis[i].disabled = false;
			inputDis[i].checked = false;
		}
		
		for(let i=1; i<quiz.length-1; i++) {
			btn[i].innerText = "Sprawdź";
			btn[i].removeEventListener("click",changeSlide);
			btn[i].removeEventListener("click",checkAnswer);
			btn[i].removeEventListener("click",summery);
		}
		
		counter=0;	
		start();		
}
