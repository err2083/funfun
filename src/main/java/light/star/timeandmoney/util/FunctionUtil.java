package light.star.timeandmoney.util;

import java.math.BigDecimal;

public class FunctionUtil {

    //todo BigDecimalUtil 로 뺄것
    static public BigDecimal divideBigDecimal(int p1, int p2) {
        return new BigDecimal(p1).divide(new BigDecimal(p2), 4);
    }

    static public BigDecimal divideBigDecimal(int p1, BigDecimal p2) {
        return new BigDecimal(p1).divide(p2, 4);
    }

    static public BigDecimal divideBigDecimal(BigDecimal p1, int p2) {
        return p1.divide(new BigDecimal(p2), 4);
    }

    static public BigDecimal multiplyBigDecimal(BigDecimal p1, int p2) {
        return p1.multiply(new BigDecimal(p2));
    }
}
