package light.star.timeandmoney.domain;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkingResponseModelTest {

    @Test
    public void localDateTimeTest(){
        LocalDate dateTime = LocalDate.now();
        System.out.println("getDayOfMonth : " + dateTime.getDayOfYear()); // 323
        System.out.println("getDayOfWeek : " + dateTime.getDayOfWeek().getValue()); //월1일7 = 2
        System.out.println("getMonthValue : " + dateTime.getMonthValue()); // = 11
        System.out.println("getDayOfMonth : " + dateTime.getDayOfMonth()); // = 19
        System.out.println("lengthOfMonth : " + dateTime.lengthOfMonth()); // = 30
        System.out.println("isLeapYear : " + dateTime.isLeapYear()); // 윤년
        System.out.println("1 months" + dateTime.plusMonths(1));
        System.out.println("localDate : " + dateTime.of(2019,12,18).plusMonths(1));
        System.out.println("until : " + dateTime.withDayOfYear(15).until(dateTime.withDayOfMonth(18)).getDays());
        //int goalTotal = localDate.withDayOfMonth(salaryDay + 1).until(localDate.plusMonths(1).withDayOfMonth(salaryDay)).getDays();
        //https://a1010100z.tistory.com/entry/LocalDate-JAVA-8-LocalDate-%EC%A0%95%EB%A6%AC
        //https://heowc.dev/2018/03/18/java8-time-package/
        //만일 내가 10일 월급날이면 10월 11일 부터 11월 10일까지 일하거나
        // 11월 11일 부터 오늘날짜까지 일하거나
        assert true;
    }
}