package light.star.timeandmoney.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
public abstract class BaseTimeModel {

    @CreatedDate
    private LocalDateTime createdDate;

//    private int count;
//
//    @LastModifiedBy
//    private LocalDateTime modifiedDate;
}
