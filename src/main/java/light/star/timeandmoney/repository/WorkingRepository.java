package light.star.timeandmoney.repository;

import light.star.timeandmoney.domain.WorkingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkingRepository extends JpaRepository<WorkingEntity, Long> {
    @Query("SELECT w " + "FROM WorkingEntity w " + "ORDER BY w.id DESC")
    List<WorkingEntity> findAllDesc();
}
