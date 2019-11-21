package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.ToString;

import java.time.Duration;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

@Getter
@ToString
public class TodayWorkingModel {

    private LocalTime localTime;

    private FromToTimeModel workTime;

    private FromToTimeModel restTime;

    public TodayWorkingModel(LocalTime startWorkTime, LocalTime endWorkTime, LocalTime startRestTime, LocalTime endRestTime){
        localTime = LocalTime.now();
        this.workTime = new FromToTimeModel(startWorkTime, endWorkTime);
        this.restTime = new FromToTimeModel(startRestTime, endRestTime);

        //todo - 현재 시간 기준 몆분 일했고 몆분 쉬었고 몆분일해야하고 몆분 쉬는 시간이 있는지
    }
}
