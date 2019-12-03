package light.star.timeandmoney.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class WorkAndRestMinuteModel {

    private int workMinute;

    private int restMinute;
}
