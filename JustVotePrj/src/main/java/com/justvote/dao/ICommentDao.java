package com.justvote.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.CommentDto;

@Mapper
public interface ICommentDao {
	public List<CommentDto> listDao();
	
	public void writeDao(String comment);
	
	public int delete(@Param("_commentNum") String commentNum);


}
