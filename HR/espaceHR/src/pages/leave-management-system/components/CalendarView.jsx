import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CalendarView = ({ leaveEvents, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1));

  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date) => {
    return leaveEvents?.filter((event) => {
      const eventDate = new Date(event.date);
      return (eventDate?.getDate() === date &&
      eventDate?.getMonth() === currentMonth?.getMonth() && eventDate?.getFullYear() === currentMonth?.getFullYear());
    });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const days = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    days?.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days?.push(i);
  }

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={handlePrevMonth}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={handleNextMonth}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']?.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}

        {days?.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const events = getEventsForDate(day);
          const isSelected =
            selectedDate &&
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentMonth?.getMonth();

          return (
            <button
              key={day}
              onClick={() =>
                onDateSelect(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  )
                )
              }
              className={`aspect-square p-1 rounded-lg border transition-all duration-150 hover:border-primary ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border hover:bg-accent/5'
              }`}
            >
              <div className="text-xs font-medium mb-1">{day}</div>
              {events?.length > 0 && (
                <div className="flex flex-wrap gap-0.5 justify-center">
                  {events?.slice(0, 3)?.map((event, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: event?.color }}
                    />
                  ))}
                  {events?.length > 3 && (
                    <div className="text-[8px] text-muted-foreground">
                      +{events?.length - 3}
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-xs text-muted-foreground">Congés payés</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">Maladie</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">Personnel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-xs text-muted-foreground">Parental</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;