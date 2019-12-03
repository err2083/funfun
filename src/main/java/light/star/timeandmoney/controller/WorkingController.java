package light.star.timeandmoney.controller;

import light.star.timeandmoney.domain.WorkingRequestModel;
import light.star.timeandmoney.domain.WorkingResponseModel;
import light.star.timeandmoney.service.WorkingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class WorkingController {

    WorkingService workingService;

    //todo backbone model fetch시 id가 넘어오는 방법 찾아보기
    @PostMapping(value = "/working")
    public Long postModel(@RequestBody WorkingRequestModel workingRequestModel){
        return workingService.save(workingRequestModel);
    }

    @GetMapping(value = "/working/collection")
    public List<WorkingResponseModel> getCollection() {
        return workingService.getList();
    }
}
