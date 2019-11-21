package light.star.timeandmoney.domain;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalTime;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TodayWorkingModelTest {

    @Test
    public void LocalTimeTest(){
        //Given
        LocalTime time = LocalTime.now();
        //Then
        System.out.println("now : " + time);
        System.out.println("getHour : " + time.getHour());
        System.out.println("getHour : " + time.getMinute());
    }

    @Test
    public void ModelTest(){
        //https://www.daleseo.com/java8-duration-period/
    }
}