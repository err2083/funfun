package light.star.timeandmoney.service;

import light.star.timeandmoney.domain.WorkingEntity;
import light.star.timeandmoney.domain.WorkingRequestModel;
import light.star.timeandmoney.domain.WorkingResponseModel;
import light.star.timeandmoney.repository.WorkingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WorkingService {

    WorkingRepository workingRepository;

    @Transactional(readOnly = true)
    public void initSetting(WorkingRequestModel workingRequestModel) {
        workingRepository.save(workingRequestModel.toEntity());
    }

    @Transactional(readOnly = true)
    public List<WorkingResponseModel> getList(){
        List<WorkingEntity> listAll = workingRepository.findAllDesc();
        return listAll.stream()
                .map(WorkingResponseModel::new)
                .collect(Collectors.toList());
    }
}
