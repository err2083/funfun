package light.star.timeandmoney.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class WorkAndRestMinuteModel {
    private int workMinute;

    private int restMinute;
}
