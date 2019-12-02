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

//    @GetMapping(value = "/working/listAll")
//    public List<WorkingResponseModel> listAll() {
//        return workingService.getList();
//    }

    //todo backbone 에서 서버로 보낼때 어떤 형태인지확인
//    @GetMapping(value = "/working")
//    public WorkingResponseModel findOne(@RequestBody Long id){
//        return workingService.findOne(id);
//    }

    @PostMapping(value = "/working")
    public Long postModel(@RequestBody WorkingRequestModel workingRequestModel){
        return workingService.save(workingRequestModel);
    }

    @GetMapping(value = "/working/collection")
    public List<WorkingResponseModel> getCollection() {
        return workingService.getList();
    }

    //todo 테스트 해봐야함
    @PostMapping(value = "/working/collection")
    public List<Long> postCollection(@RequestBody List<WorkingRequestModel> workingRequestModels) {
        return workingService.saveAll(workingRequestModels);
    }
}
