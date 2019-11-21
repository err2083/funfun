package light.star.timeandmoney.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class WorkAndRestTimeModel {
    private int workMinute;

    private int restMinute;
}
