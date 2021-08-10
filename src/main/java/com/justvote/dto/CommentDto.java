package com.justvote.dto;

import lombok.Data;

@Data
public class CommentDto {
	private String userID;
	private int voteID;
	private String nickName;
	private int commentID;
	private String commentContent;
}