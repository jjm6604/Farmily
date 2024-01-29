package com.ssafy.farmily.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import utils.DateRange;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
public class CalendarSchedule extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "familyId")
	private Family family;

	@Embedded
	private DateRange dateRange;

	@Column(columnDefinition = "CHAR(6)")
	private String color;


	@Column(columnDefinition = "VARCHAR(16)")
	private String memo;
}
