package light.star.timeandmoney.controller;

import light.star.timeandmoney.domain.WorkingRequestModel;
import light.star.timeandmoney.domain.WorkingResponseModel;
import light.star.timeandmoney.service.WorkingService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
public class WorkingController {

    WorkingService workingService;

    @GetMapping(value = "/working")
    public String doWorking() {
        return "working";
    }

    @GetMapping(value = "/settingView")
    public String settingView() {
        return "initSetting";
    }

    //todo date type convert
    @PostMapping(value = "/setting")
    public String setting(@RequestBody WorkingRequestModel workingRequestModel){
        workingService.initSetting(workingRequestModel);
        return "redirect:working";
    }

    @GetMapping(value = "/workList")
    public String workList(Model model) {
        model.addAttribute("workingResponseModel", workingService.getList());
        return "workList";
    }
}
