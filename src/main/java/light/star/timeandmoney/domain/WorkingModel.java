package light.star.timeandmoney.domain;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
public class WorkingModel {

    //todo : 데이터 보정 어노테이션

    @Id @GeneratedValue
    private Long id;
    //월급 받는 날짜
    private int SalaryDay;
    //월급
    private int Salary;
    //1주 몆일 근무?
    private int checkWeekWorking;
    //1주일 몆시간 근무?
    private int weekWorking;
    //출근 시간
    private LocalDateTime startWorkTime;
    //퇴근 시간
    private LocalDateTime endWorkTime;
    //1초당 급여 상승
    @Transient
    private BigDecimal perIncreaseMoney;
    //근무 시작일
    @Transient
    private LocalDate startWorkday;
    //근무 종료일
    @Transient
    private LocalDate endWorkday;
}
