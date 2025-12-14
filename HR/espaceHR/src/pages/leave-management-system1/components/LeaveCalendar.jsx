import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LeaveCalendar = ({ leaveRequests, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));
  
  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };
  
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const getLeaveStatusForDate = (day) => {
    const dateStr = `${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    const leave = leaveRequests?.find(req => {
      const startDate = new Date(req.startDate);
      const endDate = new Date(req.endDate);
      const checkDate = new Date(dateStr);
      return checkDate >= startDate && checkDate <= endDate;
    });
    
    if (!leave) return null;
    
    const statusColors = {
      'Approuvé': 'bg-success/20 border-success',
      'En attente': 'bg-warning/20 border-warning',
      'Rejeté': 'bg-error/20 border-error'
    };
    
    return statusColors?.[leave?.status] || '';
  };
  
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Mois précédent"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Mois suivant"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dayNames?.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: startingDayOfWeek })?.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth })?.map((_, index) => {
          const day = index + 1;
          const leaveStatus = getLeaveStatusForDate(day);
          const isToday = day === new Date()?.getDate() && 
                         currentDate?.getMonth() === new Date()?.getMonth() &&
                         currentDate?.getFullYear() === new Date()?.getFullYear();
          
          return (
            <button
              key={day}
              onClick={() => onDateSelect && onDateSelect(day)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 hover:bg-muted
                ${leaveStatus ? `${leaveStatus} border` : 'border border-transparent'}
                ${isToday ? 'ring-2 ring-primary' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/20 border border-success" />
          <span className="text-xs text-muted-foreground">Approuvé</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning/20 border border-warning" />
          <span className="text-xs text-muted-foreground">En attente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-error/20 border border-error" />
          <span className="text-xs text-muted-foreground">Rejeté</span>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;