package light.star.timeandmoney.domain;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class WorkingEntity extends BaseTimeModel{

    /**
     * Entity 모델은 db layer 모델로 이 자체로 불변성을 지니게 해줘야함
     * 실제 view 에서는 다른 모델을 사용하는 것을 권장
     */
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

    @Builder
    public WorkingEntity(int salaryDay, int salary, int checkWeekWorking, int weekWorking) {
        this.SalaryDay = salaryDay;
        this.Salary = salary;
        this.checkWeekWorking = checkWeekWorking;
        this.weekWorking = weekWorking;
//        this.startWorkTime = startWorkTime;
//        this.endWorkTime = endWorkTime;
    }
}
