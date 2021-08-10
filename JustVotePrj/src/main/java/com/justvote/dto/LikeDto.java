package com.justvote.dto;

import lombok.Data;

@Data
public class LikeDto {
	private String userID;
	private int voteID;
	private int TF;
}
