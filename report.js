function convertTimestamp(timestamp) {
  var d = new Date(+timestamp), // conver to integer
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
    time;

  time = dd + '/' + mm + '/' + yyyy;
  return time;
}

function timeToDecimal(t) {
  var arr = t.split(':');
  return parseFloat(parseInt(arr[0], 10) + '.' + parseInt(arr[1] / 6 * 10, 10));
}

var data = '';
var projects = document.querySelectorAll('.step_by_project');
projects.forEach(project => {
  data += '**** ' + project.dataset.sort_value + ' ****' + '\n';

  var days = project.querySelectorAll('.step_by_day');

  days.forEach(day => {
    var line = '';
    var localTime = convertTimestamp(day.dataset.sort_value); // time

    var tasks = day.querySelectorAll('.step_by_task');

    tasks.forEach(task => {
      var taskName = task.dataset.sort_value;
      var timeSpent = task.querySelector('.sep_total_hours').innerText;
      var user = task.querySelector('.step_by_user').dataset.sort_value;

      timeSpent = timeToDecimal(timeSpent.replace(/ h/, ''));

      line = localTime + '\t' + taskName + '\t' + timeSpent + '\t' + user;
      data += line + '\n';
    });
  });

  data += '\n';
});
