package com.justvote.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.justvote.dto.FileDto;
@Service
public interface IFileDao {
	FileDto findByFno(int fno);
	

}
