type Placement = {
  number: number;
  name: string;
};
export type resultDataType = {
  resultID: number;
  date: string;
  first_place: Placement;
  second_place: Placement;
  third_place: Placement;
};
export type usersDataType = {
  userID: number;
  number: number;
  name: string;
  start_date: string;
};
