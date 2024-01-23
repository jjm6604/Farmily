package com.ssafy.farmily.service.record;

import com.ssafy.farmily.dto.DailyRecordRequestDto;
import com.ssafy.farmily.dto.RecordResponseDto;

public interface RecordService {
	RecordResponseDto getById(long recordId);

	void createDaily(DailyRecordRequestDto dto);
}
