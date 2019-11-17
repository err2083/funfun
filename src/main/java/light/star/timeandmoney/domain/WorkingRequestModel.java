package light.star.timeandmoney.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class WorkingRequestModel {

    //월급 받는 날짜
    private int SalaryDay;
    //월급
    private int Salary;
    //1주 몆일 근무?
    private int checkWeekWorking;
    //1주일 몆시간 근무?
    private int weekWorking;
//    //출근 시간
//    @JsonFormat(pattern = "aa KK:mm")
//    private LocalDateTime startWorkTime;
//    //퇴근 시간
//    @JsonFormat(pattern = "aa KK:mm")
//    private LocalDateTime endWorkTime;
    //1초당 급여 상승
    private BigDecimal perIncreaseMoney;
    //근무 시작일
    private LocalDate startWorkday;
    //근무 종료일
    private LocalDate endWorkday;

    @Builder
    public WorkingRequestModel(int salaryDay, int salary, int checkWeekWorking, int weekWorking) {
        this.SalaryDay = salaryDay;
        this.Salary = salary;
        this.checkWeekWorking = checkWeekWorking;
        this.weekWorking = weekWorking;
//        this.startWorkTime = startWorkTime;
//        this.endWorkTime = endWorkTime;

        calculate();
    }

    public WorkingEntity toEntity(){
        return WorkingEntity.builder()
                .salaryDay(this.getSalaryDay())
                .salary(this.getSalary())
                .checkWeekWorking(this.getCheckWeekWorking())
                .weekWorking(this.getWeekWorking()).build();
//                .startWorkTime(this.getStartWorkTime())
//                .endWorkTime(this.getEndWorkTime()).build();
    }

    private void calculate(){
        calculateIncreaseMoney();
        calculateStartWorkday();
        calculateEndWorkday();
    }

    private void calculateIncreaseMoney(){
        this.perIncreaseMoney = null;
    }

    private void calculateStartWorkday(){
        this.startWorkday = null;
    }

    private void calculateEndWorkday(){
        this.endWorkday = null;
    }
}
