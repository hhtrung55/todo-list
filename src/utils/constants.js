import { getDate } from "./date";

const options = [
  { label: "Normal", value: 2 },
  { label: "High", value: 3 },
  { label: "Low", value: 1 },
];

const minDate = getDate();

export { options, minDate };
