package light.star.timeandmoney.domain;

import lombok.Getter;
import org.apache.tomcat.jni.Local;

import java.time.LocalDate;

@Getter
public class MonthWorkingModel {
    //현재 달 기준 월급날 까지 총 한달 수
    private int totalDay;
    //한달 일하는 수
    private int workDay;
    //한달 주말 수
    private int weekendDay;
    //지난 일하는 수
    private int workedDay;
    //지난 주말 수
    private int weekendedDay;
    //지난 총 일수
    private int pastDay; //오늘 포함안함
    //월급날
    private int salaryDay;
    //1주일 근무일수
    private int weekWorkingDay;

    private boolean isAfterSalaryDay; //한달 기준 당일 포함안함 , 10일 월급날이고 오늘 10일 이면 false

    public MonthWorkingModel(int salaryDay, int weekWorkingDay){
        this.salaryDay = salaryDay;
        this.weekWorkingDay = weekWorkingDay;
        this.isAfterSalaryDay = (this.salaryDay < LocalDate.now().getDayOfMonth());
        starlight();
    }

    private void starlight(){
        LocalDate localDate = LocalDate.now();
        if (isAfterSalaryDay) { //월급날이 지났을 경우
            this.pastDay = localDate.getDayOfMonth() - salaryDay - 2;
            this.totalDay = LocalDate.of(localDate.getYear(), localDate.getMonthValue() + 1, salaryDay)
                    .until(LocalDate.of(localDate.getYear(), localDate.getMonthValue(), salaryDay + 1)).getDays();
            starPastWorkDay();
        } else {

        }
    }

    private void starPastWorkDay(){
        LocalDate localDate = LocalDate.now();
        int common = this.pastDay / 7;
        int cal = this.pastDay % 7;
        this.workedDay = common * this.weekWorkingDay;
        this.weekendedDay = common * (7 - this.weekWorkingDay);
        int today = localDate.getDayOfWeek().getValue();
    }
}
