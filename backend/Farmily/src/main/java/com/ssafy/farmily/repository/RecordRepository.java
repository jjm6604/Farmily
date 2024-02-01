package com.ssafy.farmily.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.farmily.entity.Comment;
import com.ssafy.farmily.entity.Record;
import com.ssafy.farmily.entity.Sprint;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
	@Query(value = """
	SELECT a.id
		FROM challenge_record a
		JOIN record b ON a.id = b.id
		JOIN sprint c ON b.sprint_id = c.id
		WHERE curdate() BETWEEN c.start_date AND c.end_date
		AND c.family_id = :familyId""", nativeQuery = true)
	List<Long> findCurrentChallenges(Long familyId);

	List<Record> findAllBySprint(Sprint sprint);
}
