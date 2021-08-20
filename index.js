//Grabs date with the format 'Wednesday, August 18th' every date the page runs
let currentDate = moment().format('dddd, MMMM Do')

// populate p tag in Jumbotron with currentDate
document.getElementById('currentDay').textContent = currentDate
// Keep track of the hour to compare current time to preset times
let presentHour = moment().hour()

//Set up local storage variable that updates local storage with key 
// "workday" and parses the value to an object or returns schedule object
let workday = JSON.parse(localStorage.getItem('workday')) || schedule

//Fuction to turn the string to integer
const stringInteger = (timeString) => {
  //if key is value timeString
  switch (timeString) {
    //then do what is after the :
    case '8AM': return 8
    case '9AM': return 9
    case '10AM': return 10
    case '11AM': return 11
    case '12PM': return 12
    case '1PM': return 13
    case '2PM': return 14
    case '3PM': return 15
    case '4PM': return 16
    case '5PM': return 17
  }
} 
//compare presentHour to string integer
for (let i = 8; i < 18; i++) {
  //Target specific time slot and compare to current time
  let timeCounter = "time" + i
  //Set variable to string of time concatonated with number i starting from 8 to target the time8 through time17 IDs
  let timeString = document.getElementById(timeCounter).textContent
  //Passes timeString variable that contains string of the different time block divs
  // (eg "8AM" - "5PM" returns 8-17)
  let timeInteger = stringInteger(timeString)
  //if the present time equals the time slot integer

  if (presentHour == timeInteger) {
    //grab next div with nextElementSibling.and the text area with children[0] and add present class
    document.getElementById(timeCounter).nextElementSibling.children[0].classList.add('present') 
  }
  //If the present time isless than the time slot integer
  else if (presentHour < timeInteger) {
    //grab next div with nextElementSibling.and the text area with children[0] and add future class
    document.getElementById(timeCounter).nextElementSibling.children[0].classList.add('future') 
  }
  //If the present time is greater than the time slot integer
  else if (presentHour > timeInteger) {
    //grab next div with nextElementSibling.and the text area with children[0] and add future class
    document.getElementById(timeCounter).nextElementSibling.children[0].classList.add('past') 
  }

  //Handle populating text areas
  let planCounter = "plan" + i
  document.getElementById(planCounter).textContent = workday[planCounter]
}






//Handle saving


//Add event listener to listen for when the save button is clicked
document.addEventListener('click', event =>{
  //If the click target matches the save button class
  if (event.target.classList.contains('saveBtn')) {
    //grab text content value from text area
    let note = event.target.previousElementSibling.children[0].value
  
    //Gets ID
    let plan = event.target.previousElementSibling.children[0].id
    //updates wordkay/schedule object with the text are content value at every key plan8-plan17 with id from loop
    workday[plan] = note
    
    localStorage.setItem('workday',JSON.stringify(workday) )
 }
})
