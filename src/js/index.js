class DatePicker {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  #calendarDate = {
    data:'', 
    date:0,
    month:0,
    year:0,
  };


  selectedDate = {
    data:'',
    date: 0,
    month: 0,
    year: 0,
  };

  datePickerEl;
  dateInputEl;
  calendarEl;
  calendarMonthEl;
  monthContentEl;
  nextBtnEl;
  prevBtnEl;
  calendarDatesEl;

  constructor() {
    this.assignElement();
    this.initCalendarDate();
    this.addEvent();
  }

  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  setDateInput() {
    this.dateInputEl.textContent = this.formateDate(this.selectedDate.data);
    this.dateInputEl.dataset.value = this.selectedDate.data;
  };

  

  assignElement() {
    this.datePickerEl = document.getElementById('date-picker');
    this.dateInputEl = this.datePickerEl.querySelector('#date-input');
    this.calendarEl = this.datePickerEl.querySelector('#calendar')
    this.calendarMonthEl = this.calendarEl.querySelector('#month');
    this.monthContentEl = this.calendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }

  addEvent() {
    this.dateInputEl.addEventListener('click',this.toggleCalendar.bind(this));
    this.nextBtnEl.addEventListener('click',this.moveToNextMonth.bind(this))
    this.prevBtnEl.addEventListener('click',this.moveToPrevMonth.bind(this))
  }

moveToNextMonth() {
  this.#calendarDate.month++;
  if(this.#calendarDate.month > 11){
    this.#calendarDate.month = 0;
    this.#calendarDate.year++;
  }
  this.updateMonth();
  this.updateDates();
}

moveToPrevMonth() {
  this.#calendarDate.month--;
  if(this.#calendarDate.month < 0){
    this.#calendarDate.month = 11;
    this.#calendarDate.year--;
  }
  this.updateMonth();
  this.updateDates();
}

  toggleCalendar() {
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
  }
  updateMonth() {
    this.monthContentEl.textContent = `${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`;
  }
  updateDates() {
    this.calendarDatesEl.innerHTML = '';
    const numberOfDates = new Date(
      this.#calendarDate.year, 
      this.#calendarDate.month+1,0
      ).getDate();

      const fragment = new DocumentFragment();
      for(let i =0; i < numberOfDates; i++){
        const dateEl = document.createElement('div');
        dateEl.classList.add('date');
        dateEl.textContent = i+1;
        dateEl.dataset.date =i+1;
        fragment.appendChild(dateEl);
      }
      fragment.firstChild.style.gridColumnStart = new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      this.calendarDatesEl.appendChild(fragment);
      this.colorSaturday(); 
      this.colorSunday();
      this.markToday();
  }

  markToday() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currnetYear = currentDate.getFullYear();
    const today = currentDate.getDate();
    if(
      currnetYear === this.#calendarDate.year && 
      currentMonth === this.#calendarDate.month
      ) {
      this.calendarDatesEl
      .querySelector(`[data-date='${today}']`)
      .classList.add('today');
    }  
  }

  colorSaturday() {
    const saturdayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        8 - 
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`,
    );
    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = 'blue';
    } 
  }

  colorSunday() {
    const sundayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
      (9 -
        new Date(
          this.#calendarDate.year, 
          this.#calendarDate.month,
          1,
        ).getDay()) % 8
      })`,
    );

      for(let i=0; i < sundayEls.length; i++) {
        sundayEls[i].style.color='red';
      };
    }
}

new DatePicker();






