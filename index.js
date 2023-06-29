/* Your Code Here */
function createEmployeeRecord(data) {
    const employee = {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee;
}

function createEmployeeRecords(data) {
    const records = [];
    data.forEach( employee => records.push(createEmployeeRecord(employee)))
    return records
}


function createTimeInEvent(date) {
    const timeInData = {};
    const dateInfo = date.split(" ");
    timeInData.type = "TimeIn";
    timeInData.hour = parseInt(dateInfo[1]);
    timeInData.date = dateInfo[0];
    this.timeInEvents.push(timeInData);

    return this
}

function createTimeOutEvent(date) {
    const timeOutData = {};
    const dateInfo = date.split(" ");
    timeOutData.type = "TimeOut";
    timeOutData.hour = parseInt(dateInfo[1]);
    timeOutData.date = dateInfo[0];
    this.timeOutEvents.push(timeOutData);

    return this
}

function hoursWorkedOnDate(date) {
    const dayIn = this.timeInEvents.find( dateInfo => dateInfo.date === date);
    const dayOut = this.timeOutEvents.find( dateInfo => dateInfo.date === date);
    const hoursWorked = (dayOut.hour - dayIn.hour)/100;
    return hoursWorked
}

function wagesEarnedOnDate(date) {
    const wage = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return wage;
}

// function allWagesFor() {
//     let wage = 0;
//     record.timeInEvents.forEach( day => {
//         wage += wagesEarnedOnDate(day.date);
//     })
//     return wage
// }

// function calculatePayroll(employees) {
//     let payroll = 0;
//     employees.forEach( employee => {
//         payroll += allWagesFor(employee);
//     })
//     return payroll
// }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }