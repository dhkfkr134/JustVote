package com.justvote.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.CommentDto;

@Mapper
public interface ICommentDao {
	public List<CommentDto> listDao();
	
	// ���� ���
	public void writeDao(@Param("_commentContent")String commentContent,
			@Param("_voteID")int voteID, @Param("_nickName")String nickName, @Param("_userID")String userID);
	
	// ���� ����
	public int deleteDao(@Param("_commentID") int commentID);
	
	public List<CommentDto> listDao2(@Param("_voteID")int voteID);

	// ��ǥ �������ؼ� ����� ����
	public void delete(@Param("_voteID") int voteID);

}