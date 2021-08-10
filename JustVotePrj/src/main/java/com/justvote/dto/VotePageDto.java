package com.justvote.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class VotePageDto {
	
	// 테이블의 정보
		private int voteID; // 투표 게시글의 pk넘버 DB에서 auto_increament
		private String userID; // 투표 게시자의 pk/fk넘버
		private String voteTitle; // 투표 게시글의 타이틀
		private List<String> voteContent; // 투표 게시글의 내용
		private Date voteRegDate; // 투표 게시글 작성일자 int형으로 바꿀 수 있음 돌아가는거 보고
		private Date voteEndDate; // 투표 종료일
		private int voteHits; // 투표 조회수 default 0으로 초기화 되어있다
		private int like;
		private String category;
		
		// 선택문의 정보
		private int selecID;
		private String selecContent;
		private int selecHits;
		
		private List<String> selecContentList;
}