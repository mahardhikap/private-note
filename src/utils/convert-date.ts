import moment from "moment";
import 'moment/locale/id';

export const formatDateToIndonesian = (dateString: string) => {
  moment.locale("id");
  return moment(dateString).format("dddd, DD MMMM YYYY");
};
