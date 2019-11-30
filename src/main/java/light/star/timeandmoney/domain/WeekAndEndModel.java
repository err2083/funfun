package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.DayOfWeek;

@Getter
@NoArgsConstructor
@ToString
public class WeekAndEndModel {
    private int totalDay;

    private int weekDay;

    private int weekendDay;

    private int weekWorkingDay;

    //오늘 요일부터 몆일까지 구할지를 입력한다.
    public WeekAndEndModel(int totalDay, DayOfWeek dayOfWeek, int weekWorkingDay) {
        this.totalDay = totalDay;
        this.weekWorkingDay = weekWorkingDay;

        int oneWeekCycle = this.totalDay / 7;
        this.weekDay = oneWeekCycle * this.weekWorkingDay;
        this.weekendDay = oneWeekCycle * (7 - this.weekWorkingDay);

        calculateRemainder(dayOfWeek);
    }

    private void calculateRemainder(DayOfWeek dayOfWeek) {
        int cal = this.totalDay % 7;
        for (int i = dayOfWeek.getValue(); i < dayOfWeek.getValue() + cal; i++) {
            boolean isWeekendDay = isWeekendDay(DayOfWeek.of((i + 6) % 7 + 1));
            if (isWeekendDay) {
                this.weekendDay += 1;
            } else {
                this.weekDay += 1;
            }
        }
    }

    public boolean isWeekendDay(DayOfWeek dayOfWeek) {
        if (this.weekWorkingDay == 5) {
            return (dayOfWeek == DayOfWeek.SATURDAY) || (dayOfWeek == DayOfWeek.SUNDAY);
        } else if (this.weekWorkingDay == 6) {
            return (dayOfWeek == DayOfWeek.SUNDAY);
        } else {
            return false;
        }
    }
}
