package light.star.timeandmoney.domain;

import light.star.timeandmoney.util.Constant;
import light.star.timeandmoney.util.FunctionUtil;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
public class WorkingRequestModel {

    //월급 받는 날짜
    private int salaryDay;
    //월급
    private int salary;
    //1주 몆일 근무?
    private int weekWorkingDay;
    //1주일 몆시간 근무?
    private int weekWorkingTime;
    //출근 시간
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime startWorkTime;
    //퇴근 시간
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime endWorkTime;
    //휴식 시작 시간
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime startRestTime;
    //휴식 끝 시간
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime endRestTime;

    public WorkingRequestModel(int salaryDay, int salary, int weekWorkingDay, int weekWorkingTime, LocalTime startWorkTime, LocalTime endWorkTime,
                               LocalTime startRestTime, LocalTime endRestTime) {
        this.salaryDay = salaryDay;
        this.salary = salary;
        this.weekWorkingDay = weekWorkingDay;
        this.weekWorkingTime = weekWorkingTime;
        this.startWorkTime = startWorkTime;
        this.endWorkTime = endWorkTime;
        this.startRestTime = startRestTime;
        this.endRestTime = endRestTime;
    }

    public WorkingEntity toEntity() {
        return WorkingEntity.builder()
                .salaryDay(this.getSalaryDay())
                .salary(this.getSalary())
                .weekWorkingDay(this.getWeekWorkingDay())
                .weekWorkingTime(this.getWeekWorkingTime())
                .startWorkTime(this.getStartWorkTime())
                .endWorkTime(this.getEndWorkTime())
                .startRestTime(this.getStartRestTime())
                .endRestTime(this.getEndRestTime())
                .perIncreaseMoney(this.calculateMinuteIncreaseMoney()).build();
    }

    private int calculateMinuteIncreaseMoney(){
        BigDecimal workHour = FunctionUtil.divideBigDecimal(weekWorkingTime, weekWorkingDay);
        BigDecimal workMinute = workHour.multiply(new BigDecimal(Constant.oneHour_to_minute));
        return FunctionUtil.divideBigDecimal(salary, workMinute).intValue();
    }
}
