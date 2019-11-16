package light.star.timeandmoney.repository;

import light.star.timeandmoney.domain.WorkingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkingRepository extends JpaRepository<WorkingModel, Long> {
}
