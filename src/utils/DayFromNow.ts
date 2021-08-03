import moment from 'moment'
export default function DayFromNow(myDate: any) {
  // get from-now for this date
  const datebook = moment(myDate).fromNow();
  const InputDate = moment(myDate)
  // ensure the date is displayed with today and yesterday
  return moment(InputDate).calendar(null, {
    // when the date is closer, specify custom values
    sameDay: function () {
      return "[" + datebook + "]";
    },
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: 'DD/MM/YYYY',
    sameElse: 'DD/MM/YYYY'
  });
} 