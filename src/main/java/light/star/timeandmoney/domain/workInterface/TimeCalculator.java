package light.star.timeandmoney.domain.workInterface;

import light.star.timeandmoney.domain.FromToTimeModel;
import light.star.timeandmoney.domain.WorkAndRestMinuteModel;

import java.time.LocalTime;

public interface TimeCalculator {
    default WorkAndRestMinuteModel calculate(LocalTime localTime, FromToTimeModel workTime, FromToTimeModel restTime){
        return new WorkAndRestMinuteModel();
    }
}
