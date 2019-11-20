package light.star.timeandmoney.domain;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MonthWorkingModelTest {

    @Test
    public void salary10work5(){
        //Given
        MonthWorkingModel monthWorkingModel = new MonthWorkingModel(10,5);
        //When
        //Then
        System.out.println(monthWorkingModel.toString());
    }

    @Test
    public void salary19work5(){
        //Given
        MonthWorkingModel monthWorkingModel = new MonthWorkingModel(19,5);
        //When
        //Then
        System.out.println(monthWorkingModel.toString());
    }

    @Test
    public void salary15work6(){
        //Given
        MonthWorkingModel monthWorkingModel = new MonthWorkingModel(15,6);
        //When
        //Then
        System.out.println(monthWorkingModel.toString());
    }
}