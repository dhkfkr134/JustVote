package com.justvote.dto;

import org.apache.ibatis.annotations.InsertProvider;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import lombok.Data;
import lombok.Generated;
import lombok.ToString.Include;

@Data
@EntityScan
public class FileDto {
	
	int fno;
	String fileName;
	String fileOriName;
	String fileUrl;
	
}
