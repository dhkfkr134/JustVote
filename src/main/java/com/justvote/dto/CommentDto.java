package com.justvote.dto;

import lombok.Data;

@Data
public class CommentDto {
	private String userID;
	private String voteID;
	private String commentID;
	private String commentContent;
	
}