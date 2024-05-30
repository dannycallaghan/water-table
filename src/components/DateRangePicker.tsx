import Datepicker, {
  DateRangeType,
  DateValueType,
} from 'react-tailwindcss-datepicker';
import { memo, useCallback, useState } from 'react';

const DateRangePicker = memo(function DateRangePicker(props: {
  handleDateChange: (startDate: string, endDate: string) => void;
}) {
  const [value, setValue] = useState<DateRangeType>({
    startDate: null,
    endDate: null,
  });
  const { handleDateChange } = props;

  const handleValueChange = useCallback(
    (value: DateValueType): void => {
      setValue(value as DateRangeType);
      const startDate = new Date(value?.startDate as string).toISOString();
      const endDate = value?.endDate
        ? new Date(value?.endDate as string).toISOString()
        : new Date().toISOString();

      handleDateChange(startDate, endDate);
    },
    [handleDateChange]
  );

  return (
    <>
      <div className="flex w-full max-w-56 flex-col">
        <label className="text-[0.7rem] text-gray-400">FROM - TO</label>
        <Datepicker
          value={value}
          displayFormat={'DD/MM/YYYY'}
          placeholder={'DD/MM/YYYY - DD/MM/YYYY'}
          onChange={handleValueChange}
          inputClassName="h-8 rounded border border-solid border-slate-300 p-1 text-[0.7rem] text-slate-600 focus:border-slate-300 active:border-slate-300 focus-visible:border-slate-300 w-full focus:outline-none"
          toggleClassName="absolute bg-white rounded border border-solid border-slate-300 text-slate-600 right-0 h-full px-3 border-l-0"
        />
      </div>
    </>
  );
});

export default DateRangePicker;
