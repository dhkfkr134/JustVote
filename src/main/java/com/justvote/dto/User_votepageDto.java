package com.justvote.dto;

import lombok.Data;

@Data
public class User_votepageDto {
	
	private String userID;
	private int voteID;
	private int voted;
}
