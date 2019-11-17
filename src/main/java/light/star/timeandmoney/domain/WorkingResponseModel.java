package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class WorkingResponseModel {

    private Long id;
    //월급 받는 날짜
    private int SalaryDay;
    //월급
    private int Salary;
    //1주 몆일 근무?
    private int checkWeekWorking;
    //1주일 몆시간 근무?
    private int weekWorking;
//    //출근 시간
//    private LocalDateTime startWorkTime;
//    //퇴근 시간
//    private LocalDateTime endWorkTime;

    public WorkingResponseModel(WorkingEntity entity){
        this.id = entity.getId();
        this.SalaryDay = entity.getSalaryDay();
        this.Salary = entity.getSalary();
        this.checkWeekWorking = entity.getCheckWeekWorking();
        this.weekWorking = entity.getWeekWorking();
    }
}
