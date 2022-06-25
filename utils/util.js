export const getDateDiff = curr_dt => {
  const postTime = new Date(curr_dt).getTime();
  const currTime = new Date().getTime();
  const diff = new Date(currTime - postTime);
  const diff_days = Math.floor(diff / 1000 / 60 / (60 * 24));
  switch (true) {
    case diff_days > 0:
      return diff_days + ' Day(s) ago';
    case diff.getUTCHours() > 0:
      return diff.getHours() + ' Hour(s) ago';
    case diff.getUTCMinutes() > 0:
      return diff.getUTCMinutes() + ' Minute(s) ago';
    default:
      return diff.getUTCSeconds() + ' Seconds ago';
  }
};
