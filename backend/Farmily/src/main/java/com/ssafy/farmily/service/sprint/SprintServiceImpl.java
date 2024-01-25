package com.ssafy.farmily.service.sprint;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.farmily.dto.RecordResponseDto;
import com.ssafy.farmily.entity.Record;
import com.ssafy.farmily.entity.Sprint;
import com.ssafy.farmily.exception.NoSuchContentException;
import com.ssafy.farmily.repository.RecordRepository;
import com.ssafy.farmily.repository.SprintRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SprintServiceImpl implements SprintService {

	private final SprintRepository sprintRepository;
	private final RecordRepository recordRepository;

	@Override
	@Transactional
	public Sprint getEntityById(Long sprintId) {
		return sprintRepository.findById(sprintId)
			.orElseThrow(() -> new NoSuchContentException("스프린트가 없습니다."));
	}

	@Override
	@Transactional
	public void harvest(Long sprintId) {
		Sprint sprint = getEntityById(sprintId);
		sprint.setIsHarvested(true);
		sprintRepository.save(sprint);
	}

	@Override
	@Transactional
	public List<RecordResponseDto> getRecords(Long sprintId) {
		Sprint sprint = getEntityById(sprintId);

		List<Record> entities = recordRepository.findAllBySprint(sprint);

		List<RecordResponseDto> dtos = entities.stream().map(RecordResponseDto::from).toList();

		return dtos;
	}
}
