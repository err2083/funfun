package light.star.timeandmoney.domain;

import light.star.timeandmoney.domain.enumType.WorkingStatus;
import light.star.timeandmoney.domain.workInterface.TimeCalculator;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalTime;

@Getter
@ToString
public class TodayWorkingModel {

    private LocalTime localTime;

    private WorkAndRestMinuteModel workAndRestMinuteModel;

    private FromToTimeModel workTime;

    private FromToTimeModel restTime;

    public TodayWorkingModel(LocalTime startWorkTime, LocalTime endWorkTime, LocalTime startRestTime, LocalTime endRestTime){
        localTime = LocalTime.now();
        this.workTime = new FromToTimeModel(startWorkTime, endWorkTime);
        this.restTime = new FromToTimeModel(startRestTime, endRestTime);

        calculateWorkAndRest();
    }

    //Test 용
    public TodayWorkingModel(LocalTime lll, LocalTime startWorkTime, LocalTime endWorkTime, LocalTime startRestTime, LocalTime endRestTime){
        localTime = lll;
        this.workTime = new FromToTimeModel(startWorkTime, endWorkTime);
        this.restTime = new FromToTimeModel(startRestTime, endRestTime);

        calculateWorkAndRest();
    }

    private void calculateWorkAndRest() {
        TimeCalculator calculator = WorkingStatus.findByLocalTime(localTime, workTime, restTime);
        this.workAndRestMinuteModel = calculator.calculate(localTime, workTime, restTime);
    }
}
