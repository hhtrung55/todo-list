import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getDate } from "../utils/date";

export default function DatePicker({ onChangeDate, dateValue }) {
  const min = useMemo(() => getDate(), []);

  const [date, setDate] = useState(dateValue || min);

  const onChange = useCallback((e) => {
    const value = e.target.value
    setDate(value);
    onChangeDate(value)
  }, []);

  return <input type="date" min={min} value={date} onChange={onChange}/>;
}
