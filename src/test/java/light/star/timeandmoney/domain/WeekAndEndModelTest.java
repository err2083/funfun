package light.star.timeandmoney.domain;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.DayOfWeek;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WeekAndEndModelTest {

    @Test
    public void total20work5monday(){
        //Given
        //20일, 주 5일 근무, 오늘이 월요일
        WeekAndEndModel weekAndEndModel = new WeekAndEndModel(20, DayOfWeek.MONDAY, 5);
        //When
        //Then
        System.out.println(weekAndEndModel.toString());
        assert true;
    }

    @Test
    public void total16work5wednesday(){
        //Given
        //16일, 주 5일 근무, 오늘이 수요일
        WeekAndEndModel weekAndEndModel = new WeekAndEndModel(16, DayOfWeek.WEDNESDAY, 5);
        //When
        //Then
        System.out.println(weekAndEndModel.toString());
        assert true;
    }

    @Test
    public void total25work6sunday(){
        //Given
        //25일, 주 6일 근무, 오늘이 일요일
        WeekAndEndModel weekAndEndModel = new WeekAndEndModel(25, DayOfWeek.SUNDAY, 6);
        //When
        //Then
        System.out.println(weekAndEndModel.toString());
        assert true;
    }
}