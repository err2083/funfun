package light.star.timeandmoney.domain.enumType;

import light.star.timeandmoney.domain.FromToTimeModel;
import light.star.timeandmoney.domain.time.*;
import light.star.timeandmoney.domain.workInterface.TimeCalculator;

import java.time.LocalTime;

public enum WorkingStatus {
    // - = workTime , * = restTime
    //  (1)----(2)--*(3)*--(4)----(5)
    BEFOREWOKING, MORNING, REST, AFTERNOON, AFTERWOKING;

    public static WorkingStatus findByStatus(String status) {
        for (WorkingStatus workingStatus : WorkingStatus.values()) {
            if (workingStatus.name().equals(status)) {
                return workingStatus;
            }
        }
        return null;
    }

    // todo:중 if문 제거하는 방법 찾아보기
    public static TimeCalculator findByLocalTime(LocalTime localTime, FromToTimeModel workTime, FromToTimeModel restTime){
        if(localTime.compareTo(workTime.getFrom()) == -1){ // 현재 시간이 출근시간보다 이전일때
            return new BeforeWorkingStatus();
        } else if(localTime.compareTo(restTime.getFrom()) == -1){ //현재 시간이 출근 이후 휴식 이전일때
            return new MorningStatus();
        } else if(localTime.compareTo(restTime.getTo()) == -1){ //현재 시간이 휴식시간 일때
            return new RestStatus();
        } else if(localTime.compareTo(workTime.getTo()) == -1){
            return new AfternoonStatus();
        } else if(localTime.compareTo(workTime.getTo()) >= 0){
            return new AfterWorkingStatus();
        }else{
            return null;
        }
    }
}
