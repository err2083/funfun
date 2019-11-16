package light.star.timeandmoney.service;

import light.star.timeandmoney.domain.WorkingModel;
import light.star.timeandmoney.repository.WorkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkingService {

    @Autowired
    WorkingRepository workingRepository;

    public void initSetting(WorkingModel workingModel) {
        workingRepository.save(workingModel);
    }

    public List<WorkingModel> getList(){
        List<WorkingModel> listAll = workingRepository.findAll();
        return listAll;
    }
}
