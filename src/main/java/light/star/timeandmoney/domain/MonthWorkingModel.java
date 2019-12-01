package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter
@ToString
public class MonthWorkingModel {
    private LocalDate localDate;

    private WeekAndEndModel goal;
    //오늘 포함하지 않는다
    private WeekAndEndModel past;
    //월급날
    private int salaryDay;
    //1주일 근무일수
    private int weekWorkingDay;
    //한달 기준 당일 포함안함 , 10일 월급날이고 오늘 10일 이면 false
    private boolean isAfterSalaryDay;

    private boolean isWeekend;

    public MonthWorkingModel(int salaryDay, int weekWorkingDay){
        this.localDate = LocalDate.now();
        this.salaryDay = salaryDay;
        this.weekWorkingDay = weekWorkingDay;
        this.isAfterSalaryDay = (this.salaryDay < localDate.getDayOfMonth());

        makingWeekAndEndModel();
        this.isWeekend = WeekAndEndModel.isWeekendDay(this.localDate.getDayOfWeek(), this.weekWorkingDay);
    }

    private void makingWeekAndEndModel(){
        int pastTotal, goalTotal;
        if (isAfterSalaryDay) { //오늘날짜가 월급날이 지났을 경우
            pastTotal = localDate.getDayOfMonth() - salaryDay - 1;
            goalTotal = (int) ChronoUnit.DAYS.between(localDate.withDayOfMonth(salaryDay), localDate.plusMonths(1).withDayOfMonth(salaryDay));
            this.past = new WeekAndEndModel(pastTotal, localDate.withDayOfMonth(salaryDay).plusDays(1).getDayOfWeek(), weekWorkingDay);
            this.goal = new WeekAndEndModel(goalTotal,
                    localDate.withDayOfMonth(salaryDay).plusDays(1).getDayOfWeek(), weekWorkingDay);
        } else {
            pastTotal = (int) ChronoUnit.DAYS.between(localDate.minusMonths(1).withDayOfMonth(salaryDay).plusDays(1), localDate);
            goalTotal = (int) ChronoUnit.DAYS.between(localDate.minusMonths(1).withDayOfMonth(salaryDay), localDate.withDayOfMonth(salaryDay));
            this.past = new WeekAndEndModel(pastTotal, localDate.minusMonths(1).withDayOfMonth(salaryDay).plusDays(1).getDayOfWeek(), weekWorkingDay);
            this.goal = new WeekAndEndModel(goalTotal, localDate.minusMonths(1).withDayOfMonth(salaryDay).plusDays(1).getDayOfWeek(), weekWorkingDay);
        }
    }
}
