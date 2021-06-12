package com.justvote.dto;

import lombok.Data;

@Data
public class CommentDto {
	private String userId;
	private String voteID;
	private String commentID;
	private String commentContent;
	
}