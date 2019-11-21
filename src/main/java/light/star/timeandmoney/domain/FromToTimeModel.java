package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalTime;

@Getter
@ToString
public class FromToTimeModel {
    private LocalTime from;

    private LocalTime to;

    public FromToTimeModel(LocalTime from, LocalTime to){
        this.from = from;
        this.to = to;
    }
}
