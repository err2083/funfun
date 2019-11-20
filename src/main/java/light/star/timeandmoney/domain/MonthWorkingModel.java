package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class MonthWorkingModel {
    private LocalDate localDate;

    private WeekAndEndModel goal;

    private WeekAndEndModel past;
    //월급날
    private int salaryDay;
    //1주일 근무일수
    private int weekWorkingDay;
    //한달 기준 당일 포함안함 , 10일 월급날이고 오늘 10일 이면 false
    private boolean isAfterSalaryDay;

    public MonthWorkingModel(int salaryDay, int weekWorkingDay){
        this.localDate = LocalDate.now();
        this.salaryDay = salaryDay;
        this.weekWorkingDay = weekWorkingDay;
        this.isAfterSalaryDay = (this.salaryDay < LocalDate.now().getDayOfMonth());
        makingWeekAndEndModel();
    }

    private void makingWeekAndEndModel(){
        if (isAfterSalaryDay) { //오늘날짜가 월급날이 지났을 경우
            int pastTotal = localDate.getDayOfMonth() - salaryDay - 1;
            // 월급날 포함해야 하므로  +1
            int goalTotal = localDate.withDayOfMonth(salaryDay + 1).until(localDate.plusMonths(1).withDayOfMonth(salaryDay)).getDays() + 1;
            this.past = new WeekAndEndModel(pastTotal, localDate.getDayOfWeek(), weekWorkingDay);
            this.goal = new WeekAndEndModel(goalTotal,
                    localDate.plusMonths(1).withDayOfYear(salaryDay).getDayOfWeek(), weekWorkingDay);
        } else {
            //todo 오늘날짜가 월급날 전일경우
        }
    }
}
