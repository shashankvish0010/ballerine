import React, { useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { formatDate } from '@/common/utils/format-date';
import { ctw } from '@/common/utils/ctw/ctw';
import { Button } from '../../atoms/Button/Button';
import { Calendar } from '../../organisms/Calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@ballerine/ui';
import { DateRange } from 'react-day-picker';

type TDateRangePickerProps = {
  onChange: (range: DateRange | undefined) => void;
};

export function DateRangePicker({ onChange }: TDateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div className={ctw('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={ctw('w-[300px] justify-start text-left font-normal', {
              'text-muted-foreground': !date,
            })}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from && date?.to && (
              <>
                {formatDate(date.from, 'LLL dd, y')} - {formatDate(date.to, 'LLL dd, y')}
              </>
            )}
            {date?.from && !date?.to && formatDate(date.from, 'LLL dd, y')}
            {!date?.from && !date?.to && <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={selection => {
              setDate(selection);
              onChange(selection);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
