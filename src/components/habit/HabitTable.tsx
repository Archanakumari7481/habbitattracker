import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import type { Habit, HabitLog } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface HabitTableProps {
  habits: Habit[];
  habitLogs: HabitLog[];
  selectedMonth: number;
  selectedYear: number;
  onUpdateLog: (habitId: string, date: string, status: 'done' | 'skip' | 'empty') => void;
  onDeleteHabit: (habitId: string) => void;
}

export function HabitTable({
  habits,
  habitLogs,
  selectedMonth,
  selectedYear,
  onUpdateLog,
  onDeleteHabit,
}: HabitTableProps) {
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getLogStatus = (habitId: string, day: number) => {
    const date = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const log = habitLogs.find(l => l.habit_id === habitId && l.date === date);
    return log?.status || 'empty';
  };

  const getStreak = (habitId: string) => {
    let streak = 0;
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (selectedMonth !== currentMonth || selectedYear !== currentYear) {
      return 0;
    }

    for (let day = currentDay; day >= 1; day--) {
      const status = getLogStatus(habitId, day);
      if (status === 'done') {
        streak++;
      } else if (status === 'skip') {
        continue;
      } else {
        break;
      }
    }

    return streak;
  };

  const handleCellClick = (habitId: string, day: number) => {
    const date = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const currentStatus = getLogStatus(habitId, day);
    
    let newStatus: 'done' | 'skip' | 'empty';
    if (currentStatus === 'empty') {
      newStatus = 'done';
    } else if (currentStatus === 'done') {
      newStatus = 'skip';
    } else {
      newStatus = 'empty';
    }

    onUpdateLog(habitId, date, newStatus);
  };

  const getCellColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-500 hover:bg-green-600';
      case 'skip':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-muted hover:bg-muted/80';
    }
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No habits yet. Add your first habit to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="inline-block min-w-full align-middle">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-background border p-2 text-left min-w-[150px] xl:min-w-[200px]">
                Habit
              </th>
              <th className="border p-2 min-w-[70px] xl:min-w-[80px]">Priority</th>
              <th className="border p-2 min-w-[70px] xl:min-w-[80px]">Streak</th>
              {dates.map(day => (
                <th key={day} className="border p-1 xl:p-2 min-w-[36px] xl:min-w-[40px] text-center text-xs xl:text-sm">
                  {day}
                </th>
              ))}
              <th className="sticky right-0 z-20 bg-background border p-2 min-w-[60px] xl:min-w-[80px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => (
              <tr key={habit.id}>
                <td className="sticky left-0 z-10 bg-background border p-2 font-medium text-xs xl:text-sm">
                  {habit.name}
                </td>
                <td className="border p-1 xl:p-2 text-center">
                  {habit.priority === 2 && <Badge variant="destructive" className="text-xs">High</Badge>}
                  {habit.priority === 1 && <Badge className="text-xs">Medium</Badge>}
                  {habit.priority === 0 && <Badge variant="secondary" className="text-xs">Normal</Badge>}
                </td>
                <td className="border p-1 xl:p-2 text-center">
                  <Badge variant="outline" className="text-xs">{getStreak(habit.id)}</Badge>
                </td>
                {dates.map(day => {
                  const status = getLogStatus(habit.id, day);
                  return (
                    <td key={day} className="border p-0">
                      <button
                        type="button"
                        onClick={() => handleCellClick(habit.id, day)}
                        className={`w-full h-9 xl:h-10 transition-colors flex items-center justify-center ${getCellColor(status)}`}
                        title={status}
                        aria-label={`${habit.name} - Day ${day} - ${status}`}
                      >
                        {status === 'done' && <Check className="h-3 w-3 xl:h-4 xl:w-4 text-white" />}
                        {status === 'skip' && <X className="h-3 w-3 xl:h-4 xl:w-4 text-white" />}
                      </button>
                    </td>
                  );
                })}
                <td className="sticky right-0 z-10 bg-background border p-1 xl:p-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 xl:h-10 xl:w-10">
                        <Trash2 className="h-3 w-3 xl:h-4 xl:w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Habit</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this habit? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDeleteHabit(habit.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
