package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

@Getter
@ToString
public class FromToTimeModel {
    private LocalTime from;

    private LocalTime to;

    public FromToTimeModel(LocalTime from, LocalTime to){
        this.from = from;
        this.to = to;
    }

    public int fromToMinute(){
        return (int) ChronoUnit.MINUTES.between(from, to);
    }
}
