package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class WorkingResponseModel {
    //todo - MonthWorkingModel 이랑 TodayWorkingModel 속성제외 나머지 속성 지우기

    private Long id;
    //월급 받는 날짜
    private int SalaryDay;
    //월급
    private int Salary;
    //1주 몆일 근무?
    private int weekWorkingDay;
    //1주일 몆시간 근무?
    private int weekWorkingTime;
    //출근 시간
    private LocalDateTime startWorkTime;
    //퇴근 시간
    private LocalDateTime endWorkTime;
    //초당 버는 액수
    private int perIncreaseMoney;

    private MonthWorkingModel monthWorkingModel;

    public WorkingResponseModel(WorkingEntity entity){
        this.id = entity.getId();
        this.SalaryDay = entity.getSalaryDay();
        this.Salary = entity.getSalary();
        this.weekWorkingDay = entity.getWeekWorkingDay();
        this.weekWorkingTime = entity.getWeekWorkingTime();
        this.perIncreaseMoney = entity.getPerIncreaseMoney();
        this.monthWorkingModel = new MonthWorkingModel(SalaryDay, weekWorkingDay);
    }
}
