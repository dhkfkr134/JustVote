package com.justvote.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.CommentDto;

@Mapper
public interface ICommentDao {
	public List<CommentDto> listDao();
	
	public void writeDao(@Param("_commentContent")String commentContent,
			@Param("_voteID")String voteID, @Param("_userID")String userID);
	
	public int delete(@Param("_commentNum") String commentNum);
	
	public List<CommentDto> listDao2(@Param("_voteID")String voteID);


}