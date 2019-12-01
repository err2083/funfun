package light.star.timeandmoney.domain;

import light.star.timeandmoney.util.FunctionUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
public class WorkingResponseModel {
    //todo - MonthWorkingModel 이랑 TodayWorkingModel 속성제외 나머지 속성 지우기

    private Long id;
    //월급
    private int salary;
    //1주일 몆시간 근무?
    private int weekWorkingTime;
    //분당 버는 액수
    private BigDecimal minuteIncreaseMoney;

    private BigDecimal earnedMoney;

    private MonthWorkingModel monthWorkingModel;

    private TodayWorkingModel todayWorkingModel;

    public WorkingResponseModel(WorkingEntity entity){
        this.id = entity.getId();
        this.salary = entity.getSalary();
        this.weekWorkingTime = entity.getWeekWorkingTime();
        this.todayWorkingModel = new TodayWorkingModel(entity.getStartWorkTime(), entity.getEndWorkTime(),
                entity.getStartRestTime(), entity.getEndRestTime());
        this.monthWorkingModel = new MonthWorkingModel(entity.getSalaryDay(), entity.getWeekWorkingDay());
        this.minuteIncreaseMoney = makeMinuteIncreaseMoney();
        this.earnedMoney = makeEarnedMoney();
    }

    private BigDecimal makeMinuteIncreaseMoney(){
        BigDecimal oneDayMoney = FunctionUtil.divideBigDecimal(salary, monthWorkingModel.getGoal().getWeekDay());
        return FunctionUtil.divideBigDecimal(oneDayMoney, todayWorkingModel.getWorkTime().fromToMinute() - todayWorkingModel.getRestTime().fromToMinute());
    }

    private BigDecimal makeEarnedMoney(){
        BigDecimal oneDayMoney = FunctionUtil.divideBigDecimal(salary, monthWorkingModel.getGoal().getWeekDay());
        return FunctionUtil.multiplyBigDecimal(oneDayMoney, monthWorkingModel.getPast().getWeekDay());
    }
}
