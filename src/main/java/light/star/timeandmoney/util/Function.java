package light.star.timeandmoney.util;

import java.math.BigDecimal;

public class Function {

    //todo BigDecimalUtil 로 뺄것
    static public BigDecimal divideBigDecimal(int p1, int p2){
        return new BigDecimal(p1).divide(new BigDecimal(p2));
    }
}
