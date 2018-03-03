const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetStopwatch());

const saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());

const clearListButton = document.getElementById('clear-list');
clearListButton.addEventListener('click', () => stopwatch.clearList());

class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
	    if (!this.running) {
	        this.running = true;
	        this.watch = setInterval(() => this.step(), 10);
	    }
	}

	step() {
    	if (!this.running) return;
    	this.calculate();
    	this.print();
    }
    
    save() {
        const liElement = document.createElement('li');

        liElement.innerText = this.format(this.times);
        this.results.appendChild(liElement);
    }

    clear() {
        this.results.removeChild(this.results.lastChild);
    }

    clearList() {
        this.results.innerHTML = '';
    }

	calculate() {
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}

	stop() {
    	this.running = false;
    	clearInterval(this.watch);
	}  

    resetStopwatch() {
        this.running = false;
        this.reset();
        this.print();
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'),
);