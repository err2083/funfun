package light.star.timeandmoney.domain.time;

import light.star.timeandmoney.domain.FromToTimeModel;
import light.star.timeandmoney.domain.WorkAndRestMinuteModel;
import light.star.timeandmoney.domain.workInterface.TimeCalculator;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

public class MorningStatus implements TimeCalculator {

    @Override
    public WorkAndRestMinuteModel calculate(LocalTime localTime, FromToTimeModel workTime, FromToTimeModel restTime) {
        return new WorkAndRestMinuteModel((int) ChronoUnit.MINUTES.between(workTime.getFrom(), localTime),0);
    }
}
