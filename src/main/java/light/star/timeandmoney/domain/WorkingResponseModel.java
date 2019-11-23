package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkingResponseModel {
    //todo - MonthWorkingModel 이랑 TodayWorkingModel 속성제외 나머지 속성 지우기

    private Long id;
    //월급
    private int salary;
    //1주일 몆시간 근무?
    private int weekWorkingTime;
    //초당 버는 액수
    private int minuteIncreaseMoney;

    private MonthWorkingModel monthWorkingModel;

    private TodayWorkingModel todayWorkingModel;

    public WorkingResponseModel(WorkingEntity entity){
        this.id = entity.getId();
        this.salary = entity.getSalary();
        this.minuteIncreaseMoney = entity.getPerIncreaseMoney();
        this.todayWorkingModel = new TodayWorkingModel(entity.getStartWorkTime(), entity.getEndWorkTime(),
                entity.getStartRestTime(), entity.getEndRestTime());
        this.monthWorkingModel = new MonthWorkingModel(entity.getSalaryDay(), entity.getWeekWorkingDay());
    }
}
