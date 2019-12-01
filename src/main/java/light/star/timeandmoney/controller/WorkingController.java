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

    @RequestMapping(value = "/working/{Id}", method = RequestMethod.GET)
    public WorkingResponseModel findOne(@PathVariable String Id){
        return workingService.findOne(Long.parseLong(Id));
    }

    @GetMapping(value = "/working/listAll")
    public List<WorkingResponseModel> listAll() {
        return workingService.getList();
    }

    @PostMapping(value = "/working/save")
    public void setting(@RequestBody WorkingRequestModel workingRequestModel){
        workingService.save(workingRequestModel);
    }
}
