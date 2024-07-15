
export default function get_ui_ready_date (db_date) {

  const months = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'}
  let ui_updated = new Date(db_date)
  return double_digit_date(ui_updated.getDate()) + " " + months[ui_updated.getMonth()] + " " + ui_updated.getFullYear()

}

const double_digit_date = (date) =>  parseInt(date) < 10 ? '0' + date : date

export const get_db_ready_datetime = (orig_format_datetime = "") => {

  if(orig_format_datetime === "") return new Date().toJSON().slice(0, 19).replace('T', ' ')
  return orig_format_datetime  // future : format provided datetime in orig_format_datetime

}
