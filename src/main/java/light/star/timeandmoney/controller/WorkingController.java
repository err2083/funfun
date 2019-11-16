package light.star.timeandmoney.controller;

import light.star.timeandmoney.domain.WorkingModel;
import light.star.timeandmoney.service.WorkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class WorkingController {

    @Autowired
    WorkingService workingService;

    @GetMapping(value = "/working")
    public String doWorking() {
        return "working/working";
    }

    @PostMapping(value = "/setting")
    public String setting(@RequestBody WorkingModel workingModel){
        workingService.initSetting(workingModel);
        return "working/working";
    }
}
