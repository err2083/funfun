package light.star.timeandmoney.domain;

import light.star.timeandmoney.domain.enumType.WorkingStatus;
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
        System.out.println("compareTo time over: " + time.compareTo(LocalTime.of(8,30)));
        System.out.println("compareTo time down: " + time.compareTo(LocalTime.of(17,30)));
    }

    @Test
    public void findByStatus(){
        System.out.println(WorkingStatus.findByStatus("REST") instanceof Enum);
    }

    @Test
    public void work0830_1730_rest1200_1300_now1031(){
        //Given
        TodayWorkingModel todayWorkingModel = new TodayWorkingModel(LocalTime.of(10,31),
                LocalTime.of(8,30),LocalTime.of(17,30),
                LocalTime.of(12,00),LocalTime.of(13,00));
        //When
        //Then
        System.out.println(todayWorkingModel.toString());
    }

    @Test
    public void work0930_1830_rest1200_1300_now1221(){
        //Given
        TodayWorkingModel todayWorkingModel = new TodayWorkingModel(LocalTime.of(12,21),
                LocalTime.of(9,30),LocalTime.of(18,30),
                LocalTime.of(12,00),LocalTime.of(13,00));
        //When
        //Then
        System.out.println(todayWorkingModel.toString());
    }

    @Test
    public void work0730_1630_rest1200_1300_now1433(){
        //Given
        TodayWorkingModel todayWorkingModel = new TodayWorkingModel(LocalTime.of(14,33),
                LocalTime.of(7,30),LocalTime.of(16,30),
                LocalTime.of(12,00),LocalTime.of(13,00));
        //When
        //Then
        System.out.println(todayWorkingModel.toString());
    }

    @Test
    public void work0730_1630_rest1200_1300_now1640(){
        //Given
        TodayWorkingModel todayWorkingModel = new TodayWorkingModel(LocalTime.of(16,40),
                LocalTime.of(7,30),LocalTime.of(16,30),
                LocalTime.of(12,00),LocalTime.of(13,00));
        //When
        //Then
        System.out.println(todayWorkingModel.toString());
    }
}